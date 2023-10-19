import './globals.css';
import 'react-datepicker/dist/react-datepicker.css';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });

import { GlobalContextProvider } from './contexts/store';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Au-Delà',
    template: '%s | Au-Delà',
  },
  openGraph: {
    type: 'website',
    description: 'Discover the universe with the NASA API app. Explore space exploration, astronomy, and more.',
    title: 'Au-Delà',
  },
  description: 'Discover the universe with the NASA API app. Explore space exploration, astronomy, and more.',
  creator: 'Catalyseur',

  colorScheme: 'dark',
  themeColor: '#0E0E0E',
  keywords:
    'nextjs, reactjs, tailwind, astronomy, news, articles, images, NASA api, space exploration, astronomy, planets, space news',

  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' contentEditable={false} className='no-scrollbar scroll-smooth bg-bg-black overflow-x-hidden'>
      <body className={`${roboto.className} m-0 p-0`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
