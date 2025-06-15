import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artemii Bakharev | Award-Winning Full-Stack Developer",
  description: "Full-stack web developer specializing in React, Node.js & cloud applications. Creator of CaseClicker.online and Pollution Zero (1st Place FireHacks). Available for web development opportunities.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Web Application Developer",
    "API Integration Specialist",
    "Cloud Solutions Developer",
    "JavaScript Developer",
    "Portfolio"
  ],
  openGraph: {
    title: "Artemii Bakharev | Full-Stack Developer Portfolio",
    description: "Award-winning developer building efficient web applications with React,, Node.js and cloud technologies",
    type: "website",
    url: "https://yourportfolio.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artemii Bakharev | Full-Stack Developer",
    description: "Creator of innovative web solutions including CollabCode and CaseClicker.online",
  },
  robots: "index, follow",
  authors: [{ name: "Artemii Bakharev" }],
  category: "Technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}