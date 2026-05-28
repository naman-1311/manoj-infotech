import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import Layout from "@/components/hoc/main-layout";
import ScrollReset from "@/components/ui/scroll-reset";

export const metadata: Metadata = {
  title: "Manoj Infotec – House of Computers",
  description: "Chennai's trusted IT partner since 2000. Custom PC builds, laptops, desktops, peripherals, networking & complete IT solutions at Mount Road.",
  keywords: ["custom PC build Chennai", "gaming PC Chennai", "laptop store Mount Road", "IT solutions Chennai", "computer shop Chennai", "Manoj Infotec"],
  authors: [{ name: "Manoj Infotec" }],
  metadataBase: new URL("https://manojinfotec.com"),
  openGraph: {
    title: "Manoj Infotec – House of Computers",
    description: "Chennai's trusted IT partner since 2000. Custom PC builds, laptops, peripherals & complete IT solutions.",
    url: "https://manojinfotec.com",
    siteName: "Manoj Infotec",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manoj Infotec – House of Computers",
    description: "Chennai's trusted IT partner since 2000. Custom PC builds, laptops, peripherals & complete IT solutions.",
  },
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollReset />
        <NextTopLoader color="#DC2626" showSpinner={false} />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
