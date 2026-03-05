# Zorgwoningvergelijker.nl

## Over het project
Vergelijkingsplatform voor modulaire woningen in Nederland, gericht op **50-plussers en senioren**. Gebruikers vergelijken woningtypen, configureren hun woning in 7 stappen, en ontvangen gratis offertes van aanbieders.

## Tech stack
- **Framework**: Next.js 16 + React 19 (App Router)
- **Styling**: Tailwind CSS 3.4
- **State**: Zustand (persist middleware)
- **Animaties**: Framer Motion
- **Canvas**: react-konva (plattegrond editor)
- **Taal**: TypeScript, altijd strict

## Doelgroep & Design filosofie
De doelgroep is 50+. Elk design-besluit moet getoetst worden aan:
- **Leesbaarheid**: minimaal WCAG AA contrast. Body text nooit lichter dan `text-gray-600`
- **Eenvoud**: geen tech-uitstraling. Geen blur-orbs, mesh gradients, glassmorphism, gradient tekst, dot grids, grain textures
- **Warmte**: zachte warme kleuren, organische golflijnen als decoratie, afgeronde hoeken
- **Grote klikgebieden**: knoppen en interactieve elementen ruim bemeten (min 44px touch target)
- **Duidelijkheid**: elke actie moet op eerste oogopslag duidelijk zijn. Labels, iconen, stap-indicatoren

## Kleuren (afgeleid van logo)
- **Primary**: `#583A85` (diep paars) — vertrouwen, premium
- **Accent**: `#E8524A` (coral) — warmte, actie, CTA's
- **Peach**: `#FAD4AE` (warm peach) — highlights op donkere achtergronden
- **Page bg**: `#FAF9F6` (warm off-white)
- **Section gray**: `#F5F3EF` (warm grijs)
- **Section warm**: `#FBF8F3` (warm crème)
- **Hero/CTA bg**: `#2D1B4E` (diep paars)
- **Tekst**: `#251938` (dark), `#4B5563` (muted), `#78716C` (subtle)

## Fonts
- **Headings + prijzen**: Plus Jakarta Sans (`--font-heading`) — weight 500-800
- **Body**: Inter (`--font-sans`) — weight 400-600
- **Geen mono font** — prijzen gebruiken Plus Jakarta Sans met `tabular-nums`

## Design regels
- **NOOIT** paarse knoppen met zwarte/donkere tekst → altijd `bg-primary text-white`
- **NOOIT** glassmorphism, backdrop-blur, gradient tekst, of glow shadows
- **Secties** alterneren: wit → warm grijs → wit → crème (geen twee dezelfde achter elkaar)
- **Wave decoraties** (`section-wave-top` / `section-wave-bottom`) op warme secties na witte secties, primary purple op 6% opacity
- **Header bij scroll**: solide wit + schaduw, geen blur
- **Schaduwen**: zacht en subtiel (`shadow-card`, `shadow-sm`), geen colored glow
- **Afbeeldingen**: Next.js `<Image>` met `priority` voor above-the-fold, altijd descriptieve alt-tekst

## Belangrijke mapstructuur
```
app/                      → Pages (App Router)
  [woningtype]/           → Dynamische woningtype pagina's
  configurator/           → 7-stappen configurator
  aanbieders/             → Aanbieder overzicht + detail
  kennisbank/             → Artikelen
components/
  ui/                     → Herbruikbare UI componenten (Button, Card, Modal, Badge, etc.)
  sections/               → Homepage secties (HeroSection, CTABanner, StepsSection, etc.)
  configurator/           → Configurator stappen + shell + sidebar
  layout/                 → Header, Footer, MobileMenu
  illustrations/          → 21 SVG illustratie componenten
lib/
  woningtypen.ts          → 14 woningtypen met prijzen, specs, FAQ
  aanbieders.ts           → 9 aanbieders met profiel, reviews
  pricing.ts              → Prijsberekening engine
  types.ts                → TypeScript interfaces (Kamer, Module, etc.)
  utils.ts                → Hulpfuncties
store/
  configuratorStore.ts    → Zustand store (modules[], kamers, alle configurator state)
public/
  images/                 → Afbeeldingen (hero, woningtypen, etc.)
```

## Configurator architectuur
- **7 stappen**: Woningtype → Basis → Plattegrond → Exterieur → Installaties → Interieur → Offerte
- **Multi-module**: `modules[]` is source of truth, `kamers` is flat sync van alle modules
- **5 woningtypen** ondersteunen modules: kangoeroewoning, systeemwoning, flexwoning, containerwoning, modulaire-aanbouw
- **Per module**: eigen `buitenBreedte`, `buitenDiepte`, en `kamers[]`
- **FloorplanCanvas**: Konva-based interactive editor met drag, resize, dimension lines

## Code conventies
- Componenten in PascalCase, bestanden ook (bijv. `HeroSection.tsx`)
- Nederlandse tekst in UI, Engelse code (variabelen, functies)
- `"use client"` alleen waar nodig (interactie, state, hooks)
- Imports: React/Next → external libs → local components → local lib/utils
- Tailwind classes: layout → spacing → colors → typography → effects
