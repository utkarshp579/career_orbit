// The HeroSection is the top banner of the homepage. It introduces the app with a bold headline, description, CTAs, and a hero image that reacts to scroll.

// When this component is used
// Rendered at the top of the Home page.
// Runs client-side because it uses useRef, useEffect, and browser APIs (window.scrollY).

"use client"; // Marks this file as a client component in Next.js.  // Needed because it uses hooks (useEffect, useRef).
 // Because hooks and window.scrollY are only available in the browser, not on the server.
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";


const HeroSection = () => {
  // Creates a ref to directly access the hero image DOM element.  // Used later to add/remove CSS classes.
  const imageRef = useRef(null); // imageref is pointing to ref to hero-image, further wwe also want it not change on little scrolling.

  //! scroll effect
  useEffect(() => {
    // we want to rerender when scroll cross 100px , everytime.
    // useEffect = sets up the scroll listener once.
    //! The scroll listener = runs many times (every scroll event).
    
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        // If the user scrolls more than 100px → adds scrolled class to hero image.
        imageElement.classList.add("scrolled");
      } else {
        // If not → removes it.
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll); // Adds a scroll listener to the window.
    return () => window.removeEventListener("scroll", handleScroll); // Cleans up event listener on unmount.
  }, []); // Runs once on mount ([] dependency array).

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>

          <Link href="https://www.youtube.com/watch?v=p7eE_dn9u4k">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            {/* ref={imageRef} allows scroll-based class toggling. */}{" "}
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority // Uses priority flag to preload image
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


// Why useRef? → To directly manipulate a DOM element (hero-image) without re-rendering.

// Why cleanup in useEffect? → Prevents memory leaks by removing scroll listener when component unmounts.

// Why priority on Image? → Ensures the hero image loads quickly (critical for page load performance).

// Q: Why do we need "use client" here?
// Because hooks and window.scrollY are only available in the browser, not on the server.

//Q: What happens if I remove the cleanup function?
// Multiple scroll listeners would pile up → causes performance issues.