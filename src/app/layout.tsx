import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import AosWrapper from "./components/AosWrapper";
import Script from "next/script";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invitaciones Boda Katherine & Marcelo",
  description: "Invitaciones para la boda de Katherine y Marcelo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning ata-lt-installed="true">
      <body className={`${lora.variable} antialiased`}>
        <AosWrapper>
          {children}
        </AosWrapper>
        <Script
          src="https://kit.fontawesome.com/1ef07ac9e7.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
