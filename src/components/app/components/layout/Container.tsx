"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { useState, type FC, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth-context";
import { I18nProvider } from "@/i18n/i18n-context";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nProvider>
          <CssBaseline />
          {children}
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
