import Link from "next/link";
import { Logo } from "./logo";

const NAV_COLUMNS = [
  {
    heading: "Casino",
    links: [
      { label: "Home", href: "/" },
      { label: "Slots", href: "/" },
      { label: "Live Casino", href: "/" },
      { label: "Game Shows", href: "/" },
      { label: "Originals", href: "/" },
    ],
  },
  {
    heading: "Promotions",
    links: [
      { label: "Bonuses", href: "/" },
      { label: "VIP Program", href: "/" },
      { label: "Daily Races", href: "/" },
      { label: "Weekly Raffle", href: "/" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Live Chat", href: "/" },
      { label: "Responsible Gaming", href: "/" },
      { label: "Self-Exclusion", href: "/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Cookie Policy", href: "/" },
      { label: "License", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-sidebar border-border/40 border-t">
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              The world&apos;s leading crypto casino. Play thousands of slots, live tables, and
              exclusive original games.
            </p>
          </div>

          {NAV_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border/40 mt-10 flex flex-col items-center gap-3 border-t pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Stake.com | All Rights Reserved.
          </p>
          <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
            Stake is owned and operated by Medium Rare N.V., registration number: 145353, registered
            address: Seru Loraweg 17 B, Curaçao. Payment agent companies are Medium Rare Limited
            and MRS Tech Limited. Contact us at support@stake.com.
          </p>
          <p className="text-muted-foreground text-xs">
            Stake is committed to responsible gambling, for more information visit{" "}
            <a
              href="https://gamblingtherapy.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Gamblingtherapy.org
            </a>
          </p>
          <p className="text-muted-foreground text-xs">1 USDT = $1.00</p>
        </div>
      </div>
    </footer>
  );
}
