"use client"; // Required because next-themes relies on browser APIs (localStorage, matchMedia) that don’t work on the server.

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  // children = everything wrapped inside this provider
  // ...props = allows passing extra config props
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
