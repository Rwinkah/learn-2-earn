import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OnboardMe",
    template: "%s | OnboardMe",
  },
  description:
    "Onboarding plaform for web3 newbies",
  authors: [{ name: "Retrodevs" }],
  openGraph: {
    title: { default: "OnboardMe", template: "%s | OnboardMe" },
    description:
      "Onboarding plaform for web3 newbies",
    images: "",
    siteName: "OnboardMe",
    url: "",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: { default: "OnboardMe", template: "%s | OnboardMe" },
    description:
      "Onboarding platform for web3 newbies",
    creator: "RetroDevs",
    images: [
      "https://www.pexels.com/photo/grayscale-photo-of-bicycle-beside-seashore-103523/",
    ], // Must be an absolute URL
  },
  metadataBase: new URL(
    "https://www.pexels.com/photo/grayscale-photo-of-bicycle-beside-seashore-103523/"
  ),
  icons: { shortcut: ["/favicon.ico"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
