import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageUrl: string;
}

export function PromoBanner({
  title,
  subtitle,
  ctaLabel,
  imageUrl,
}: PromoBannerProps) {
  return (
    <div className="bg-card/70 flex justify-between h-44 overflow-hidden rounded-md sm:h-48">
      <div className="flex flex-1 min-w-0 flex-col items-start gap-3 overflow-hidden p-4 sm:p-5">
        <span className="bg-white text-primary-foreground shrink-0 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
          Promotion
        </span>
        <h3 className="text-foreground w-full truncate text-lg leading-tight font-extrabold sm:text-xl">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
          {subtitle}{" "}
          <button
            type="button"
            className="text-foreground font-semibold hover:underline"
          >
            Read More
          </button>
        </p>
        <Button size="sm" className="mt-auto shrink-0 font-semibold" variant="secondary">
          {ctaLabel}
        </Button>
      </div>

      <div className={`flex-1 w-full relative z-10`}>
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover opacity-80 mix-blend-overlay"
          sizes="33vw"
          unoptimized
        />
      </div>
    </div>
  );
}
