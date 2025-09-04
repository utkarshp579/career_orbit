// Porpose of This file is a Next.js Middleware that runs before a request reaches your route.

// Main job here :- Check if the requested route is protected (e.g., dashboard, resume, interview).
// If the user is not signed in, redirect them to the sign-in page.
// Otherwise, allow the request to continue.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// createRouteMatcher :- helper that makes it easy to define which routes should be protected.
// clerkMiddleware :- wraps your middleware logic with Clerk’s auth tools.
import { NextResponse } from "next/server"; // lets middleware decide the next step: continue (NextResponse.next()) or redirect.

// isProtectedRoute(req) will return true if the request matches one of these.
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/onboarding(.*)",
  "/ai-cover-letter(.*)",
]);

// Middleware Logic
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // 1️⃣ Check current user

  if (!userId && isProtectedRoute(req)) {
    // 2️⃣ If not signed in AND accessing protected page
    const { redirectToSignIn } = await auth();
    return redirectToSignIn(); // 3️⃣ Send them to Clerk’s Sign In page
  }

  return NextResponse.next(); // 4️⃣ Otherwise continue
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};


// 🔹 Why Is This Useful?
// Centralized route protection → no need to repeat checks in each component.
// Works for both pages and API routes.
// Prevents unauthorized users from even reaching sensitive code.