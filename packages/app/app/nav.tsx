"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const pages = [
  { href: "/", title: "Gauntlet", blurb: "Is it correct?" },
  { href: "/router", title: "Router", blurb: "TanStack Router + Query" },
  { href: "/atom", title: "One atom", blurb: "Redux" },
  { href: "/identity", title: "Identity", blurb: "Relay" },
  { href: "/fetching", title: "Fetching", blurb: "Fate" },
  { href: "/ssr", title: "SSR", blurb: "Hydration" },
  { href: "/rsc", title: "RSC", blurb: "Server components" },
];

export function Nav() {
  const here = usePathname();
  return (
    <nav className="tabs">
      {pages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className={page.href === here ? "tab here" : "tab"}
          aria-current={page.href === here ? "page" : undefined}
        >
          <span className="t">{page.title}</span>
          <span className="b">{page.blurb}</span>
        </Link>
      ))}
    </nav>
  );
}
