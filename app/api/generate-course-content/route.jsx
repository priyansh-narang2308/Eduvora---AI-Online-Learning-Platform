import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
// Optional: If you want to auto-fix bad JSON, uncomment the next line and install jsonrepair
// import { jsonrepair } from 'jsonrepair';

const PROMPT = `
Based on the provided chapter name and its topics, generate detailed and well-structured content for each topic in HTML format.

Return the response as a JSON object following this schema:

{
  "chapterName": "<chapter name>",
  "topics": [
    {
      "topic": "<topic name>",
      "content": "<HTML formatted content>"
    }
  ]
}

Do not wrap the JSON in triple backticks or any markdown formatting.

User Input: 
`;

export async function POST(req) {
    const { courseJson, courseTitle, courseId } = await req.json();

    const promises = courseJson?.chapters?.map(async (chapter) => {
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
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        const rawResp = response?.candidates[0]?.content?.parts[0]?.text || "";

        const rawJson = rawResp
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let jsonResp = {};
        try {
            jsonResp = JSON.parse(rawJson);
        } catch (e) {
            console.error("Invalid JSON from Gemini:", rawJson);
            throw new Error("Failed to parse Gemini response: " + e.message);
        }



        const youtbeData = await getYoutubeVideo(chapter?.chapterName);
        console.log({
            youtubeVideo: youtbeData,
            courseData: jsonResp
        });
        return {
            youtubeVideo: youtbeData,
            courseData: jsonResp
        };
    });

    const courseContent = await Promise.all(promises);

    // save to the database
    const dbResp=await db.update(coursesTable).set({
        courseContent:courseContent
    }).where(eq(coursesTable.cid,courseId))

    return NextResponse.json({
        courseName: courseTitle,
        courseContent: courseContent
    });
}


const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const getYoutubeVideo = async (topic) => {
    try {
        const params = {
            part: "snippet",
            q: topic,
            maxResults: 4, 
            type: "video",
            key: process.env.YOUTUBE_API_KEY
        };

        const resp = await axios.get(YOUTUBE_BASE_URL, { params });
        const utubeVideoListResp = resp.data.items;

        const utubeVideoList = utubeVideoListResp.map(item => ({
            videoId: item?.id?.videoId,
            title: item?.snippet?.title
        }));

        console.log("utubeVideoList", utubeVideoList);
        return utubeVideoList;

    } catch (error) {
        console.error("YouTube API Error:", error.message);
        return [];
    }
};
