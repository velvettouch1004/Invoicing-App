import Header from '@/components/Header';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
// eslint-disable-next-line camelcase
import { Bodoni_Moda, Inter } from 'next/font/google';

const bodoniModa = Bodoni_Moda({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-bodoniModa',
  weight: '400',
});

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
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
      className={`${bodoniModa.variable} ${inter.variable}`}
    >
      <body className="flex flex-col max-w-[1920px] w-full mx-auto p-4">
        <Header />
        <main className="flex flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
