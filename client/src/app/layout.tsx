import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Task Management",
  description: "build with love by lalit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        // ${geistSans.variable} ${geistMono.variable}
        className={`antialiased`}
      >
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
