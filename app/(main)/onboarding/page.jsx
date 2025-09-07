// This file defines the Onboarding Page in your app.
// Its job is to check if the user has already completed onboarding.
// If yes → redirect them to the dashboard.
// If no → show the onboarding form.

// 📌 When is this file used?
// When the user visits /onboarding.
// The page decides whether to show the onboarding form or redirect to dashboard.

import { getUserOnboardingStatus } from '@/actions/user'; // Checks if the logged-in user has already completed onboarding.
import { industries } from '@/data/industries'; // Provides a list of industries that the user can choose from.
import { redirect } from 'next/navigation'; // Used to programmatically send users to another page
import React from 'react'
import Onboardingform from './_components/onboarding-form'; // A client component that shows the onboarding form UI and handles form submission.

const onBoardingPage = async () => {
  // async server component

  const { isOnboarded } = await getUserOnboardingStatus(); // Check onboarding status // 👉 Calls the server action to check if the user has already set their industry.
  if (isOnboarded) {
    redirect("/dashboard"); // 👉 If true, immediately send the user to the dashboard (they don’t see the onboarding form).
  }

  return (
    <main>
      <Onboardingform industries={industries} />
      {/* // pass down the list of industries as props. */}
      {/* Making separate Component because this is client component , we use hooks in it , and in onboarding current page we have sent to API req , so making it server side would make it fast */}
    </main>
  );
}

export default onBoardingPage


// 🧩 Flow Summary
// User navigates to /onboarding.
// Server calls getUserOnboardingStatus() to check if they already finished onboarding.
// If completed → redirect to /dashboard.
// If not completed → show <Onboardingform /> with industry options.

// 📝 Revision Questions
// What does getUserOnboardingStatus check in the database?
// What happens if isOnboarded is true?
// From where does the onboarding form get the list of industries?
// Why is Onboardingform made a separate client component?
// Which function is used to redirect the user in Next.js?