import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For You 💖",
  description: "Something special, just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
