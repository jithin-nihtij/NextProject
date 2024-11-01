import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "./fonts/fonts";
import React from "react";
import ReactQueryClientProvider from "@/utils/QueryClientProvider";

import { getServerSession } from "next-auth";

import SessionProviderWrap from "@/utils/SessionProviderWrap";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <SessionProviderWrap session={session}>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </SessionProviderWrap>
      </body>
    </html>
  );
}
