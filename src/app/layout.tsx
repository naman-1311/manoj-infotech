import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import Layout from "@/components/hoc/main-layout";
import ScrollReset from "@/components/ui/scroll-reset";

export const metadata: Metadata = {
  title: "Manoj Infotec – House of Computers",
  description: "Chennai's trusted IT partner since 2000. Laptops, desktops, peripherals, networking & complete IT solutions at Mount Road.",
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  },
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ScrollReset />
        <NextTopLoader />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
