import type { Metadata } from "next";
import "./globals.css"; // Import global styles

export const metadata: Metadata = {
  title: "Artemii Bakharev | Portfolio",
  description: "Full-Stack Web Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
