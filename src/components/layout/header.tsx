"use client";

import Link from "next/link";
import { Bell, MessageCircle, Search, UserRound } from "lucide-react";
import { Logo } from "./logo";
import { BalancePill } from "./balance-pill";
import { WalletButton } from "./wallet-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="bg-sidebar border-border/40 sticky top-0 z-30 w-full border-b">
      <div className="flex h-16 w-full items-center justify-between gap-3 px-3 sm:px-4">
        <div className="flex">
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <BalancePill />
          <div className="hidden sm:block">
            <WalletButton />
          </div>
        </div>

        <div className="ml-2 flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hidden gap-1.5 px-2 hover:text-white md:inline-flex"
            aria-label="Search"
          >
            <Search className="size-4" />
            <span className="text-sm font-semibold">Search</span>
          </Button>
          <IconButton ariaLabel="Profile" href="/profile">
            <UserRound className="size-4" />
          </IconButton>
          <IconButton ariaLabel="Notifications" className="hidden sm:inline-flex">
            <Bell className="size-4" />
          </IconButton>
          <IconButton ariaLabel="Chat" className="hidden sm:inline-flex">
            <MessageCircle className="size-4" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  ariaLabel,
  className,
  href,
  children,
}: {
  ariaLabel: string;
  className?: string;
  href?: string;
  children: React.ReactNode;
}) {
  const classes = cn("text-muted-foreground hover:text-white", className);
  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={cn(buttonVariants({ size: "icon", variant: "ghost" }), classes)}
      >
        {children}
      </Link>
    );
  }
  return (
    <Button size="icon" variant="ghost" aria-label={ariaLabel} className={classes}>
      {children}
    </Button>
  );
}
