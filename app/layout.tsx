// app/layout.tsx
import "@/styles/globals.css";
import GlobalStyles from '@/styles/GlobalStyles';
import { SWRProvider } from "@/providers/swr-provider";
import { ChakraProvider } from "@/providers/chakra-provider";

export const metadata = {
  title: 'TaskTango',
  description: 'A simple to-do app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalStyles />
        <SWRProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </SWRProvider>
      </body>
    </html>
  )
}
