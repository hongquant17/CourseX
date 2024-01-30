import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SessionProvider from "@/components/providers/session-provider";
import { getSession } from "@/lib/auth";
import { NotificationProvider } from "@/components/providers/notification-provider";
import { QuerySocketProvider } from "@/components/providers/socket/socket-provider";

const inter = Inter({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "CourseX",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QuerySocketProvider>
              <ConfettiProvider />
              {session && <NotificationProvider />}
              <ToasterProvider />
              {children}
            </QuerySocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
