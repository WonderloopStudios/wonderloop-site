import type { CSSProperties, ReactNode } from "react";

export type SocialLink = {
  label: string;
  href: string;
  color: string;
  icon: ReactNode;
};

export default function LinkCards({ links }: { links: SocialLink[] }) {
  return (
    <div className="links">
      {links.map((link) => (
        <a
          key={link.href}
          className="link-card"
          style={{ "--icon-color": link.color } as CSSProperties}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
          {link.label}
        </a>
      ))}
    </div>
  );
}
