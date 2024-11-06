import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

export const metadata: Metadata = {
  title: "MoneyMap",
  description: "See Every Penny, Save Every Dollar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster richColors position="bottom-right" />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
