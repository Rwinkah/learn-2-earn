import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  openGraph: { title: "Settings" },
  twitter: { title: "Settings" },
};

export default function page() {
  return (
    <>
    <h1 className="text-white">settings</h1>
    </>
  );
}
