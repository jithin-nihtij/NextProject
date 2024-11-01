"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default ReactQueryClientProvider;
