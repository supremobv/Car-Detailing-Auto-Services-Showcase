import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "REFINE — Every detail matters",
  description:
    "Considered car care, inside and out. Explore detailing packages, finish concepts, vehicle-based pricing, and service inquiries at REFINE Auto Studio.",
  icons: { icon: "/favicon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
