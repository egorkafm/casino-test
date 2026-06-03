"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

interface GameThumbnailProps {
  gameId: string;
  title: string;
  sizes: string;
  className?: string;
}

const ATTEMPTS: ReadonlyArray<(id: string) => string> = [
  (id) => `https://thumb.all-ingame.com/iv2/${id}.png`,
  (id) => `https://thumb.all-ingame.com/iv3/${id}.png`,
];

export function GameThumbnail({
  gameId,
  title,
  sizes,
  className,
}: GameThumbnailProps) {
  const [attempt, setAttempt] = useState(0);

  const src = useMemo(() => {
    const build = ATTEMPTS[attempt];
    return build ? build(gameId) : null;
  }, [attempt, gameId]);

  const handleError = useCallback(() => {
    setAttempt((current) => current + 1);
  }, []);

  if (!src) return <ThumbnailFallback title={title} className={className} />;

  return (
    <Image
      key={src}
      src={src}
      alt={title}
      fill
      sizes={sizes}
      className={className}
      onError={handleError}
      unoptimized
    />
  );
}

function ThumbnailFallback({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const initial = title.charAt(0).toUpperCase();
  const hue = hashHue(title);

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 60% 35%) 0%, hsl(${(hue + 60) % 360} 55% 22%) 100%)`,
      }}
      role="img"
      aria-label={title}
    >
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-4xl font-black text-white/90">{initial}</span>
      </div>
    </div>
  );
}

function hashHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
}
