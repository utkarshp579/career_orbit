// This file defines a layout component for the Industry Insights page.
/*
When This Component Renders
  Whenever the Industry Insights page is loaded in Next.js.
  children could be:
  Data fetched from Gemini AI.
  User-specific insights from the database.
  If the content inside Suspense is still loading, React shows the loader instead.
*/


import { BarLoader } from "react-spinners"; // a loading spinner from the react-spinners library.
import { Suspense } from "react"; // a React feature to handle async components, showing a fallback UI while waiting for data.

export default function Layout({ children }) {
  // special React prop that represents whatever content is passed inside this layout
  
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense // A Suspense boundary to handle asynchronous rendering (loading states).
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
}

/*
Revision Questions

What is the role of children in this component?

Why do we use Suspense here?

What does the fallback prop in Suspense do?

What library does BarLoader come from, and what does it provide?

How is the Industry Insights title styled?
*/