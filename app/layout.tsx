import { DarkModeWrapper } from "@/components/wrapper/dark-mode-wrapper";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog - VoteVerse",
  description:
    "Insights, tutorials, and updates from the world of decentralized governance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk} antialiased`}>
        <DarkModeProvider>
          <DarkModeWrapper>{children}</DarkModeWrapper>
        </DarkModeProvider>
      </body>
    </html>
  );
}
