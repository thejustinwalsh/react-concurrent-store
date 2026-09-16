"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const pages = [
  { href: "/", title: "Guarantees" },
  { href: "/router", title: "Navigation" },
  { href: "/atom", title: "Urgency" },
  { href: "/identity", title: "Selectors" },
  { href: "/fetching", title: "Refetching" },
  { href: "/ssr", title: "SSR" },
  { href: "/rsc", title: "RSC" },
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
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
