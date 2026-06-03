import type { Metadata } from "next";
import { GamePage } from "@/components/home/game-page";
import { SEED_GAMES } from "@/mocks/data/games";

export function generateStaticParams() {
  return SEED_GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { title: `${name} · Casino` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <GamePage slug={slug} />;
}
