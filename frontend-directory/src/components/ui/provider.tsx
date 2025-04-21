// components/ui/provider.tsx
"use client";

import { ReactNode } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: ReactNode;
  enableColorScheme?: boolean;
}

export function Provider({ children, enableColorScheme }: ProviderProps) {
  return (
    // next-themes lets Chakra’s dark/light mode toggle work
    <ThemeProvider attribute="class" enableSystem>
      {/* injects the <html class="chakra-ui-dark"> (or light) early */}
      {enableColorScheme && <ColorModeScript />}
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ThemeProvider>
  );
}
