import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });
import 'react-datepicker/dist/react-datepicker.css';

export const metadata: Metadata = {
  title: 'au-delà',
  description: 'Astronomy app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='lg:scrollbar-custom no-scrollbar bg-main-black'>
      <body className={`${roboto.className} m-0 p-0`}>{children}</body>
    </html>
  );
}
