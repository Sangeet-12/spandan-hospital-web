import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spandan Hospital",
  description: "Community Hospital & Digital Front Desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
