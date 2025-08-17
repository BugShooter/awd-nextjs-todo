// styles/GlobalStyles.tsx
'use client'
import { fonts } from "@/lib/fonts"

export default function GlobalStyles() {
  return (
    <style jsx global>
      {`
        :root {
          --font-rubik: ${fonts.rubik.style.fontFamily};
        }
        body, html {
          height: 100%;
        }
      `}
    </style>
  )
}
