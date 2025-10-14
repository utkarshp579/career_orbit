// What this file does 
  // Use Google Gemini AI to generate career insights about an industry (salaries, growth, skills, etc.).
  // Save those insights in the Prisma database (linked to the logged-in Clerk user).
  // Retrieve existing insights if already generated (to avoid unnecessary API calls).

 
"use server"; // tells Next.js this file contains server actions (only run on the server, never client-side).

import { db } from "@/lib/prisma"; // Prisma client, used to interact with the database
import { auth } from "@clerk/nextjs/server"; // Clerk authentication, used to get the logged-in user’s ID.
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gemini API client from Google. //! Library Installs.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// export const generateAIInsights = async (industry) => {
//   // Takes an industry name, Creates a prompt asking Gemini to return a strict JSON , removes any ```json formatting , Returns the parsed JSON object.
//   const prompt = `
//           Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
//           {
//             "salaryRanges": [
//               { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//             ],
//             "growthRate": number,
//             "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//             "topSkills": ["skill1", "skill2"],
//             "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//             "keyTrends": ["trend1", "trend2"],
//             "recommendedSkills": ["skill1", "skill2"]
//           }
          
//           IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
//           Include at least 5 common roles for salary ranges.
//           Growth rate should be a percentage.
//           Include at least 5 skills and trends.
//         `;

//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   const text = response.text();
//   const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//   return JSON.parse(cleanedText);
// };

export const generateAIInsights = async (industry) => {
  try {
    // Use the correct model name - try these in order of preference:
    // Option 1: gemini-pro (most stable)
    // Option 2: gemini-1.5-pro
    // Option 3: gemini-1.5-flash-latest
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}

IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
Include at least 5 common roles for salary ranges.
Growth rate should be a percentage.
Include at least 5 skills and trends.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean up the response
    const cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedText);

    // Validate the response structure
    if (!parsedData.salaryRanges || !Array.isArray(parsedData.salaryRanges)) {
      throw new Error("Invalid AI response structure");
    }

    return parsedData;
  } catch (error) {
    console.error("Error generating AI insights:", error);

    // Return fallback data if AI fails
    return {
      salaryRanges: [
        {
          role: "Entry Level",
          min: 40000,
          max: 60000,
          median: 50000,
          location: "Global",
        },
        {
          role: "Mid Level",
          min: 60000,
          max: 90000,
          median: 75000,
          location: "Global",
        },
        {
          role: "Senior Level",
          min: 90000,
          max: 130000,
          median: 110000,
          location: "Global",
        },
        {
          role: "Lead/Principal",
          min: 120000,
          max: 180000,
          median: 150000,
          location: "Global",
        },
        {
          role: "Director",
          min: 150000,
          max: 220000,
          median: 185000,
          location: "Global",
        },
      ],
      growthRate: 5.0,
      demandLevel: "MEDIUM",
      topSkills: [
        "Communication",
        "Problem Solving",
        "Technical Skills",
        "Project Management",
        "Collaboration",
      ],
      marketOutlook: "NEUTRAL",
      keyTrends: [
        "Digital Transformation",
        "Remote Work",
        "AI Integration",
        "Sustainability Focus",
        "Data-Driven Decision Making",
      ],
      recommendedSkills: [
        "Leadership",
        "Adaptability",
        "Critical Thinking",
        "Industry Knowledge",
        "Continuous Learning",
      ],
    };
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth(); // Authenticates the user with Clerk (auth()).
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    // Fetches the user’s record from the database.
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry); // Calls generateAIInsights() using the user’s saved industry.

    const industryInsight = await db.industryInsight.create({
      // Saves the new insights into the industryInsight table.
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight; //If insights already exist: Returns them directly (no new API call).
}

/*
🧠 Revision Questions :- 

Why do we need "use server" at the top of this file?

What role does auth() from Clerk play in this flow?

Why do we save insights in the database instead of calling Gemini AI every time?

What problem does cleanedText = text.replace(/```(?:json)?\n?/g, "") solve?

What happens if the user is not found in the database?

Why do we add nextUpdate (7 days later)?
*/