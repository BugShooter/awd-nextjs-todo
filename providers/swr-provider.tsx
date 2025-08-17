'use client';
import { SWRConfig } from "swr";

const fetcher = (url: string): Promise<unknown> => fetch(url).then((response) => response.json());

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
