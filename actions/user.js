// This file contains server actions related to the user and onboarding process.
// It is only executed on the server (because of "use server"; at the top).

"use server";

import { db } from "@/lib/prisma"; // This is the Prisma client that lets us talk to the database
import { auth } from "@clerk/nextjs/server"; // This gives us details about the logged-in user (like userId).
// import { revalidatePath } from "next/cache";
// import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  // This function is called when a user submits the onboarding form.
  // It updates the user’s profile with the chosen industry, experience, bio, and skills.
  const { userId } = await auth(); // Check authentication
  if (!userId) throw new Error("Unauthorised"); // 👉 Makes sure the user is logged in. Otherwise, we stop immediately.

  //  Find user in DB
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a database transaction.
    const result = await db.$transaction(
      // 👉 A transaction groups queries together. If one fails, everything rolls back (so DB isn’t half-updated).
      async (tx) => {
        // First check if industry insights exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values , if exist we use it from above.

        if (!industryInsight) {
          industryInsight = await tx.industryInsight.create({
            data: {
              // from schema . prisma , we are getting model
              industry: data.industry,
              salaryRanges: [], // default empty array
              growthRate: 0,
              demandLevel: "MEDIUM", // Default value
              topSkills: [],
              marketOutlook: "NEUTRAL",
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            },
          });
        }

        // if (!industryInsight) {
        //   const insights = await generateAIInsights(data.industry);

        //   industryInsight = await db.industryInsight.create({
        //     data: {
        //       industry: data.industry,
        //       ...insights,
        //       nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        //     },
        //   });
        // }
        // Now update the user
        const updatedUser = await tx.user.update({
          // 👉 Saves onboarding form values into the user’s record.
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight }; // 👉 Sends back the updated user and industry insight.
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    //   return result.user;
    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry: ", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  // This function checks whether a user has already completed onboarding.
  // It is used on the onboarding page to decide if we should redirect them to the dashboard.
  const { userId } = await auth(); // Check authentication
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    // Search user by Clerk ID
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      //Check if onboarding is complete
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    // 👉 If the user has an industry set → onboarding is done.
    // 👉 Otherwise, show onboarding form.
    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}


// Flow Summary
    // User signs in (via Clerk).
    // Goes to onboarding page → system checks if they’re onboarded.
    // If yes → redirect to /dashboard.
    // If no → show onboarding form.
    // On submit → updateUser updates user + industry insights.
// Next login → user is redirected straight to dashboard.
    

// Revision Questions
  // What does auth() return, and why do we use it first?
  // Why do we use a transaction (db.$transaction) when updating user and industry?
  // What happens if the industry doesn’t already exist in the database?
  // How does getUserOnboardingStatus decide if a user is onboarded?
  // From where are db and auth imported?