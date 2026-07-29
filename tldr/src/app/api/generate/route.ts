import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

// Define the schema for the output data
const newspaperSchema = z.object({
  headline: z.string().describe("A catchy, journalistic headline summarizing the main topic."),
  leadParagraph: z.string().describe("The lead paragraph of the newspaper article, summarizing the key details."),
  imageSearchQuery: z.string().describe("A 1-2 word search query related to the main topic (e.g. 'Renewable energy', 'Stock market') to find a relevant image on Wikipedia."),
  keyPoints: z.array(z.object({
    title: z.string().describe("A short, punchy title for the key point."),
    text: z.string().describe("A 1-2 sentence description of the key point.")
  })).describe("3 key points extracted from the document."),
  bodyColumns: z.array(z.string()).describe("The main body of the article broken down into 3-5 well-written paragraphs, suitable for newspaper columns."),
  pullQuotes: z.array(z.string()).describe("1-2 impactful quotes extracted or formulated from the text that stand out.")
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";

    // Parse the file based on its type
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      text = buffer.toString('utf-8');
    } else {
      return NextResponse.json({ error: "Unsupported file type. Please upload a PDF, DOCX, or TXT." }, { status: 400 });
    }

    // Call Gemini to generate the structured data
    const { createGoogleGenerativeAI } = require('@ai-sdk/google');
    const customGoogle = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { object } = await generateObject({
      model: customGoogle('gemini-3.5-flash'),
      schema: newspaperSchema,
      prompt: `You are an expert newspaper editor. I will provide you with the text extracted from a document.
Your job is to read the text and write a compelling front-page newspaper article based on it.
Structure your response exactly according to the provided schema.
Make it sound professional, objective, and journalistic.
This is also to serve as a sort of summarizer for the user so they can consume the content in bite-sized chunks of info.

Document Text:
${text.substring(0, 50000)} // Limiting to first 50k chars for safety
`,
    });

    // Fetch a real image from Wikipedia using the search query
    const query = encodeURIComponent(object.imageSearchQuery);
    let imageUrl = "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2000&auto=format&fit=crop"; // fallback

    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&pithumbsize=1000`);
      const wikiData = await wikiRes.json();
      const pages = wikiData.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pageId !== "-1" && pages[pageId].thumbnail?.source) {
          imageUrl = pages[pageId].thumbnail.source;
        }
      }
    } catch (e) {
      console.error("Failed to fetch image from Wikipedia", e);
    }

    const finalObject = { ...object, image: imageUrl };
    return NextResponse.json(finalObject);
  } catch (error: any) {
    console.error("Error generating newspaper:", error);
    const errorMessage = error.message || String(error);
    return NextResponse.json({ error: `Detailed Error: ${errorMessage}` }, { status: 500 });
  }
}
