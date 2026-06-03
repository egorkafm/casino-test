"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SeoBlock() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-border/40 rounded-md border p-6 sm:p-8">
      <div className="relative">
        <div className={expanded ? undefined : "max-h-[250px] overflow-hidden"}>
          <h2 className="text-foreground mb-6 text-xl font-extrabold sm:text-2xl">
            Online casino games on Stake - exclusive slots, live tables, and more
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="text-muted-foreground">
                Since 2017, we&apos;ve offered the best online gaming experience, compatible with
                local currencies, Bitcoin and other cryptocurrencies on the web. Read on to discover
                what makes Stake one of the most recognised online and crypto casinos in the world.
              </p>
              <div>
                <h3 className="text-foreground mb-2 font-bold">What makes Stake.com different?</h3>
                <p className="text-muted-foreground">
                  Stake stands out from the crowd by providing thousands of casino games, exciting
                  bonus features, and fair gameplay. Here&apos;s a look at what makes our casino shine.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">
                  Stake Originals and provably fair gaming explained
                </h3>
                <p className="text-muted-foreground">
                  Designed by our in-house Stake Originals team, these games are unique and
                  exclusive, boasting our signature dark theme with bursts of colour. Exciting games
                  like Mines, Dice, Limbo, and Plinko are some of our most popular original
                  creations. All Stake Originals offer provably fair gameplay — outcomes are verified
                  via cryptographic hashing on our site and via a 3rd party website.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">
                  Only on Stake - exclusive games you won&apos;t find anywhere else
                </h3>
                <p className="text-muted-foreground">
                  Only on Stake games are created by a wide range of providers using the Stake
                  Engine and can&apos;t be played anywhere else. Some favourites include Sweet Fiesta
                  1000 by Pragmatic Play, Airstrike 2 by Titan Gaming and Tavern Drop by Paperclip
                  Gaming.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className="text-foreground mb-2 font-bold">Casino games on Stake.com</h3>
                <p className="text-muted-foreground">
                  We have thousands of casino games to explore, including online slots, live dealer
                  titles, burst games, poker, table games, scratch cards, and much more.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">Slots - themes, mechanics, and bonus features</h3>
                <p className="text-muted-foreground">
                  Online slots are the most popular games on Stake, with 260+ software publishers.
                  Big names such as Hacksaw, Pragmatic Play, Massive Studios, and Nolimit City sit
                  alongside smaller studios bringing fresh ideas.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">Live casino - real dealers, real tables, real time</h3>
                <p className="text-muted-foreground">
                  With more than 150 titles from Evolution Gaming, Pragmatic Play Live, and Animo
                  Studios, the range covers blackjack, live roulette, Dragon Tiger, Sic Bo, live
                  baccarat, Live Monopoly, and more.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">Burst games - fast-paced and instant win action</h3>
                <p className="text-muted-foreground">
                  Filled with fast-paced gameplay, you&apos;ll find Keno, crash games, Mines, and
                  more. Popular titles include Pragmatic Plinko+, Aviamasters, MineDrop, Pachinko
                  Planet, and Drop the Boss.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 border-t pt-6 sm:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className="text-foreground mb-2 font-bold">Poker on Stake - tournaments, cash games, and more</h3>
                <p className="text-muted-foreground">
                  Card games include Stake Poker by Stake Originals, Poker Live by Evolution, Stake
                  Rummy, Double Poker by Virtual Gold Studios, and Gates of Bellatro: Hold&apos;em
                  by Gumble. Regular buy-in, freeroll, sit-and-go tournaments and cash games run
                  around the clock.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">How to get started on Stake.com</h3>
                <p className="text-muted-foreground">
                  Click Register and complete the sign-up form with your email, username, and
                  password. You can play the vast majority of games for free by loading demo
                  versions — flip the toggle from Real Play to Fun Play.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">Deposits &amp; withdrawals</h3>
                <p className="text-muted-foreground">
                  Supported cryptocurrencies include BTC, ETH, USDT, EOS, DOGE, LTC, SOL, TRX, and
                  more. Fiat options include CAD, TRY, VND, ARS, USD, INR, PHP, NGN, and more. Swap
                  Crypto lets you exchange one coin for another directly in your wallet.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className="text-foreground mb-2 font-bold">Bonuses, promotions, and VIP at Stake.com</h3>
                <p className="text-muted-foreground">
                  From Daily Races to the Weekly Raffle and Stake vs Eddie, there&apos;s always a
                  new way to cash in. The VIP program starts at $10k wagered (Bronze) and climbs up
                  to Platinum IV at $2.5M — unlocking rakeback, reload offers, and a dedicated VIP
                  host.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">Responsible gambling tools</h3>
                <p className="text-muted-foreground">
                  Take control of your experience at any time using loss limits, wager limits,
                  deposit limits, cooling-off periods, break in play, and self-exclusion.
                </p>
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-bold">Licensing &amp; safety</h3>
                <p className="text-muted-foreground">
                  Stake is licensed by the Curaçao Gaming Authority under license number
                  OGL/2024/1451/0918. All games are regularly audited for fairness. The site can be
                  loaded as a PWA from your mobile browser.
                </p>
              </div>
            </div>
          </div>
        </div>

        {!expanded && (
          <div className="from-card/0 to-card pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b" />
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          className="text-muted-foreground hover:text-foreground gap-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="size-4" />
              Read more
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
