"use client";

import { useState, useRef, useEffect } from "react";
import { Headphones, X, Home, MessageCircle, HelpCircle, Search, Send, ChevronRight, BookOpen, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_CARDS = [
  { icon: Zap, title: "Deposit & Withdrawal", desc: "Fast crypto transactions" },
  { icon: Shield, title: "Account Verification", desc: "KYC & security settings" },
  { icon: BookOpen, title: "Bonuses & Promotions", desc: "How rewards work" },
];

type Tab = "home" | "chat" | "help";

export function LiveSupport() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [message, setMessage] = useState("");
  const [helpQuery, setHelpQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          ref={panelRef}
          className="bg-card border-border/60 flex h-[500px] w-80 flex-col overflow-hidden rounded-2xl border shadow-2xl"
          role="dialog"
          aria-label="Live Support"
        >
          <div className="from-primary/90 to-primary flex shrink-0 flex-col gap-1 bg-gradient-to-br px-4 pb-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground text-sm font-bold">Live Support</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground rounded-md p-0.5 transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-primary-foreground/80 text-xs">We&apos;re here to help 24/7 👋</p>
            <div className="mt-2 flex gap-1">
              {(["home", "chat", "help"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium transition-colors",
                    tab === t
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white/80"
                  )}
                >
                  {t === "home" && <Home className="size-3" />}
                  {t === "chat" && <MessageCircle className="size-3" />}
                  {t === "help" && <HelpCircle className="size-3" />}
                  <span className="capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {tab === "home" && (
              <div className="flex flex-col gap-3 p-4">
                <div className="flex -space-x-2">
                  {["👨‍💻", "👩‍💻", "🧑‍💻"].map((emoji, i) => (
                    <span
                      key={i}
                      className="bg-muted border-card flex size-8 items-center justify-center rounded-full border-2 text-sm"
                    >
                      {emoji}
                    </span>
                  ))}
                  <span className="border-card bg-emerald-500 ml-1 flex size-8 items-center justify-center rounded-full border-2">
                    <span className="size-2 rounded-full bg-white" />
                  </span>
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">Hello! 👋 How can we help?</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">Typical reply time: under a minute</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTab("chat")}
                  className="bg-primary text-primary-foreground flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                >
                  <span>Send us a message</span>
                  <ChevronRight className="size-4" />
                </button>
                <div className="flex flex-col gap-2">
                  <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Popular topics</p>
                  {FAQ_CARDS.map(({ icon: Icon, title, desc }) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setTab("help")}
                      className="border-border/40 hover:bg-muted flex items-center gap-3 rounded-lg border p-3 text-left transition-colors"
                    >
                      <span className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-foreground text-xs font-semibold">{title}</p>
                        <p className="text-muted-foreground truncate text-xs">{desc}</p>
                      </div>
                      <ChevronRight className="text-muted-foreground ml-auto size-3.5 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab === "chat" && (
              <div className="flex h-full flex-col">
                <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <MessageCircle className="size-6" />
                  </span>
                  <p className="text-foreground text-sm font-semibold">Start a conversation</p>
                  <p className="text-muted-foreground text-xs">Our support team is online and ready to help.</p>
                </div>
              </div>
            )}

            {tab === "help" && (
              <div className="flex flex-col gap-3 p-4">
                <div className="border-border/40 relative flex items-center rounded-lg border">
                  <Search className="text-muted-foreground absolute left-3 size-3.5" />
                  <input
                    type="text"
                    placeholder="Search for answers…"
                    value={helpQuery}
                    onChange={(e) => setHelpQuery(e.target.value)}
                    className="bg-transparent w-full py-2.5 pl-9 pr-3 text-xs outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    "How to deposit crypto?",
                    "Withdrawal processing time",
                    "How does KYC work?",
                    "VIP Program benefits",
                    "Responsible gaming tools",
                    "Bonus wagering requirements",
                  ]
                    .filter((q) => !helpQuery || q.toLowerCase().includes(helpQuery.toLowerCase()))
                    .map((q) => (
                      <button
                        key={q}
                        type="button"
                        className="hover:bg-muted flex items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors"
                      >
                        <span className="text-foreground text-xs">{q}</span>
                        <ChevronRight className="text-muted-foreground size-3.5 shrink-0" />
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {tab === "chat" && (
            <div className="border-border/40 shrink-0 border-t p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); setMessage(""); }}
                className="border-border/40 flex items-center gap-2 rounded-lg border px-3 py-2"
              >
                <input
                  type="text"
                  placeholder="Type a message…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-transparent min-w-0 flex-1 text-xs outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="text-primary disabled:opacity-40"
                  disabled={!message.trim()}
                  aria-label="Send"
                >
                  <Send className="size-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle live support"
        className={cn(
          "bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-full shadow-lg transition-all hover:opacity-90 active:scale-95",
          open && "rotate-12"
        )}
      >
        {open ? <X className="size-6" /> : <Headphones className="size-6" />}
      </button>
    </div>
  );
}
