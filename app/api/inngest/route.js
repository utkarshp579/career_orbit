//What this file is: A Next.js API route that connects your app to Inngest (an event-driven job framework).
// When it runs: When your app receives HTTP requests on this route (/api/inngest or wherever you place it).
// In production, you configure Inngest to send events here.

import { inngest } from "@/lib/inngest/client"; //nngest client that we've configured
// import { helloWorld } from "@/lib/inngest/function";
import { serve } from "inngest/next"; //Wraps functions into a Next.js API route with handlers

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    // helloWorld, 
  ],
});





// Creating a public api . for inngest . 