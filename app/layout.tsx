import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FrenSpeak — TCF Exam Trainer",
    description:
        "Structured TCF B2 preparation: speaking simulation, listening practice, AI examiner, and progress tracking.",
    keywords: ["TCF", "French", "exam prep", "speaking", "listening", "B2"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${geistMono.variable}`}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
