import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@baseauth";
import SessionProvider from "@/components/auth/SessionProvider";
import App from "@/features/App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "parkrunClub",
    description: "parkrun Clubs",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <App>{children}</App>
                </SessionProvider>
            </body>
        </html>
    );
}
