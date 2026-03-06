import { useState, useEffect, useMemo } from "react";
import "./App.css";

// ─────────────────────────────────────────────
//  DATA LAYER
// ─────────────────────────────────────────────

const MBTI_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

const MBTI_INFO = {
  INTJ: { name: "Architect", emoji: "🏛️" },
  INTP: { name: "Logician", emoji: "🔬" },
  ENTJ: { name: "Commander", emoji: "⚔️" },
  ENTP: { name: "Debater", emoji: "💡" },
  INFJ: { name: "Advocate", emoji: "🌟" },
  INFP: { name: "Mediator", emoji: "🌿" },
  ENFJ: { name: "Protagonist", emoji: "🌅" },
  ENFP: { name: "Campaigner", emoji: "🦋" },
  ISTJ: { name: "Logistician", emoji: "📋" },
  ISFJ: { name: "Defender", emoji: "🛡️" },
  ESTJ: { name: "Executive", emoji: "🏢" },
  ESFJ: { name: "Consul", emoji: "🤝" },
  ISTP: { name: "Virtuoso", emoji: "🔧" },
  ISFP: { name: "Adventurer", emoji: "🎨" },
  ESTP: { name: "Entrepreneur", emoji: "⚡" },
  ESFP: { name: "Entertainer", emoji: "🎭" },
};

const COLOR_PERSONALITIES = [
  {
    id: "Blue",
    emoji: "💙",
    hex: "#4a90e2",
    desc: "Empathetic & relationship-focused",
    traits: "Compassionate · Sincere · Authentic",
  },
  {
    id: "Gold",
    emoji: "✨",
    hex: "#f5c842",
    desc: "Organized & responsible",
    traits: "Dutiful · Reliable · Structured",
  },
  {
    id: "Green",
    emoji: "🌿",
    hex: "#4caf79",
    desc: "Analytical & independent",
    traits: "Calm · Conceptual · Logical",
  },
  {
    id: "Orange",
    emoji: "🔥",
    hex: "#e8834a",
    desc: "Spontaneous & adventurous",
    traits: "Action-oriented · Bold · Playful",
  },
];

const ZODIAC_ANIMALS = [
  {
    id: "Rat",
    emoji: "🐀",
    element: "Water",
    years: "1924,1936,1948,1960,1972,1984,1996,2008,2020",
  },
  {
    id: "Ox",
    emoji: "🐂",
    element: "Earth",
    years: "1925,1937,1949,1961,1973,1985,1997,2009,2021",
  },
  {
    id: "Tiger",
    emoji: "🐯",
    element: "Wood",
    years: "1926,1938,1950,1962,1974,1986,1998,2010,2022",
  },
  {
    id: "Rabbit",
    emoji: "🐰",
    element: "Wood",
    years: "1927,1939,1951,1963,1975,1987,1999,2011,2023",
  },
  {
    id: "Dragon",
    emoji: "🐲",
    element: "Earth",
    years: "1928,1940,1952,1964,1976,1988,2000,2012,2024",
  },
  {
    id: "Snake",
    emoji: "🐍",
    element: "Fire",
    years: "1929,1941,1953,1965,1977,1989,2001,2013,2025",
  },
  {
    id: "Horse",
    emoji: "🐴",
    element: "Fire",
    years: "1930,1942,1954,1966,1978,1990,2002,2014,2026",
  },
  {
    id: "Goat",
    emoji: "🐐",
    element: "Earth",
    years: "1931,1943,1955,1967,1979,1991,2003,2015,2027",
  },
  {
    id: "Monkey",
    emoji: "🐒",
    element: "Metal",
    years: "1932,1944,1956,1968,1980,1992,2004,2016,2028",
  },
  {
    id: "Rooster",
    emoji: "🐓",
    element: "Metal",
    years: "1933,1945,1957,1969,1981,1993,2005,2017,2029",
  },
  {
    id: "Dog",
    emoji: "🐕",
    element: "Earth",
    years: "1934,1946,1958,1970,1982,1994,2006,2018,2030",
  },
  {
    id: "Pig",
    emoji: "🐷",
    element: "Water",
    years: "1935,1947,1959,1971,1983,1995,2007,2019,2031",
  },
];

const HOROSCOPE_SIGNS = [
  {
    id: "Aries",
    emoji: "♈",
    element: "Fire",
    modality: "Cardinal",
    dates: "Mar 21 – Apr 19",
  },
  {
    id: "Taurus",
    emoji: "♉",
    element: "Earth",
    modality: "Fixed",
    dates: "Apr 20 – May 20",
  },
  {
    id: "Gemini",
    emoji: "♊",
    element: "Air",
    modality: "Mutable",
    dates: "May 21 – Jun 20",
  },
  {
    id: "Cancer",
    emoji: "♋",
    element: "Water",
    modality: "Cardinal",
    dates: "Jun 21 – Jul 22",
  },
  {
    id: "Leo",
    emoji: "♌",
    element: "Fire",
    modality: "Fixed",
    dates: "Jul 23 – Aug 22",
  },
  {
    id: "Virgo",
    emoji: "♍",
    element: "Earth",
    modality: "Mutable",
    dates: "Aug 23 – Sep 22",
  },
  {
    id: "Libra",
    emoji: "♎",
    element: "Air",
    modality: "Cardinal",
    dates: "Sep 23 – Oct 22",
  },
  {
    id: "Scorpio",
    emoji: "♏",
    element: "Water",
    modality: "Fixed",
    dates: "Oct 23 – Nov 21",
  },
  {
    id: "Sagittarius",
    emoji: "♐",
    element: "Fire",
    modality: "Mutable",
    dates: "Nov 22 – Dec 21",
  },
  {
    id: "Capricorn",
    emoji: "♑",
    element: "Earth",
    modality: "Cardinal",
    dates: "Dec 22 – Jan 19",
  },
  {
    id: "Aquarius",
    emoji: "♒",
    element: "Air",
    modality: "Fixed",
    dates: "Jan 20 – Feb 18",
  },
  {
    id: "Pisces",
    emoji: "♓",
    element: "Water",
    modality: "Mutable",
    dates: "Feb 19 – Mar 20",
  },
];

// ─────────────────────────────────────────────
//  COMPATIBILITY ENGINE (research-based)
// ─────────────────────────────────────────────

