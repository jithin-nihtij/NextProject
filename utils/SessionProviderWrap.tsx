"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const SessionProviderWrap = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  return (
    <div>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
};

export default SessionProviderWrap;
