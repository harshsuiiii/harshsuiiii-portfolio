import type { ReactElement } from "react";

/**
 * One original, conceptual visual per project, drawn from what the code does.
 * They are diagrams, not screenshots. Colours come from the poster: `currentColor`
 * is the foreground and `var(--p-accent)` the accent.
 */

// Small deterministic PRNG so server and client render identical markup.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const A = "var(--p-accent)";
const mono = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em" } as const;

function Booking() {
  const ys = [120, 190, 260, 330];
  const arrive = [250, 310, 0, 280]; // third supplier times out
  return (
    <>
      <circle cx="56" cy="225" r="9" fill="currentColor" />
      {ys.map((y, i) => (
        <g key={y}>
          <path d={`M56 225 C 110 225, 100 ${y}, 150 ${y}`} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="150" y1={y} x2="344" y2={y} stroke="currentColor" strokeWidth="1.5" strokeDasharray={arrive[i] ? "0" : "3 6"} opacity={arrive[i] ? 1 : 0.5} />
          {arrive[i] ? (
            <rect x={arrive[i] - 7} y={y - 7} width="14" height="14" fill={A} />
          ) : (
            <path d={`M330 ${y - 7} l14 14 m0 -14 l-14 14`} stroke="currentColor" strokeWidth="2" />
          )}
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="56" y={400 + i * 22} width={288 - i * 70} height="12" fill="currentColor" opacity={1 - i * 0.28} />
      ))}
    </>
  );
}

function RedTeam() {
  return (
    <>
      {[150, 108, 66, 24].map((r, i) => (
        <circle key={r} cx="200" cy="215" r={r} fill="none" stroke="currentColor" strokeWidth="1" opacity={0.25 + i * 0.2} />
      ))}
      <path d="M200 40 V390 M25 215 H375" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="215" r="7" fill={A} />
      <path d="M262 150 l18 18 l34 -40" fill="none" stroke={A} strokeWidth="5" />
      {["hypothesis", "execute", "verified"].map((t, i) => (
        <text key={t} x="40" y={430 + i * 20} fill={i === 2 ? A : "currentColor"} opacity={i === 2 ? 1 : 0.6} style={mono}>
          {`> ${t}`}
        </text>
      ))}
    </>
  );
}

function RateLimiter() {
  const tokens = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) tokens.push({ x: 122 + c * 39, y: 330 - r * 39, on: r < 2 || (r === 2 && c < 3) });
  return (
    <>
      <path d="M96 170 V360 H304 V170" fill="none" stroke="currentColor" strokeWidth="3" />
      {tokens.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r="13" fill={t.on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" opacity={t.on ? 1 : 0.35} />
      ))}
      {[80, 118].map((y) => (
        <circle key={y} cx="200" cy={y} r="13" fill="currentColor" opacity={y === 80 ? 0.4 : 0.75} />
      ))}
      <path d="M40 420 H190 m-12 -8 l12 8 l-12 8" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="204" y="424" fill="currentColor" style={mono}>200 OK</text>
      <path d="M40 452 H150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <text x="204" y="456" fill="currentColor" opacity="0.6" style={mono}>429 RETRY-AFTER</text>
    </>
  );
}

function Shortly() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const hot = new Set(["a", "Z", "3", "k", "9", "Q", "x"]);
  return (
    <>
      {chars.map((c, i) => (
        <text key={c} x={46 + (i % 10) * 34} y={96 + Math.floor(i / 10) * 30} fill={hot.has(c) ? A : "currentColor"} opacity={hot.has(c) ? 1 : 0.28} style={{ ...mono, fontSize: 15 }} fontWeight={hot.has(c) ? 700 : 400}>
          {c}
        </text>
      ))}
      <text x="40" y="372" fill="currentColor" style={{ fontFamily: "var(--font-display)", fontSize: 66, fontWeight: 700, letterSpacing: "-0.04em" }}>
        /aZ3k9Qx
      </text>
      <path d="M40 410 H360" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <text x="40" y="440" fill="currentColor" opacity="0.6" style={mono}>302 → no-store</text>
    </>
  );
}

