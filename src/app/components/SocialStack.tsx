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
          <Link
            key={link.href}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className={`animate-animate-social-stack transition-all -translate-y-[200%] -translate-x-[24%] opacity-0`}
            style={{
              animationDelay: String(index - index * 0.85 + 's'),
            }}
          >
            <Icon
              className={`text-deep-green  text-lg cursor-pointer hover:text-interactive-green transition-all hover:scale-150 `}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialStack;
