import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Director Workshop: Stop Prompting. Start Directing.",
  description:
    "A 4-hour intensive where you'll build a real AI system that runs your business. Learn to think like a director, not a technician. Limited to 25 seats.",
  openGraph: {
    title: "AI Director Workshop: Stop Prompting. Start Directing.",
    description:
      "A 4-hour intensive where you'll build a real AI system that runs your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${fredoka.variable} antialiased`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
