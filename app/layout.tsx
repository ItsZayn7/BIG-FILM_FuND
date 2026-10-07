import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  title: "Big Film Fund ",
  description:
    "Big Film Fund is creating a new way to finance movies — powered by a technology platform that connects investors, filmmakers, and audiences.",
  keywords: [
    "Big Film Fund",
    "Film Financing",
    "Movie Investing",
    "Film Platform",
    "Filmmaker Capital",
    "Film Waterfall Economics",
    "Film Infrastructure",
  ],
  authors: [{ name: "Big Film Fund" }],
  icons: {
    icon: "/favi.png",
    shortcut: "/favi.png",
    apple: "/favi.png",
  },
  openGraph: {
    title: "Big Film Fund",
    description:
      "Big Film Fund is creating a new way to finance movies — powered by a technology platform that connects investors, filmmakers, and audiences.",
    type: "website",
    siteName: "Big Film Fund",
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Film Fund",
    description:
      "Big Film Fund is creating a new way to finance movies — powered by a technology platform that connects investors, filmmakers, and audiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favi.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favi.png" />
        <link rel="preload" href="/hero.PNG" as="image" />
        <link rel="preload" href="/darkhe.PNG" as="image" />
        <link rel="preload" href="/mobherodark.jpeg" as="image" />
      </head>
      <body className="antialiased selection:bg-destructive selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
