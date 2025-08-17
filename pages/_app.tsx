import { AppProps } from 'next/app';
import "@/styles/globals.css";
import GlobalStyles from '@/styles/GlobalStyles';
import { ChakraProvider } from '@/providers/chakra-provider';
import { SWRProvider } from '@/providers/swr-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ChakraProvider>
        <SWRProvider>
          <Component {...pageProps} />
        </SWRProvider>
      </ChakraProvider>
    </>
  );
}