function Rag() {
  const pts = [
    { x: 200, y: 96, t: "RETRIEVE" },
    { x: 318, y: 290, t: "GENERATE" },
    { x: 82, y: 290, t: "CRITIC" },
  ];
  return (
    <>
      <circle cx="200" cy="225" r="136" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" opacity="0.6" />
      <path d="M82 290 A136 136 0 0 1 200 89" fill="none" stroke={A} strokeWidth="4" />
      <path d="M186 80 l16 9 l-9 16" fill="none" stroke={A} strokeWidth="4" />
      {pts.map((p, i) => (
        <g key={p.t}>
          <rect x={p.x - 16} y={p.y - 16} width="32" height="32" fill={i === 2 ? A : "currentColor"} />
          <text x={p.x} y={p.y + 40} textAnchor="middle" fill="currentColor" style={mono}>{p.t}</text>
        </g>
      ))}
      <text x="200" y="232" textAnchor="middle" fill="currentColor" opacity="0.6" style={mono}>RETRY ≤ 2</text>
      <path d="M82 340 V420 H180" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="190" y="424" fill="currentColor" style={mono}>ACCEPT / FALLBACK</text>
    </>
  );
}

function Dns() {
  const r = rng(53);
  const hex = () => Math.floor(r() * 256).toString(16).padStart(2, "0").toUpperCase();
  const cells = Array.from({ length: 80 }, (_, i) => ({ i, v: i === 44 ? "C0" : i === 45 ? "0C" : hex() }));
  return (
    <>
      <text x="40" y="70" fill="currentColor" style={mono}>HEADER · 12 BYTES</text>
      {cells.map(({ i, v }) => {
        const x = 40 + (i % 8) * 41;
        const y = 90 + Math.floor(i / 8) * 33;
        const header = i < 12;
        const ptr = i === 44 || i === 45;
        return (
          <g key={i}>
            <rect x={x} y={y} width="35" height="27" fill={header || ptr ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" opacity={header || ptr ? 1 : 0.35} />
            <text x={x + 17.5} y={y + 18} textAnchor="middle" fill={header || ptr ? "var(--p-bg)" : "currentColor"} opacity={header || ptr ? 1 : 0.7} style={{ ...mono, fontSize: 11, letterSpacing: 0 }}>
              {v}
            </text>
          </g>
        );
      })}
      <path d="M239 268 C 300 268, 330 180, 232 136" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="40" y="452" fill="currentColor" style={mono}>0xC0 → POINTER TO OFFSET 12</text>
    </>
  );
}

function Diffusion() {
  const r = rng(7);
  const cells = [];
  for (let y = 0; y < 18; y++)
    for (let x = 0; x < 16; x++) {
      const t = y / 17; // top = noise, bottom = signal
      const d = Math.hypot(x - 9.5, y - 13) / 4.2;
      const signal = Math.max(0, 1 - d) ** 1.6;
      const o = (1 - t) * r() * 0.75 + t * signal + (r() < 0.02 ? 0.5 : 0);
      cells.push({ x, y, o: Math.min(1, o), hot: t > 0.5 && signal > 0.45 });
    }
  return (
    <>
      {cells.map((c, i) => (
        <rect key={i} x={40 + c.x * 20} y={50 + c.y * 20} width="17" height="17" fill={c.hot ? A : "currentColor"} opacity={Math.max(0.04, c.o)} />
      ))}
      <text x="40" y="440" fill="currentColor" opacity="0.7" style={mono}>x_T NOISE → x_0 SAMPLE</text>
    </>
  );
}

function SparseNn() {
  const r = rng(21);
  const layers = [5, 8, 8, 5, 1];
  const pos = layers.map((n, l) => Array.from({ length: n }, (_, i) => ({ x: 52 + l * 74, y: 225 + (i - (n - 1) / 2) * 42 })));
  const edges = [];
  for (let l = 0; l < pos.length - 1; l++) for (const a of pos[l]) for (const b of pos[l + 1]) edges.push({ a, b, keep: r() < 0.22 });
  return (
    <>
      {edges.map((e, i) => (
        <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} stroke={e.keep ? A : "currentColor"} strokeWidth={e.keep ? 1.6 : 0.6} opacity={e.keep ? 0.95 : 0.14} />
      ))}
      {pos.flat().map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="6" fill="currentColor" />
      ))}
      <text x="40" y="452" fill="currentColor" opacity="0.8" style={mono}>GLOBAL L1 PRUNING · 80%</text>
    </>
  );
}

