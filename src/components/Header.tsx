import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#games", label: "Our Games" },
  { href: "#about", label: "Who We Are" },
  { href: "#contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash("#" + entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observerRef.current!.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Wonderloop Studios home">
        <img src="/assets/logo_wordmark.png" alt="Wonderloop Studios" />
      </a>
      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="mainNav"
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
        </svg>
      </button>
      <nav id="mainNav" className={"main-nav" + (open ? " open" : "")}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={"nav-link" + (activeHash === item.href ? " active" : "")}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
