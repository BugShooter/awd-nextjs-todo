'use client';
import { ChakraProvider as _ChakraProvider, theme } from "@chakra-ui/react";

export const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return <_ChakraProvider theme={theme}>{children}</_ChakraProvider>;
};
