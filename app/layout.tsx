import Header from '@/components/Header';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
// eslint-disable-next-line camelcase
import { EB_Garamond, Inter } from 'next/font/google';

const eBGaramond = EB_Garamond({
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
});

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${eBGaramond.className} ${inter.className}`}
    >
      <body className="flex flex-col max-w-[1920px] w-full mx-auto p-4">
        <Header />
        <main className="flex flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
