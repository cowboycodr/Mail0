"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import * as React from "react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <PostHogProvider client={posthog}>
        <SidebarProvider>{children}</SidebarProvider>
      </PostHogProvider>
    </NextThemesProvider>
  );
}
