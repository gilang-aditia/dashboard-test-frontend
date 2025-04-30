import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient(); // Pastikan queryClient hanya dibuat di sini
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
