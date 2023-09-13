import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'au-delà',
  description: 'Astronomy app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-screen'>
      <body className={`${roboto.className} m-0 p-0 h-screen`}>{children}</body>
    </html>
  );
}
