import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Abdus Salam - AI Researcher & Software Engineer",
  description:
    "PhD candidate and AI researcher specializing in machine learning, computer vision, and biomedical applications. Currently developing enterprise-grade AI solutions for healthcare and smart agriculture.",
  keywords:
    "AI researcher, machine learning, computer vision, biomedical AI, smart agriculture, PhD candidate, software engineer",
  authors: [{ name: "Abdus Salam" }],
  openGraph: {
    title: "Abdus Salam - AI Researcher & Software Engineer",
    description:
      "PhD candidate and AI researcher specializing in machine learning, computer vision, and biomedical applications.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
