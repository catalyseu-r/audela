import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalContextProvider } from './contexts/store';

export const metadata: Metadata = {
  title: 'au-delà - 🚧 Under Construction 🛠️',
  description: 'Astronomy app',

  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' contentEditable={false} className='lg:scrollbar-custom no-scrollbar bg-bg-black'>
      <body className={`${roboto.className} m-0 p-0`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
