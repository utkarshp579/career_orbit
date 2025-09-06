import { getUserOnboardingStatus } from '@/actions/user'
import { industries } from '@/data/industries'
import { redirect } from 'next/navigation';
import React from 'react'
import Onboardingform from './_components/onboarding-form';

const onBoardingPage = async () => {
  // check if user is already onboarded.
  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <Onboardingform industries={industries} /> {/* Making separate Component because this is client component , we use hooks in it , and in onboarding current page we have sent to API req , so making it server side would make it fast */}
    </main>
  )
}

export default onBoardingPage