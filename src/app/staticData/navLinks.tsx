import { TbNotebook as NoteBookIcon, TbMailbox as MailIcon } from 'react-icons/tb';
import { IoTelescopeOutline as TelescopeIcon } from 'react-icons/io5';
import { BiPlanet as PlanetIcon } from 'react-icons/bi';
export const navLinks = [
  {
    title: 'Explore',
    delay: 0.6,
    icon: <TelescopeIcon className={`text-main-orange-accent w-6 h-6`} />,
    subOptions: [
      {
        title: 'Image of the day',
        href: '/explore/picture-of-the-day',
      },
      { title: 'Planets', href: '/explore/planets' },
      { title: 'Stars', href: '/explore/stars' },
      { title: 'Weather on Mars', href: '/weather-on-mars' },
    ],
  },
  { title: 'Our mission', delay: 0.8, icon: <PlanetIcon className={`text-main-orange-accent w-6 h-6`} /> },
  { title: 'About', delay: 1.2, icon: <NoteBookIcon className={`text-main-orange-accent w-6 h-6`} /> },
  { title: 'Contact', delay: 1.4, icon: <MailIcon className={`text-main-orange-accent w-6 h-6`} /> },
];
