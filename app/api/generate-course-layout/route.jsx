
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const PROMPT = `
Generate a detailed JSON structure for an online learning course.

You must strictly follow this schema:

{
  "course": {
    "courseName": "string",
    "courseDescription": "string",
    "category": "string",
    "difficulty": "string",
    "includeVideo": "boolean",
    "numberOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}

Instructions:
- Use the provided course name, number of chapters, and other inputs dynamically.
- Write a clear and engaging course description tailored to the course name.
- Choose a suitable category like "Web Development", "UI/UX", etc.
- Set the difficulty level appropriately (e.g., Beginner, Intermediate, Advanced).
- The value of includeVideo should match the provided input.
- Generate the specified number of chapters. Each chapter must have a meaningful name, appropriate duration (e.g., "45 mins"), and 3–4 key topics.

For the "bannerImagePrompt" field:
- Write a high-quality prompt for a 3D-style digital illustration banner.
- Include modern UI/UX elements such as mockup screens, reusable components, text blocks, design icons, and developer tools.
- Add symbolic visuals relevant to the course name (e.g., sticky notes, code snippets, browser frames).
- Use a vibrant, creative, and professional tone with colors like blues, purples, and oranges.
- Ensure the prompt reflects a tech-savvy and educational atmosphere.

Respond strictly in JSON format only without any explanation or extra text.
`;


export async function POST(req) {
  const { courseId, ...formData } = await req.json();
  const user = await currentUser();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  console.log(response.candidates[0].content.parts[0].text);

  const rawResp = response?.candidates[0]?.content?.parts[0]?.text;
  const rawJson = rawResp.replace("```json", "").replace("```", "");
  const jsonResp = JSON.parse(rawJson);

  const imagePrompt = jsonResp.course?.bannerImagePrompt;

  // generate the banner images and save it to the database
  const bannerImageUrl =await GenerateImage(imagePrompt);


  // save the info to the database
  const result = await db.insert(coursesTable).values({
    ...formData,
    courseJson: jsonResp,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl: bannerImageUrl
  });

  return NextResponse.json({ courseId: courseId });
}


const GenerateImage = async (imagePrompt) => {
  const BASE_URL = 'https://aigurulab.tech';
  const result = await axios.post(BASE_URL + '/api/generate-image',
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: 'flux',
      aspectRatio: "16:9"
    },
    {
      headers: {
        'x-api-key': process?.env?.AI_GURU_LAB_API_KEY,
        'Content-Type': 'application/json',
      },
    });
  console.log(result.data.image);
  return result.data.image;
}

