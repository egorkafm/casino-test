"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PromoBanner, type PromoBannerProps } from "./promo-banner";
import { Button } from "@/components/ui/button";

const PROMOS: ReadonlyArray<PromoBannerProps> = [
  {
    title: "Sugar Gates",
    subtitle: "Win a share in $20,000",
    ctaLabel: "Read More",
    imageUrl: "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/dce176b068ee1a2293d3509458bdc4ec9c648c6c-1080x1080.png?w=330&h=330&fit=min&auto=format",
  },
  {
    title: "Centurion Millions Poker Series",
    subtitle: "Poker Series",
    ctaLabel: "Play Now",
    imageUrl: "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/87e3a619f25ee4680f6c608fb68e372ba61e59cf-1080x1080.png?w=330&h=330&fit=min&auto=format",
  },
  {
    title: "2x VIP Progress",
    subtitle: "Boosted VIP on Only on Stake Games",
    ctaLabel: "Play Now!",
    imageUrl: "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/ab8625d1dafda62c2ff9f0fe55b2948e20cee612-1080x1080.png?w=330&h=330&fit=min&auto=format",
  },
  {
    title: "Daily Races",
    subtitle: "Play in our $100,000 Daily Race",
    ctaLabel: "Race Now",
    imageUrl: "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/8d7fe57f53c2af55842f6037d372642bf3f6f2c6-1080x1080.png?w=330&h=330&fit=min&auto=format",
  },
  {
    title: "Weekly Raffle",
    subtitle: "Share in $75,000 each week",
    ctaLabel: "Learn More",
    imageUrl: "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/71e15c9ccd041710ead4b0d1297d09a691b99f4c-1080x1080.png?w=330&h=330&fit=min&auto=format",
  },
  {
    title: "Stake vs Eddie",
    subtitle: "Win a share in $50,000 every week",
    ctaLabel: "Play Now",
    imageUrl: "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/0b91c0f66eb9f58a4de9ac42851c4251a1cd1f6e-1080x1080.png?w=330&h=330&fit=min&auto=format",
  },
];

export function PromoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section aria-label="Promotions" className="relative flex items-center gap-2">
      <Button
        size="icon"
        variant="ghost"
        aria-label="Previous promotion"
        onClick={scrollPrev}
        disabled={!canPrev}
        className="absolute left-[-40px] hidden shrink-0 [@media(min-width:1440px)]:flex"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-6px)] lg:flex-[0_0_calc(33.333%-8px)]"
            >
              <PromoBanner {...promo} />
            </div>
          ))}
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        aria-label="Next promotion"
        onClick={scrollNext}
        disabled={!canNext}
        className="absolute right-[-40px] hidden shrink-0 [@media(min-width:1440px)]:flex"
      >
        <ChevronRight className="size-4" />
      </Button>
    </section>
  );
}
