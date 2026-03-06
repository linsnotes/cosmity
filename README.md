# Cosmity — Constellation of Souls

A fun vibe-coded compatibility web app that maps personality bonds between people using MBTI, Color Personality, Chinese Zodiac, and Western Horoscope.

> Totally just for fun. No science was harmed in the making of this app.

## What it does

Add up to 100 people with their personality traits and watch a cosmic web of compatibility scores render between them. Click any connection line to see a detailed breakdown of why two people vibe (or don't).

**Compatibility factors:**
- MBTI personality type
- Color personality
- Chinese Zodiac animal
- Western Horoscope sign

**Features:**
- Animated starfield background with dark/light theme toggle (defaults to dark)
- Interactive compatibility web graph with color-coded tiers
- Expand mode — blow up the graph to ~80% of your screen for a better view
- Focus Mode for groups > 20 people (radial graph centered on one person)
- Three tiers: **Perfect** / **Average** / **Disaster** with adjustable thresholds
- All Pairings panel with collapsible tier sections
- Import people from a public Google Sheet (paste the share URL)
- Load demo data to try it out instantly

## Demo data (Google Sheet)

Paste this URL into the "Import from Google Sheets" panel:

```
https://docs.google.com/spreadsheets/d/1W42ds3_tk2o41_dbBHJq5tTMMjnTvlrRZIXF5gEQxkI/edit?usp=sharing
```

Sheet format (Row 1 = header, columns can be in any order):

| Name | MBTI | Color | Zodiac | Horoscope |
|------|------|-------|--------|-----------|
| Alice | INFJ | Red | Dragon | Scorpio |
| ... | ... | ... | ... | ... |

## Running locally

```bash
npm install
npm run dev
```

Built with React + Vite.