// Based on cognitive function theory (Jung/Myers-Briggs) and empirical studies
const MBTI_BEST = {
  INTJ: ["ENFP", "ENTP"],
  INTP: ["ENFJ", "ENTJ"],
  ENTJ: ["INTP", "INFP"],
  ENTP: ["INTJ", "INFJ"],
  INFJ: ["ENTP", "ENFP"],
  INFP: ["ENTJ", "ENFJ"],
  ENFJ: ["INTP", "INFP"],
  ENFP: ["INTJ", "INFJ"],
  ISTJ: ["ESFP", "ESTP"],
  ISFJ: ["ESTP", "ESFP"],
  ESTJ: ["ISFP", "ISTP"],
  ESFJ: ["ISTP", "ISFP"],
  ISTP: ["ESFJ", "ESTJ"],
  ISFP: ["ESFJ", "ESTJ"],
  ESTP: ["ISFJ", "ISTJ"],
  ESFP: ["ISTJ", "ISFJ"],
};
const MBTI_GOOD = {
  INTJ: ["INFJ", "ISTJ", "ENTJ", "ENTP"],
  INTP: ["ISTP", "ENTP", "INFP"],
  ENTJ: ["ESTJ", "INTJ", "ENTP"],
  ENTP: ["ENFP", "INTP", "ESTP"],
  INFJ: ["INTJ", "INFP", "ENFJ"],
  INFP: ["INTP", "INFJ", "ENFP"],
  ENFJ: ["INFJ", "ENFP", "ENTJ"],
  ENFP: ["INFP", "ENFJ", "ENTP"],
  ISTJ: ["ISFJ", "ESTJ", "INTJ"],
  ISFJ: ["ISTJ", "ESFJ", "INFJ"],
  ESTJ: ["ISTJ", "ESFJ", "ENTJ"],
  ESFJ: ["ISFJ", "ENFJ", "ESTJ"],
  ISTP: ["ISFP", "ESTP", "INTP"],
  ISFP: ["ISTP", "ESFP", "INFP"],
  ESTP: ["ISTP", "ESFP", "ENTP"],
  ESFP: ["ISFP", "ESTP", "ENFP"],
};

function getMBTIScore(t1, t2) {
  if (!t1 || !t2) return null;
  if (t1 === t2) return 68;
  if (MBTI_BEST[t1]?.includes(t2)) return 91;
  if (MBTI_GOOD[t1]?.includes(t2)) return 76;
  if (t1[1] !== t2[1]) return 44; // N-S mismatch = biggest gap
  return 60;
}

// Based on True Colors personality model research (Lowry, 1978+)
const COLOR_MATRIX = {
  Blue: { Blue: 84, Gold: 72, Green: 57, Orange: 50 },
  Gold: { Blue: 72, Gold: 82, Green: 54, Orange: 44 },
  Green: { Blue: 57, Gold: 54, Green: 80, Orange: 68 },
  Orange: { Blue: 50, Gold: 44, Green: 68, Orange: 84 },
};
function getColorScore(c1, c2) {
  if (!c1 || !c2) return null;
  return COLOR_MATRIX[c1][c2];
}

// Based on traditional Chinese astrology compatibility triangles & clashes
const ZODIAC_TRIANGLES = [
  ["Rat", "Dragon", "Monkey"],
  ["Ox", "Snake", "Rooster"],
  ["Tiger", "Horse", "Dog"],
  ["Rabbit", "Goat", "Pig"],
];
const ZODIAC_CLASHES = [
  ["Rat", "Horse"],
  ["Ox", "Goat"],
  ["Tiger", "Monkey"],
  ["Rabbit", "Rooster"],
  ["Dragon", "Dog"],
  ["Snake", "Pig"],
];
const ZODIAC_SEMI_CLASHES = [
  ["Rat", "Rabbit"],
  ["Ox", "Dragon"],
  ["Tiger", "Snake"],
  ["Horse", "Rooster"],
  ["Goat", "Dog"],
  ["Monkey", "Pig"],
];
function getZodiacScore(z1, z2) {
  if (!z1 || !z2) return null;
  if (z1 === z2) return 70;
  for (const t of ZODIAC_TRIANGLES)
    if (t.includes(z1) && t.includes(z2)) return 93;
  for (const c of ZODIAC_CLASHES)
    if (c.includes(z1) && c.includes(z2)) return 20;
  for (const s of ZODIAC_SEMI_CLASHES)
    if (s.includes(z1) && s.includes(z2)) return 45;
  return 60;
}

// Based on classical Western astrology element & modality theory
const ELEMENT_COMP = {
  Fire: { Fire: 88, Air: 82, Earth: 38, Water: 33 },
  Earth: { Earth: 88, Water: 80, Fire: 38, Air: 46 },
  Air: { Air: 88, Fire: 80, Water: 48, Earth: 46 },
  Water: { Water: 88, Earth: 80, Air: 48, Fire: 33 },
};
function getHoroscopeScore(h1, h2) {
  if (!h1 || !h2) return null;
  if (h1 === h2) return 76;
  const s1 = HOROSCOPE_SIGNS.find((s) => s.id === h1);
  const s2 = HOROSCOPE_SIGNS.find((s) => s.id === h2);
  let score = ELEMENT_COMP[s1.element][s2.element];
  if (s1.modality === s2.modality && s1.element !== s2.element) score -= 8;
  const allIds = HOROSCOPE_SIGNS.map((s) => s.id);
  if (Math.abs(allIds.indexOf(h1) - allIds.indexOf(h2)) === 6)
    score = Math.max(score, 73);
  return Math.max(18, Math.min(95, Math.round(score)));
}

function computeCompatibility(p1, p2) {
  const scores = {
    mbti: getMBTIScore(p1.mbti, p2.mbti),
    color: getColorScore(p1.color, p2.color),
    zodiac: getZodiacScore(p1.zodiac, p2.zodiac),
    horoscope: getHoroscopeScore(p1.horoscope, p2.horoscope),
  };
  const weights = { mbti: 0.35, color: 0.25, zodiac: 0.2, horoscope: 0.2 };
  let total = 0,
    wSum = 0;
  for (const [k, w] of Object.entries(weights)) {
    if (scores[k] !== null) {
      total += scores[k] * w;
      wSum += w;
    }
  }
  return { overall: wSum > 0 ? Math.round(total / wSum) : null, scores };
}

function compatLabel(score) {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";
  if (score >= 85)
    return {
      text: "Cosmic Alignment",
      color: isLight ? "#8b6510" : "#ffd700",
      ring: isLight ? "rgba(139,101,16,0.3)" : "rgba(255,215,0,0.5)",
    };
  if (score >= 72)
    return {
      text: "Harmonious Bond",
      color: isLight ? "#1a7a3a" : "#98fb98",
      ring: isLight ? "rgba(26,122,58,0.3)" : "rgba(152,251,152,0.4)",
    };
  if (score >= 58)
    return {
      text: "Compatible",
      color: isLight ? "#0055cc" : "#7ec8e3",
      ring: isLight ? "rgba(0,85,204,0.25)" : "rgba(126,200,227,0.4)",
    };
  if (score >= 42)
    return {
      text: "Growth Dynamic",
      color: isLight ? "#c0502a" : "#ffa07a",
      ring: isLight ? "rgba(192,80,42,0.25)" : "rgba(255,160,122,0.4)",
    };
  return {
    text: "Complex Dynamic",
    color: isLight ? "#b01c3c" : "#ff6b8a",
    ring: isLight ? "rgba(176,28,60,0.25)" : "rgba(255,107,138,0.4)",
  };
}

function parseCSVRow(row) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '"') {
      inQuotes = !inQuotes;
    } else if (row[i] === "," && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += row[i];
    }
  }
  result.push(cur.trim());
  return result;
}