function BotForge() {
  return (
    <>
      <rect x="70" y="60" width="260" height="290" rx="18" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M70 108 H330" stroke="currentColor" strokeWidth="2" />
      <circle cx="96" cy="84" r="7" fill={A} />
      <rect x="92" y="130" width="150" height="34" rx="17" fill="currentColor" opacity="0.14" />
      <rect x="158" y="176" width="150" height="34" rx="17" fill="currentColor" />
      <rect x="92" y="222" width="190" height="34" rx="17" fill="currentColor" opacity="0.14" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={108 + i * 14} cy="292" r="4" fill="currentColor" opacity={0.35 + i * 0.3} />
      ))}
      <circle cx="318" cy="392" r="26" fill={A} />
      <path d="M306 386 h24 v14 h-14 l-6 6 v-6 h-4 z" fill="var(--p-bg)" />
      <text x="40" y="452" fill="currentColor" style={{ ...mono, letterSpacing: 0 }}>{'<script src="widget.js">'}</text>
    </>
  );
}

function ReviveX() {
  const steps = [
    { x: 40, y: 330, t: "SOFT" },
    { x: 146, y: 250, t: "FIRM" },
    { x: 252, y: 170, t: "FINAL" },
  ];
  return (
    <>
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={s.x} y={s.y} width="108" height={410 - s.y} fill={i === 2 ? A : "currentColor"} opacity={i === 2 ? 1 : 0.18 + i * 0.22} />
          <text x={s.x + 10} y={s.y - 12} fill="currentColor" style={mono}>{`0${i + 1} ${s.t}`}</text>
        </g>
      ))}
      <path d="M40 120 H360" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" opacity="0.5" />
      <text x="40" y="108" fill="currentColor" opacity="0.6" style={mono}>MAX 3 ATTEMPTS</text>
      <text x="40" y="452" fill="currentColor" opacity="0.6" style={mono}>QUIET HOURS 21:00–08:00 IST</text>
    </>
  );
}

function Trading() {
  const r = rng(99);
  const rows = Array.from({ length: 9 }, (_, i) => ({ bid: 30 + r() * 30 + i * 11, ask: 30 + r() * 30 + i * 11 }));
  return (
    <>
      <line x1="200" y1="50" x2="200" y2="400" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {rows.map((row, i) => (
        <g key={i}>
          <rect x={196 - row.bid} y={64 + i * 37} width={row.bid} height="26" fill="currentColor" opacity={1 - i * 0.08} />
          <rect x="204" y={64 + i * 37} width={row.ask} height="26" fill="none" stroke="currentColor" strokeWidth="1.5" opacity={1 - i * 0.08} />
        </g>
      ))}
      <text x="40" y="440" fill="currentColor" style={mono}>BIDS</text>
      <text x="360" y="440" textAnchor="end" fill="currentColor" style={mono}>ASKS</text>
      <text x="200" y="440" textAnchor="middle" fill="currentColor" style={mono}>MID</text>
    </>
  );
}

function Chat() {
  const bubbles = [
    { x: 40, y: 70, w: 190, mine: false },
    { x: 150, y: 128, w: 210, mine: true },
    { x: 40, y: 186, w: 140, mine: false },
    { x: 210, y: 244, w: 150, mine: true },
  ];
  return (
    <>
      {bubbles.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height="42" rx="21" fill={b.mine ? A : "currentColor"} opacity={b.mine ? 1 : 0.2} />
      ))}
      <path d="M40 360 H120 l14 -34 l22 68 l20 -52 l12 18 H360" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="360" r="6" fill="currentColor" />
      <circle cx="360" cy="360" r="6" fill={A} />
      <text x="40" y="440" fill="currentColor" opacity="0.7" style={mono}>emit(&quot;newMessage&quot;)</text>
    </>
  );
}

const visuals: Record<string, () => ReactElement> = {
  "booking-agent": Booking,
  autoredteam: RedTeam,
  "rate-limiter": RateLimiter,
  shortly: Shortly,
  "self-healing-rag": Rag,
  auroradns: Dns,
  "cms-diffusion": Diffusion,
  "sparse-nn": SparseNn,
  botforge: BotForge,
  revivex: ReviveX,
  "trading-engine": Trading,
  "real-time-chat": Chat,
};

type Props = { slug: string; poster: { bg: string; fg: string; accent: string }; title: string; className?: string };

export function ProjectVisual({ slug, poster, title, className = "" }: Props) {
  const Visual = visuals[slug];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: poster.bg, color: poster.fg, "--p-accent": poster.accent, "--p-bg": poster.bg } as React.CSSProperties}
    >
      <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Conceptual diagram for ${title}`} className="size-full">
        {Visual ? <Visual /> : null}
      </svg>
    </div>
  );
}
