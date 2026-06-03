import type { Currency } from "@/lib/types/user";

const fiatFormatters: Partial<Record<Currency, Intl.NumberFormat>> = {};

function fiatFormatter(currency: Currency): Intl.NumberFormat {
  let formatter = fiatFormatters[currency];
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });
    fiatFormatters[currency] = formatter;
  }
  return formatter;
}

const cryptoFractionDigits: Record<string, number> = {
  BTC: 8,
  ETH: 6,
};

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === "BTC" || currency === "ETH") {
    const digits = cryptoFractionDigits[currency] ?? 6;
    return `${amount.toFixed(digits)} ${currency}`;
  }
  return fiatFormatter(currency).format(amount);
}

export function isCryptoCurrency(currency: Currency): boolean {
  return currency === "BTC" || currency === "ETH";
}

export function formatBalanceAmount(amount: number, currency: Currency): string {
  if (isCryptoCurrency(currency)) {
    return amount.toFixed(cryptoFractionDigits[currency] ?? 6);
  }
  return fiatFormatter(currency).format(amount);
}

export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

const integerFormatter = new Intl.NumberFormat("en-US");

export function formatPlayingCount(count: number): string {
  return integerFormatter.format(count);
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return dateTimeFormatter.format(date);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return dateFormatter.format(date);
}
