import { http, HttpResponse } from "msw";
import { env } from "@/lib/env";
import type { GameSession, StartSessionRequest } from "@/lib/types/session";
import { mockState } from "./state";

const apiPath = (path: string) => {
  const base = env.apiUrl.replace(/\/$/, "");
  return `*${base}${path}`;
};

const DEFAULT_STAKE = 0.0001;

let sessionCounter = 0;
const nextSessionId = () => `s-${String(++sessionCounter).padStart(4, "0")}`;

function buildLaunchUrl(name: string, provider: string, sessionId: string): string {
  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><title>${escapeHtml(name)}</title>
<style>
  html,body{margin:0;height:100%;font-family:system-ui,-apple-system,sans-serif;color:#fff;background:radial-gradient(circle at 20% 20%,#1e3a8a 0%,#0f172a 60%);}
  main{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:2rem;}
  h1{font-size:2rem;margin:.5rem 0;}
  p{opacity:.8;}
  .id{margin-top:1rem;font:600 12px/1 ui-monospace,Menlo,monospace;opacity:.5;}
</style></head>
<body><main>
  <p>${escapeHtml(provider)}</p>
  <h1>${escapeHtml(name)}</h1>
  <p>Mock launcher — your session is live.</p>
  <div class="id">session ${escapeHtml(sessionId)}</div>
</main></body></html>`;
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const handlers = [
  http.get(apiPath("/me"), () => HttpResponse.json(mockState.getUser())),

  http.get(apiPath("/games"), () => HttpResponse.json(mockState.games)),

  http.get(apiPath("/transactions"), () =>
    HttpResponse.json(mockState.getTransactions()),
  ),

  http.post(apiPath("/games"), async ({ request }) => {
    let body: Partial<StartSessionRequest>;
    try {
      body = (await request.json()) as Partial<StartSessionRequest>;
    } catch {
      return HttpResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 },
      );
    }
    const gameId = body?.gameId;
    if (!gameId || typeof gameId !== "string") {
      return HttpResponse.json(
        { error: "gameId is required" },
        { status: 400 },
      );
    }
    const game = mockState.games.find((g) => g.id === gameId);
    if (!game) {
      return HttpResponse.json({ error: "Game not found" }, { status: 404 });
    }

    mockState.debit(DEFAULT_STAKE, game.id);

    const sessionId = nextSessionId();
    const session: GameSession = {
      sessionId,
      gameId: game.id,
      launchUrl: buildLaunchUrl(game.name, game.provider, sessionId),
    };
    return HttpResponse.json(session, { status: 201 });
  }),
];
