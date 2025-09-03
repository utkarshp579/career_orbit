import { Inter } from "next/font/google";
import "./globals.css";
// Using Dark Theme from shadCn UI
  import { ThemeProvider } from "@/components/theme-provider";

// Using Clerk
  // import { type metadata } from "next";
  import {
    ClerkProvider,
  //   SignInButton,
  //   SignUpButton,
  //   SignedIn,
  //   SignedOut,
  //   UserButton,
} from "@clerk/nextjs";
  
import { dark } from "@clerk/themes"; // for auth theme

import Header from "@/components/Header";
import { Heart } from "lucide-react";

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

export const metadata = {
  title: "Career Orbit - AI Career App",
  description: "Built With Love",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">{children}</main>

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
