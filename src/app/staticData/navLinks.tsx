import { TbNotebook as NoteBookIcon, TbMailbox as MailIcon } from 'react-icons/tb';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';
import { BiPlanet as PlanetIcon, BiImage as ImageIcon, BiLock as LockIcon } from 'react-icons/bi';
import { FaRegNewspaper as NewsIcon } from 'react-icons/fa';
export const navLinks = [
  {
    title: 'Explore',
    delay: 0.6,
    icon: TelescopeIcon,
    subOptions: [
      {
        title: 'Image of the day',
        href: '/explore/image-of-the-day',
        icon: ImageIcon,
      },
      { title: 'News and studies', href: '/explore/news-and-studies', icon: NewsIcon },

      { title: 'Weather on Mars', href: '/weather-on-mars', icon: LockIcon },
    ],
  },
  { title: 'Our mission', delay: 0.8, icon: PlanetIcon, href: '/#mission' },
  { title: 'About', delay: 1.2, icon: NoteBookIcon, href: '/#about' },
  { title: 'Contact', delay: 1.4, icon: MailIcon, href: '/#contact' },
];
