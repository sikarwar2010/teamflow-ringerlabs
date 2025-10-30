import * as React from "react";
import "@/lib/orpc.server"; //for pre-rendering
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Providers } from "@/components/providers/TanstackProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Teamflow Youtube",
    description: "This is a demo app for Teamflow Youtube",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Providers>
                            {children}
                            <Toaster closeButton position="top-center" />
                        </Providers>
                    </ThemeProvider>
                </body>
            </html>
        </AuthProvider>
    );
}
