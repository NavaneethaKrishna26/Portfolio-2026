import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/NavaneethaKrishna26',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/navaneethakrishna2026/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:krishnaofficial2026@gmail.com',
    icon: Mail,
  },
];

const SocialLinks = () => {
  return (
    <div className="social-links-float" aria-label="Social links">
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          className="social-link-icon"
          href={href}
          target={name === 'Email' ? undefined : '_blank'}
          rel={name === 'Email' ? undefined : 'noopener noreferrer'}
          aria-label={name}
          title={name}
        >
          <Icon size={18} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
