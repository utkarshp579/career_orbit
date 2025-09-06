//What this file is: The root layout for the App Router. Wraps all pages and components.  
// When it renders: For every route in your app (it’s global).
import { Inter } from "next/font/google";
import "./globals.css";
// Using Dark Theme from shadCn UI
  import { ThemeProvider } from "@/components/theme-provider"; // shadcn/ui ThemeProvider.

// Using Clerk
  // import { type metadata } from "next";
  import {
    ClerkProvider,
  //   SignInButton,
  //   SignUpButton,
  //   SignedIn,
  //   SignedOut,
  //   UserButton,
} from "@clerk/nextjs"; // ClerkProvider (with dark theme).
  
import { dark } from "@clerk/themes"; // for auth theme

import Header from "@/components/Header"; // top navigation
import { Heart } from "lucide-react";
import { Toaster } from "sonner";

// Loads Inter font.
const inter = Inter({
  subsets: ["latin"]
});
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Metadata exported for SEO and browser title.
export const metadata = {
  title: "Career Orbit - AI Career App",
  description: "Built With Love",
};

export default function RootLayout({ children }) {
  // children = whatever page/route is being rendered.
  return (
    <ClerkProvider // Wraps everything in ClerkProvider → required for Clerk auth.
      appearance={{
        baseTheme: dark,
      }}
    >
      {/* suppressHydrationWarning avoids React mismatch warnings when theme changes. */}
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider // from Docs of Shadcn UI
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors/>
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p className="text-gray-200 text-center">
                  Made with{" "}
                  <Heart className="inline w-4 h-4 text-red-500 fill-red-500" />{" "}
                  by @Utkarsh
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


// Q: Why wrap with ClerkProvider at root?
// So auth context is available everywhere (sign-in, user profile, etc.).
// Q: Do I need to use suppressHydrationWarning?
  // Yes, when themes/fonts differ between server and client render.
// Q: Is children special?
  // Yes. Next.js automatically passes the page being rendered into RootLayout as children.