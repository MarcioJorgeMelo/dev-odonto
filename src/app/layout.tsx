import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/components/session-auth";
import { Toaster, toast } from "sonner";
import { QueryClientContext } from "@/providers/queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Odonto PRO - Encontre os melhores profissionais",
  description:
    "Nós somos uma plataforma para profissionais de saúde com foco em agilizar seu atendimento de forma simplificada e organizada.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: "Odonto PRO - Encontre os melhores profissionais",
    description:
      "Nós somos uma plataforma para profissionais de saúde com foco em agilizar seu atendimento de forma simplificada e organizada.",
    images: [`${process.env.NEXT_PUBLIC_URL}/doctor-Hero.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster duration={2500} />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