function tierColor(score, highTh, lowTh) {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";
  if (score >= highTh)
    return isLight ? "#8b6510" : "#ffd700";
  if (score >= lowTh)
    return isLight ? "#0055cc" : "#7ec8e3";
  return isLight ? "#b01c3c" : "#ff6b8a";
}

// ─────────────────────────────────────────────
//  VISUAL HELPERS
// ─────────────────────────────────────────────

const NODE_COLORS = [
  "#d4af37",
  "#c4a4e8",
  "#7ec8e3",
  "#98fb98",
  "#ffa07a",
  "#dda0dd",
  "#87ceeb",
  "#f0e68c",
];

function ScoreBar({ score, color }) {
  return (
    <div
      style={{
        background: "var(--bg-bar)",
        borderRadius: 4,
        height: 5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${score}%`,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${color})`,
          borderRadius: 4,
          transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
//  GRAPH COMPONENT
// ─────────────────────────────────────────────

function Graph({ people, onSelectPair, selectedPair, highThreshold = 72, lowThreshold = 58, size = 480 }) {
  const [hovered, setHovered] = useState(null); // edge hover: { i, j }
  const [hoveredNode, setHoveredNode] = useState(null); // node hover: index
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 50);
    return () => clearInterval(id);
  }, []);

  const W = size, H = size, CX = size / 2, CY = size / 2;
  const baseR = people.length <= 2 ? 140 : people.length <= 5 ? 165 : 185;
  const R = Math.round(baseR * (size / 480));

  const positions = useMemo(
    () =>
      people.map((_, i) => {
        const a = (i / people.length) * Math.PI * 2 - Math.PI / 2;
        return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
      }),
    [people, R],
  );

  const pairs = useMemo(() => {
    const res = [];
    for (let i = 0; i < people.length; i++)
      for (let j = i + 1; j < people.length; j++)
        res.push({ i, j, compat: computeCompatibility(people[i], people[j]) });
    return res;
  }, [people]);

  if (people.length < 2) {
    return (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 64, opacity: 0.18, fontFamily: "serif" }}>
          ✦
        </div>
        <p
          style={{
            color: "var(--text-ultra-faint)",
            textAlign: "center",
            fontFamily: "'Cinzel',serif",
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          Add at least two people
          <br />
          to reveal the cosmic web
        </p>
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", maxWidth: W, overflow: "visible", display: "block" }}
    >
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(212,175,55,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={R + 30} fill="url(#bg)" />
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        style={{ stroke: "var(--graph-ring)" }}
        strokeWidth={1}
        strokeDasharray="3 7"
      />
      <circle
        cx={CX}
        cy={CY}
        r={R + 10}
        fill="none"
        style={{ stroke: "var(--graph-ring-outer)" }}
        strokeWidth={1}
        strokeDasharray="1 12"
      />

      {/* Edges */}
      {pairs.map(({ i, j, compat }) => {
        if (!compat.overall) return null;
        const color = tierColor(compat.overall, highThreshold, lowThreshold);
        const p1 = positions[i],
          p2 = positions[j];
        const isSelected = selectedPair?.i === i && selectedPair?.j === j;
        const isHovered = hovered?.i === i && hovered?.j === j;
        const isNodeActive = hoveredNode === i || hoveredNode === j;
        const active = isSelected || isHovered || isNodeActive;

        const midX = (p1.x + p2.x) / 2,
          midY = (p1.y + p2.y) / 2;
        const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
        const bend = people.length > 2 ? 28 : 0;
        const nx = (-(p2.y - p1.y) / dist) * bend;
        const ny = ((p2.x - p1.x) / dist) * bend;

        return (
          <g key={`${i}-${j}`}>
            {/* Wide invisible hit target */}
            <path
              d={`M${p1.x} ${p1.y} Q${midX + nx} ${midY + ny} ${p2.x} ${p2.y}`}
              fill="none"
              stroke="transparent"
              strokeWidth={18}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered({ i, j })}
              onMouseLeave={() => setHovered(null)}
              onClick={() =>
                onSelectPair({ i, j, compat, p1: people[i], p2: people[j] })
              }
            />
            {/* Visible line */}
            <path
              d={`M${p1.x} ${p1.y} Q${midX + nx} ${midY + ny} ${p2.x} ${p2.y}`}
              fill="none"
              stroke={color}
              strokeWidth={active ? 2.8 : 1.4}
              strokeOpacity={active ? 0.95 : 0.3}
              filter={active ? "url(#glow)" : undefined}
              style={{
                pointerEvents: "none",
                transition: "stroke-opacity 0.2s, stroke-width 0.2s",
              }}
            />
            {/* Score bubble on hover/select */}
            {active && (
              <g style={{ pointerEvents: "none" }}>
                <circle
                  cx={midX + nx}
                  cy={midY + ny}
                  r={15}
                  fill="var(--bg-overlay)"
                  stroke={color}
                  strokeWidth={1.5}
                  filter="url(#glow)"
                />
                <text
                  x={midX + nx}
                  y={midY + ny + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={color}
                  fontSize={13}
                  fontWeight={700}
                  fontFamily="'Cinzel',serif"
                >
                  {compat.overall}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Node rings */}
      {people.map((_person, i) => {
        const { x, y } = positions[i];
        const nc = NODE_COLORS[i % NODE_COLORS.length];
        return (
          <circle
            key={`ring-${i}`}
            cx={x}
            cy={y}
            r={28 + Math.sin((pulse + i * 14) / 15) * 2}
            fill="none"
            stroke={nc}
            strokeWidth={0.8}
            strokeOpacity={0.25}
          />
        );
      })}

      {/* Nodes */}
      {people.map((person, i) => {
        const { x, y } = positions[i];
        const nc = NODE_COLORS[i % NODE_COLORS.length];
        const isNodeHovered = hoveredNode === i;
        // Wrap long names into two lines at ~10 chars
        const name = person.name;
        const words = name.split(" ");
        let line1 = "",
          line2 = "";
        if (name.length <= 11) {
          line1 = name;
        } else if (words.length >= 2) {
          line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
          line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
        } else {
          line1 = name.slice(0, 10);
          line2 = name.slice(10);
        }

        return (
          <g
            key={`node-${i}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => {
              // clicking a node highlights all its edges; first click selects nothing new in pair panel
              setHoveredNode(i);
            }}
          >
            {/* Outer glow ring when node hovered */}
            {isNodeHovered && (
              <circle
                cx={x}
                cy={y}
                r={32}
                fill="none"
                stroke={nc}
                strokeWidth={1.5}
                strokeOpacity={0.5}
                filter="url(#glow)"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={24}
              fill={isNodeHovered ? `${nc}22` : "var(--bg-node)"}
              stroke={nc}
              strokeWidth={isNodeHovered ? 2.5 : 2}
              filter="url(#glow)"
              style={{ transition: "fill 0.2s, stroke-width 0.2s" }}
            />
            <circle cx={x} cy={y} r={20} fill={`${nc}18`} />
            {/* Full name label — inside or below node */}
            <text
              x={x}
              y={line2 ? y + 42 : y + 38}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isNodeHovered ? nc : "var(--text-secondary)"}
              fontSize={isNodeHovered ? 14 : 13}
              fontWeight={isNodeHovered ? 700 : 500}
              fontFamily="'Cinzel',serif"
              filter={isNodeHovered ? "url(#glow)" : undefined}
              style={{ transition: "fill 0.2s, font-size 0.15s" }}
            >
              {line1}
            </text>
            {line2 && (
              <text
                x={x}
                y={y + 53}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isNodeHovered ? nc : "var(--text-body)"}
                fontSize={isNodeHovered ? 14 : 13}
                fontWeight={isNodeHovered ? 700 : 500}
                fontFamily="'Cinzel',serif"
                filter={isNodeHovered ? "url(#glow)" : undefined}
              >
                {line2}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  FOCUS GRAPH (for > 20 people)
// ─────────────────────────────────────────────

function FocusGraph({ people, focusIdx, onSelectPair, selectedPair, highThreshold = 72, lowThreshold = 58, size = 480 }) {
  const [hovered, setHovered] = useState(null);
  const W = size, H = size, CX = size / 2, CY = size / 2;
  const n = people.length;
  const R = Math.round(Math.min(210, Math.max(150, n * 6)) * (size / 480));

  const focusPerson = people[focusIdx];
  const others = people.map((p, i) => ({ p, origIdx: i })).filter((_, i) => i !== focusIdx);

  const positions = useMemo(() =>
    others.map((_, k) => {
      const a = (k / others.length) * Math.PI * 2 - Math.PI / 2;
      return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
    }),
    [others.length, R]
  );

  const edges = useMemo(() =>
    others.map(({ p, origIdx }, k) => ({
      k, origIdx, compat: computeCompatibility(focusPerson, p),
    })),
    [focusPerson, others]
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, overflow: "visible", display: "block" }}>
      <defs>
        <filter id="fglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx={CX} cy={CY} r={R} fill="none" style={{ stroke: "var(--graph-ring)" }} strokeWidth={1} strokeDasharray="3 8" />

      {/* Edges */}
      {edges.map(({ k, origIdx, compat }) => {
        if (!compat.overall) return null;
        const color = tierColor(compat.overall, highThreshold, lowThreshold);
        const { x, y } = positions[k];
        const isSelected = selectedPair?.i === Math.min(focusIdx, origIdx) && selectedPair?.j === Math.max(focusIdx, origIdx);
        const isHovered = hovered === k;
        const active = isSelected || isHovered;
        return (
          <g key={k}>
            <line x1={CX} y1={CY} x2={x} y2={y} stroke="transparent" strokeWidth={14}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(k)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                const i = Math.min(focusIdx, origIdx);
                const j = Math.max(focusIdx, origIdx);
                onSelectPair({ i, j, compat, p1: people[i], p2: people[j] });
              }}
            />
            <line x1={CX} y1={CY} x2={x} y2={y}
              stroke={color}
              strokeWidth={active ? 2.5 : 1}
              strokeOpacity={active ? 0.95 : 0.35}
              filter={active ? "url(#fglow)" : undefined}
              style={{ pointerEvents: "none", transition: "stroke-opacity 0.2s" }}
            />
            {active && (
              <g style={{ pointerEvents: "none" }}>
                <circle cx={(CX + x) / 2} cy={(CY + y) / 2} r={13}
                  fill="var(--bg-overlay)" stroke={color} strokeWidth={1.5} />
                <text x={(CX + x) / 2} y={(CY + y) / 2 + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={color} fontSize={11} fontWeight={700} fontFamily="'Cinzel',serif">
                  {compat.overall}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Outer nodes */}
      {others.map(({ p }, k) => {
        const { x, y } = positions[k];
        const nc = NODE_COLORS[k % NODE_COLORS.length];
        const isHov = hovered === k;
        const short = p.name.slice(0, 2).toUpperCase();
        return (
          <g key={k} style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered(k)}
            onMouseLeave={() => setHovered(null)}>
            <circle cx={x} cy={y} r={isHov ? 14 : 10}
              fill={isHov ? `${nc}33` : "var(--bg-node)"}
              stroke={nc} strokeWidth={isHov ? 2 : 1.5}
              filter={isHov ? "url(#fglow)" : undefined}
              style={{ transition: "r 0.15s" }} />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
              fill={isHov ? nc : "var(--text-secondary)"}
              fontSize={isHov ? 9 : 8} fontWeight={700} fontFamily="'Cinzel',serif">
              {short}
            </text>
            {isHov && (
              <text x={x} y={y + 26} textAnchor="middle"
                fill={nc} fontSize={11} fontWeight={600} fontFamily="'Cinzel',serif">
                {p.name.length > 12 ? p.name.slice(0, 11) + "…" : p.name}
              </text>
            )}
          </g>
        );
      })}

      {/* Center node */}
      <circle cx={CX} cy={CY} r={36} fill="var(--bg-node)" stroke="var(--accent)" strokeWidth={2} filter="url(#fglow)" />
      <circle cx={CX} cy={CY} r={30} fill="rgba(212,175,55,0.1)" />
      <text x={CX} y={CY - 6} textAnchor="middle" dominantBaseline="middle"
        fill="var(--accent)" fontSize={13} fontWeight={700} fontFamily="'Cinzel',serif">
        {focusPerson.name.split(" ")[0]}
      </text>
      {focusPerson.name.includes(" ") && (
        <text x={CX} y={CY + 9} textAnchor="middle" dominantBaseline="middle"
          fill="var(--accent)" fontSize={13} fontWeight={700} fontFamily="'Cinzel',serif">
          {focusPerson.name.split(" ").slice(1).join(" ")}
        </text>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  PAIR DETAIL PANEL
// ─────────────────────────────────────────────

function PairDetail({ pair, onClose }) {
  if (!pair) return null;
  const { p1, p2, compat } = pair;
  if (!compat.overall) return null;
  const { text, color, ring } = compatLabel(compat.overall);

  const rows = [
    { key: "mbti", icon: "🧠", label: "MBTI", clr: "var(--mbti-color)" },
    { key: "color", icon: "🎨", label: "Color Personality", clr: "#c4a4e8" },
    { key: "zodiac", icon: "🀄", label: "Chinese Zodiac", clr: "var(--zodiac-color)" },
    { key: "horoscope", icon: "⭐", label: "Horoscope", clr: "#7ec8e3" },
  ];

  return (
    <div
      style={{
        background: "var(--bg-overlay)",
        border: `1px solid ${color}55`,
        borderRadius: 16,
        padding: "22px 24px",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px ${ring}`,
        position: "relative",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          background: "none",
          border: "none",
          color: "var(--text-faint)",
          cursor: "pointer",
          fontSize: 27,
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "'Cinzel',serif",
            marginBottom: 6,
          }}
        >
          Compatibility Reading
        </div>
        <div
          style={{
            fontSize: 21,
            color: "var(--text-primary)",
            fontFamily: "'Cinzel',serif",
            marginBottom: 10,
          }}
        >
          {p1.name} & {p2.name}
        </div>
        <div
          style={{
            display: "inline-block",
            width: 74,
            height: 74,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            background: `${color}12`,
            lineHeight: "74px",
            textAlign: "center",
            fontSize: 35,
            fontWeight: 800,
            color,
            fontFamily: "'Cinzel',serif",
            boxShadow: `0 0 24px ${ring}`,
          }}
        >
          {compat.overall}
        </div>
        <div
          style={{
            marginTop: 8,
            color,
            fontSize: 16,
            letterSpacing: 1.5,
            fontFamily: "'Cinzel',serif",
          }}
        >
          {text}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map(({ key, icon, label, clr }) => {
          const score = compat.scores[key];
          if (score === null)
            return (
              <div key={key} style={{ opacity: 0.35 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ fontSize: 14, color: "var(--text-muted)" }}
                  >
                    {icon} {label}
                  </span>
                  <span
                    style={{ fontSize: 14, color: "var(--text-faint)" }}
                  >
                    —
                  </span>
                </div>
                <ScoreBar score={0} color={clr} />
              </div>
            );
          return (
            <div key={key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 15, color: "var(--text-body)" }}>
                  {icon} {label}
                </span>
                <span style={{ fontSize: 15, color: clr, fontWeight: 700 }}>
                  {score}%
                </span>
              </div>
              <ScoreBar score={score} color={clr} />
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: "10px 12px",
          background: "var(--bg-card)",
          borderRadius: 8,
          border: "1px solid var(--border-faint)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            lineHeight: 1.6,
            fontFamily: "'Lora',serif",
            fontStyle: "italic",
          }}
        >
          Scores are weighted: MBTI 35% · Color 25% · Zodiac 20% · Horoscope
          20%, based on cognitive function theory, True Colors model,
          traditional Chinese astrology, and Western elemental compatibility.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PERSON CARD
// ─────────────────────────────────────────────

function PersonCard({ person, color, onRemove }) {
  const ci = COLOR_PERSONALITIES.find((c) => c.id === person.color);
  const zi = ZODIAC_ANIMALS.find((z) => z.id === person.zodiac);
  const hi = HOROSCOPE_SIGNS.find((h) => h.id === person.horoscope);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${color}33`,
        borderRadius: 12,
        padding: "11px 14px",
        marginBottom: 8,
        boxShadow: `0 0 16px ${color}11`,
        transition: "box-shadow 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 800,
            color: "#0a0b1e",
            flexShrink: 0,
            boxShadow: `0 0 8px ${color}88`,
          }}
        >
          {person.name[0].toUpperCase()}
        </div>
        <span
          style={{
            color: "var(--text-primary)",
            fontWeight: 600,
            fontSize: 17,
            fontFamily: "'Cinzel',serif",
          }}
        >
          {person.name}
        </span>
        <button
          onClick={onRemove}
          style={{
            marginLeft: "auto",
            background: "var(--bg-input)",
            border: "1px solid var(--border-input)",
            borderRadius: 6,
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: 17,
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {person.mbti && (
          <span
            style={{
              background: "var(--mbti-bg)",
              border: "1px solid var(--mbti-border)",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: 13,
              color: "var(--mbti-color)",
            }}
          >
            {person.mbti} · {MBTI_INFO[person.mbti]?.name}
          </span>
        )}
        {person.color && (
          <span
            style={{
              background: `${ci?.hex}18`,
              border: `1px solid ${ci?.hex}44`,
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: 13,
              color: ci?.hex,
            }}
          >
            {ci?.emoji} {person.color}
          </span>
        )}
        {person.zodiac && (
          <span
            style={{
              background: "var(--zodiac-bg)",
              border: "1px solid var(--zodiac-border)",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: 13,
              color: "var(--zodiac-color)",
            }}
          >
            {zi?.emoji} {person.zodiac}
          </span>
        )}
        {person.horoscope && (
          <span
            style={{
              background: "var(--horoscope-bg)",
              border: "1px solid var(--horoscope-border)",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: 13,
              color: "var(--horoscope-color)",
            }}
          >
            {hi?.emoji} {person.horoscope}
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  FORM SELECT
// ─────────────────────────────────────────────

function Select({ value, onChange, placeholder, options, groupBy }) {
  const sel = {
    width: "100%",
    background: "var(--bg-input)",
    border: "1px solid var(--border-input)",
    borderRadius: 8,
    color: value ? "var(--text-primary)" : "var(--text-muted)",
    padding: "8px 10px",
    fontSize: 16,
    outline: "none",
    cursor: "pointer",
    fontFamily: "'Lora',serif",
  };
  if (!groupBy)
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={sel}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option
            key={o.id || o}
            value={o.id || o}
            style={{ background: "#0a0b1e" }}
          >
            {o.label || o.id || o}
          </option>
        ))}
      </select>
    );

  const groups = {};
  options.forEach((o) => {
    const g = o[groupBy];
    if (!groups[g]) groups[g] = [];
    groups[g].push(o);
  });

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={sel}
    >
      <option value="">{placeholder}</option>
      {Object.entries(groups).map(([g, items]) => (
        <optgroup key={g} label={g} style={{ background: "#0a0b1e" }}>
          {items.map((o) => (
            <option key={o.id} value={o.id} style={{ background: "#0a0b1e" }}>
              {o.emoji} {o.id}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────
//  LEGEND
// ─────────────────────────────────────────────

function Legend() {
  const items = [
    { score: 90, text: "Cosmic Alignment" },
    { score: 78, text: "Harmonious Bond" },
    { score: 63, text: "Compatible" },
    { score: 50, text: "Growth Dynamic" },
    { score: 32, text: "Complex Dynamic" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
      {items.map(({ score, text }) => {
        const { color } = compatLabel(score);
        return (
          <div
            key={text}
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <div
              style={{
                width: 22,
                height: 2,
                background: color,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                fontFamily: "'Lora',serif",
              }}
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
//  DEMO DATA
// ─────────────────────────────────────────────

const DEMO_PEOPLE = [
  {
    id: 1,
    name: "Alex",
    mbti: "INTJ",
    color: "Green",
    zodiac: "Dragon",
    horoscope: "Scorpio",
  },
  {
    id: 2,
    name: "Jamie",
    mbti: "ENFP",
    color: "Blue",
    zodiac: "Monkey",
    horoscope: "Pisces",
  },
  {
    id: 3,
    name: "Morgan",
    mbti: "ISFJ",
    color: "Gold",
    zodiac: "Rabbit",
    horoscope: "Taurus",
  },
  {
    id: 4,
    name: "Riley",
    mbti: "ESTP",
    color: "Orange",
    zodiac: "Horse",
    horoscope: "Sagittarius",
  },
];

// ─────────────────────────────────────────────
//  STARS BACKGROUND
// ─────────────────────────────────────────────

function Starfield() {
  const [stars] = useState(() =>
    Array.from({ length: 110 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      r: Math.random() * 1.5 + 0.3,
      op: Math.random() * 0.55 + 0.08,
      dur: Math.random() * 3 + 2,
      del: Math.random() * 4,
    })),
  );

  return (
    <div
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: "50%",
            background: "var(--star-color)",
            opacity: s.op,
            animation: `twinkle ${s.dur}s ${s.del}s infinite alternate ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────

export default function App() {
  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mbti: "",
    color: "",
    zodiac: "",
    horoscope: "",
  });
  const [selectedPair, setSelectedPair] = useState(null);
  const [error, setError] = useState("");
  const [highThreshold, setHighThreshold] = useState(72);
  const [lowThreshold, setLowThreshold] = useState(58);
  const [tiersOpen, setTiersOpen] = useState({ connections: true, compatible: true, challenging: false });
  const [focusPerson, setFocusPerson] = useState(null);
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetStatus, setSheetStatus] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [graphExpanded, setGraphExpanded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("mbti-theme") ?? "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mbti-theme", theme);
  }, [theme]);

  const mbtiGroups = useMemo(() => {
    const groups = { Analyst: [], Diplomat: [], Sentinel: [], Explorer: [] };
    MBTI_TYPES.forEach((t) => {
      if (["INTJ", "INTP", "ENTJ", "ENTP"].includes(t)) groups.Analyst.push(t);
      else if (["INFJ", "INFP", "ENFJ", "ENFP"].includes(t))
        groups.Diplomat.push(t);
      else if (["ISTJ", "ISFJ", "ESTJ", "ESFJ"].includes(t))
        groups.Sentinel.push(t);
      else groups.Explorer.push(t);
    });
    return groups;
  }, []);

  const addPerson = () => {
    const name = form.name.trim();
    if (!name) {
      setError("Please enter a name.");
      return;
    }
    if (people.length >= 100) {
      setError("Max 100 people allowed.");
      return;
    }
    setPeople((prev) => [...prev, { ...form, id: Date.now(), name }]);
    setForm({ name: "", mbti: "", color: "", zodiac: "", horoscope: "" });
    setError("");
  };

  const removePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    setSelectedPair(null);
  };

  const loadDemo = () => {
    setPeople(DEMO_PEOPLE);
    setSelectedPair(null);
    setFocusPerson(null);
  };

  const importFromSheets = async () => {
    const url = sheetUrl.trim();
    if (!url) return;
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) {
      setSheetStatus("Invalid Google Sheets URL. Make sure to paste the full sharing link.");
      return;
    }
    const sheetId = match[1];
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    setSheetStatus("Loading…");
    try {
      const res = await fetch(csvUrl);
      if (!res.ok) throw new Error("Could not fetch. Make sure the sheet is publicly shared (Anyone with link).");
      const text = await res.text();
      const rows = text.split(/\r?\n/).slice(1);
      const imported = [];
      for (const row of rows) {
        if (!row.trim()) continue;
        const cols = parseCSVRow(row);
        const name = (cols[0] || "").trim();
        if (!name) continue;
        const mbti = MBTI_TYPES.find(t => t.toLowerCase() === (cols[1] || "").trim().toLowerCase()) || "";
        const color = COLOR_PERSONALITIES.find(c => c.id.toLowerCase() === (cols[2] || "").trim().toLowerCase())?.id || "";
        const zodiac = ZODIAC_ANIMALS.find(z => z.id.toLowerCase() === (cols[3] || "").trim().toLowerCase())?.id || "";
        const horoscope = HOROSCOPE_SIGNS.find(h => h.id.toLowerCase() === (cols[4] || "").trim().toLowerCase())?.id || "";
        imported.push({ id: Date.now() + imported.length, name, mbti, color, zodiac, horoscope });
        if (imported.length >= 100) break;
      }
      if (imported.length === 0) { setSheetStatus("No valid rows found. Check the sheet format."); return; }
      setPeople(imported);
      setSelectedPair(null);
      setFocusPerson(null);
      setSheetUrl("");
      setImportOpen(false);
      setSheetStatus(`Imported ${imported.length} people.`);
    } catch (e) {
      setSheetStatus(e.message);
    }
  };

  const inp = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-input)",
    border: "1px solid var(--border-input)",
    borderRadius: 8,
    color: "var(--text-primary)",
    padding: "8px 12px",
    fontSize: 16,
    outline: "none",
    fontFamily: "'Lora',serif",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
        fontFamily: "'Lora',serif",
        position: "relative",
      }}
    >
      <Starfield />

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "44px 20px 32px",
        }}
      >
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
        <div
          style={{
            fontSize: 14,
            letterSpacing: 5,
            color: "var(--accent-faint)",
            textTransform: "uppercase",
            marginBottom: 10,
            fontFamily: "'Cinzel',serif",
          }}
        >
          Cosmic · Compatibility · Oracle
        </div>
        <h1
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.15,
            background:
              "linear-gradient(135deg, #d4af37 0%, #f5e07a 40%, #c4a4e8 70%, #7ec8e3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Constellation of Souls
        </h1>
        <p
          style={{
            color: "var(--text-body)",
            fontSize: 17,
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          Map the invisible bonds between personalities, stars, and ancient
          signs
        </p>
        <div
          style={{
            marginTop: 12,
            width: 60,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            margin: "12px auto 0",
          }}
        />
      </header>

      {/* Main */}
      <main className="app-main" style={graphExpanded ? { maxWidth: "94vw", flexDirection: "column" } : {}}>
        {/* LEFT: Form + Cards */}
        <div className="app-sidebar" style={graphExpanded ? { order: 2, width: "100%", flexBasis: "auto" } : {}}>
          {/* Add person form */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              backdropFilter: "blur(10px)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--accent)",
                margin: "0 0 16px",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              ✦ Add a Person
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                value={form.name}
                onChange={(e) => inp("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPerson()}
                placeholder="Name"
                style={inputStyle}
              />

              {/* MBTI */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  🧠 MBTI Type
                </label>
                <select
                  value={form.mbti}
                  onChange={(e) => inp("mbti", e.target.value)}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    color: form.mbti ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                >
                  <option value="">Select MBTI…</option>
                  {Object.entries(mbtiGroups).map(([g, types]) => (
                    <optgroup key={g} label={`— ${g}s —`}>
                      {types.map((t) => (
                        <option key={t} value={t}>
                          {t} – {MBTI_INFO[t].name} {MBTI_INFO[t].emoji}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  🎨 Color Personality
                </label>
                <select
                  value={form.color}
                  onChange={(e) => inp("color", e.target.value)}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    color: form.color ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                >
                  <option value="">Select Color…</option>
                  {COLOR_PERSONALITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.id} – {c.desc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chinese Zodiac */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  🀄 Chinese Zodiac
                </label>
                <select
                  value={form.zodiac}
                  onChange={(e) => inp("zodiac", e.target.value)}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    color: form.zodiac ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                >
                  <option value="">Select Animal…</option>
                  {ZODIAC_ANIMALS.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.emoji} {z.id} ({z.element}) —{" "}
                      {z.years.split(",").slice(-3).join(", ")}…
                    </option>
                  ))}
                </select>
              </div>

              {/* Horoscope */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  ⭐ Western Horoscope
                </label>
                <select
                  value={form.horoscope}
                  onChange={(e) => inp("horoscope", e.target.value)}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                    color: form.horoscope
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                  }}
                >
                  <option value="">Select Sign…</option>
                  {HOROSCOPE_SIGNS.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.emoji} {h.id} ({h.dates})
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div
                  style={{
                    fontSize: 15,
                    color: "#ff6b8a",
                    padding: "6px 8px",
                    background: "rgba(255,107,138,0.1)",
                    borderRadius: 6,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                onClick={addPerson}
                style={{
                  background: "linear-gradient(135deg, #d4af37, #c49a1e)",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 0",
                  color: "var(--btn-add-color)",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Cinzel',serif",
                  cursor: "pointer",
                  letterSpacing: 1,
                  boxShadow: "0 4px 16px var(--btn-add-shadow)",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.transform = "translateY(-1px)")
                }
                onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
              >
                ✦ Add to Constellation
              </button>

              <button
                onClick={loadDemo}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-input)",
                  borderRadius: 8,
                  padding: "8px 0",
                  color: "var(--text-muted)",
                  fontSize: 15,
                  fontFamily: "'Cinzel',serif",
                  cursor: "pointer",
                  letterSpacing: 0.5,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = "var(--accent-border)";
                  e.target.style.color = "var(--accent)";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = "var(--border-input)";
                  e.target.style.color = "var(--text-muted)";
                }}
              >
                Load Demo Data
              </button>

              {/* Google Sheets import */}
              <button
                onClick={() => { setImportOpen(o => !o); setSheetStatus(""); }}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border-input)",
                  borderRadius: 8,
                  padding: "8px 0",
                  color: "var(--text-muted)",
                  fontSize: 15,
                  fontFamily: "'Cinzel',serif",
                  cursor: "pointer",
                  letterSpacing: 0.5,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.target.style.borderColor = "var(--accent-border)"; e.target.style.color = "var(--accent)"; }}
                onMouseOut={(e) => { e.target.style.borderColor = "var(--border-input)"; e.target.style.color = "var(--text-muted)"; }}
              >
                {importOpen ? "✕ Cancel Import" : "⬆ Import from Google Sheets"}
              </button>

              {importOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, animation: "fadeIn 0.2s ease" }}>
                  <div style={{ fontSize: 12, color: "var(--text-faint)", lineHeight: 1.6 }}>
                    Share your sheet publicly (Anyone with link), then paste the URL below.<br />
                    Columns: <span style={{ color: "var(--accent)", fontWeight: 600 }}>Name · MBTI · Color · Zodiac · Horoscope</span> (Row 1 = header)
                  </div>
                  <input
                    value={sheetUrl}
                    onChange={(e) => { setSheetUrl(e.target.value); setSheetStatus(""); }}
                    onKeyDown={(e) => e.key === "Enter" && importFromSheets()}
                    placeholder="https://docs.google.com/spreadsheets/d/…"
                    style={{ ...inputStyle, fontSize: 13 }}
                  />
                  {sheetStatus && (
                    <div style={{
                      fontSize: 13,
                      color: sheetStatus.startsWith("Imported") ? "#98fb98" : "#ff6b8a",
                      padding: "5px 8px",
                      background: sheetStatus.startsWith("Imported") ? "rgba(152,251,152,0.08)" : "rgba(255,107,138,0.08)",
                      borderRadius: 6,
                    }}>
                      {sheetStatus}
                    </div>
                  )}
                  <button
                    onClick={importFromSheets}
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #c49a1e)",
                      border: "none", borderRadius: 8, padding: "9px 0",
                      color: "var(--btn-add-color)", fontSize: 15, fontWeight: 700,
                      fontFamily: "'Cinzel',serif", cursor: "pointer", letterSpacing: 0.5,
                    }}
                  >
                    Import Data
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Person cards */}
          {people.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-faint)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 10,
                  fontFamily: "'Cinzel',serif",
                }}
              >
                {people.length} {people.length === 1 ? "soul" : "souls"} in
                constellation
              </div>
              <div style={{ maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
                {people.map((p, i) => (
                  <PersonCard
                    key={p.id}
                    person={p}
                    color={NODE_COLORS[i % NODE_COLORS.length]}
                    onRemove={() => removePerson(p.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Compatibility reference */}
          {people.length >= 2 && (
            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                background: "var(--bg-card2)",
                border: "1px solid var(--border-faint)",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-faint)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontFamily: "'Cinzel',serif",
                }}
              >
                Legend
              </div>
              <Legend />
              <div
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "var(--text-faint)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                Click any connection line in the graph to see a detailed
                breakdown.
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Graph + Detail + Pairings */}
        <div className="app-graph-area" style={graphExpanded ? { order: 1, width: "100%" } : {}}>
          {/* Graph card */}
          <div
            style={{
              background: "var(--bg-card2)",
              border: "1px solid var(--border-card2)",
              borderRadius: 20,
              padding: 24,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, width: "100%", justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ fontSize: 13, color: "var(--text-faint)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Cinzel',serif" }}>
                {people.length > 20 ? "Focus Mode" : "Compatibility Web"}
              </div>
              <button
                onClick={() => setGraphExpanded(e => !e)}
                title={graphExpanded ? "Collapse" : "Expand"}
                style={{
                  background: "none", border: "1px solid var(--border-faint)", borderRadius: 6,
                  color: "var(--accent)", cursor: "pointer", fontSize: 14, padding: "2px 7px",
                  fontFamily: "serif", lineHeight: 1, marginLeft: "auto",
                }}
              >
                {graphExpanded ? "⊠" : "⛶"}
              </button>
              {people.length > 20 && (
                <select
                  value={focusPerson ?? ""}
                  onChange={(e) => setFocusPerson(e.target.value === "" ? null : Number(e.target.value))}
                  style={{
                    background: "var(--bg-input)", border: "1px solid var(--border-input)",
                    borderRadius: 8, color: "var(--text-primary)", padding: "4px 10px",
                    fontSize: 14, outline: "none", cursor: "pointer", fontFamily: "'Lora',serif",
                  }}
                >
                  <option value="">Select a person…</option>
                  {people.map((p, i) => (
                    <option key={p.id} value={i}>{p.name}</option>
                  ))}
                </select>
              )}
            </div>

            {(() => {
              const graphSize = graphExpanded
                ? Math.min(Math.round(window.innerWidth * 0.72), 860)
                : 480;
              return people.length > 20 && focusPerson !== null ? (
                <FocusGraph
                  people={people}
                  focusIdx={focusPerson}
                  onSelectPair={setSelectedPair}
                  selectedPair={selectedPair}
                  highThreshold={highThreshold}
                  lowThreshold={lowThreshold}
                  size={graphSize}
                />
              ) : (
                <Graph
                  people={people}
                  onSelectPair={setSelectedPair}
                  selectedPair={selectedPair}
                  highThreshold={highThreshold}
                  lowThreshold={lowThreshold}
                  size={graphSize}
                />
              );
            })()}

            {people.length >= 2 && (
              <div style={{ marginTop: 8, fontSize: 14, color: "var(--text-ultra-faint)", fontStyle: "italic" }}>
                {people.length > 20 && focusPerson === null
                  ? "Select a person above to see their connections"
                  : "Hover or click a line to explore a pairing"}
              </div>
            )}

            {/* Graph tier legend */}
            {people.length >= 2 && (
              <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { label: "Perfect", color: tierColor(highThreshold, highThreshold, lowThreshold) },
                  { label: "Average", color: tierColor((highThreshold + lowThreshold) >> 1, highThreshold, lowThreshold) },
                  { label: "Disaster", color: tierColor(lowThreshold - 1, highThreshold, lowThreshold) },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 20, height: 2, background: color, borderRadius: 2 }} />
                    <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'Lora',serif" }}>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pair detail */}
          {selectedPair && (
            <div style={{ width: "100%", animation: "fadeIn 0.3s ease" }}>
              <PairDetail pair={selectedPair} onClose={() => setSelectedPair(null)} />
            </div>
          )}

          {/* All Pairings — 3 tiers */}
          {people.length >= 2 && (() => {
            const allPairs = [];
            for (let i = 0; i < people.length; i++) {
              for (let j = i + 1; j < people.length; j++) {
                const compat = computeCompatibility(people[i], people[j]);
                if (compat.overall !== null)
                  allPairs.push({ i, j, p1: people[i], p2: people[j], compat });
              }
            }
            allPairs.sort((a, b) => b.compat.overall - a.compat.overall);
            const connections = allPairs.filter(p => p.compat.overall >= highThreshold);
            const compatible  = allPairs.filter(p => p.compat.overall >= lowThreshold && p.compat.overall < highThreshold);
            const challenging = allPairs.filter(p => p.compat.overall < lowThreshold);

            const goldColor = tierColor(highThreshold, highThreshold, lowThreshold);
            const blueColor = tierColor((highThreshold + lowThreshold) >> 1, highThreshold, lowThreshold);
            const redColor  = tierColor(lowThreshold - 1, highThreshold, lowThreshold);

            const PairRow = ({ i, j, p1, p2, compat, color }) => (
              <div
                onClick={() => setSelectedPair({ i, j, compat, p1, p2 })}
                style={{
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                  padding: "5px 8px", borderRadius: 8,
                  background: selectedPair?.p1?.id === p1.id && selectedPair?.p2?.id === p2.id ? "var(--bg-hover)" : "transparent",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                onMouseOut={(e) => (e.currentTarget.style.background =
                  selectedPair?.p1?.id === p1.id && selectedPair?.p2?.id === p2.id ? "var(--bg-hover)" : "transparent")}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 5px ${color}` }} />
                <span style={{ fontSize: 14, color: "var(--text-primary)", flex: 1 }}>{p1.name} & {p2.name}</span>
                <span style={{ fontSize: 14, color, fontWeight: 700, fontFamily: "'Cinzel',serif" }}>{compat.overall}%</span>
              </div>
            );

            const TierSection = ({ title, icon, pairs, color, open, onToggle }) => (
              <div style={{ marginBottom: 10 }}>
                <button
                  onClick={onToggle}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, width: "100%",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "6px 4px", borderRadius: 6,
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "'Cinzel',serif", letterSpacing: 0.5, flex: 1, textAlign: "left" }}>
                    {icon} {title}
                  </span>
                  <span style={{ fontSize: 12, color, fontWeight: 700 }}>{pairs.length}</span>
                  <span style={{ fontSize: 11, color: "var(--text-faint)", marginLeft: 4 }}>{open ? "▲" : "▼"}</span>
                </button>
                {open && pairs.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 220, overflowY: "auto", paddingRight: 2 }}>
                    {pairs.map(({ i, j, p1, p2, compat }) => (
                      <PairRow key={`${i}-${j}`} i={i} j={j} p1={p1} p2={p2} compat={compat} color={color} />
                    ))}
                  </div>
                )}
                {open && pairs.length === 0 && (
                  <div style={{ fontSize: 13, color: "var(--text-ultra-faint)", padding: "4px 12px", fontStyle: "italic" }}>None in this tier</div>
                )}
              </div>
            );

            return (
              <div style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border-card2)", borderRadius: 16, padding: "16px 20px" }}>
                {/* Header */}
                <div style={{ fontSize: 13, color: "var(--text-faint)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, fontFamily: "'Cinzel',serif" }}>
                  All Pairings
                </div>

                {/* Threshold sliders */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, padding: "10px 12px", background: "var(--bg-card)", borderRadius: 10, border: "1px solid var(--border-faint)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-faint)", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Cinzel',serif", marginBottom: 4 }}>
                    Tier Thresholds
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: goldColor, minWidth: 130, fontFamily: "'Lora',serif" }}>
                      Perfect above: <strong>{highThreshold}</strong>
                    </span>
                    <input type="range" min={50} max={95} value={highThreshold}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setHighThreshold(v);
                        if (v <= lowThreshold) setLowThreshold(Math.max(20, v - 5));
                      }}
                      style={{ flex: 1, accentColor: goldColor, cursor: "pointer" }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: redColor, minWidth: 130, fontFamily: "'Lora',serif" }}>
                      Disaster below: <strong>{lowThreshold}</strong>
                    </span>
                    <input type="range" min={20} max={70} value={lowThreshold}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setLowThreshold(v);
                        if (v >= highThreshold) setHighThreshold(Math.min(95, v + 5));
                      }}
                      style={{ flex: 1, accentColor: redColor, cursor: "pointer" }}
                    />
                  </div>
                </div>

                {/* Tiers */}
                <TierSection title="Perfect" icon="✦" pairs={connections} color={goldColor}
                  open={tiersOpen.connections} onToggle={() => setTiersOpen(t => ({ ...t, connections: !t.connections }))} />
                <TierSection title="Average" icon="◈" pairs={compatible} color={blueColor}
                  open={tiersOpen.compatible} onToggle={() => setTiersOpen(t => ({ ...t, compatible: !t.compatible }))} />
                <TierSection title="Disaster" icon="◇" pairs={challenging} color={redColor}
                  open={tiersOpen.challenging} onToggle={() => setTiersOpen(t => ({ ...t, challenging: !t.challenging }))} />
              </div>
            );
          })()}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 20px 30px",
          fontSize: 14,
          color: "var(--text-faint)",
          lineHeight: 1.8,
          fontStyle: "italic",
        }}
      >
        MBTI compatibility based on Jungian cognitive function theory · True
        Colors model (Don Lowry, 1978) · Chinese Astrology compatibility
        triangles & earthly branches · Western elemental astrology (Fire · Earth
        · Air · Water)
      </footer>
    </div>
  );
}
