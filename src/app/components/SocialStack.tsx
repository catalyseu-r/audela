import React from 'react';
import { socialLinks } from '../staticData/socialLinks';
import Link from 'next/link';

interface SocialStackProps {
  isInMenu?: boolean;
}

const SocialStack = (props: SocialStackProps) => {
  return (
    <div className={`${props.isInMenu ? 'w-32 flex-wrap ' : 'w-full'} flex items-center content-center gap-8 `}>
      {socialLinks.map((link, index, orig) => {
        const Icon = orig[index].icon;
        return (
          <Link key={link.href} href={link.href} target='_blank' rel='noopener noreferrer'>
            <Icon
              className={`text-deep-green  text-base cursor-pointer hover:text-interactive-green hover:scale-150 transition-all`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialStack;
