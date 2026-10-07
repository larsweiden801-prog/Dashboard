# Dagelijks dashboard

Een installeerbare PWA (React, TypeScript, Vite, Tailwind) met een widget-dashboard. Gegevens worden op het apparaat opgeslagen; er is geen backend of database nodig.

## Vereisten

- Node.js 20 of hoger
- Git (voor online zetten)

## Installatie

```bash
npm install
cp .env.example .env
```

## Environment variables

| Variabele       | Beschrijving                                            |
| --------------- | ------------------------------------------------------- |
| `VITE_APP_NAME` | Naam in header en PWA-manifest (publiek, geen secrets)  |

## Development starten

```bash
npm run dev
```

Open http://localhost:5173. Met `--host` is de app ook bereikbaar vanaf je telefoon op hetzelfde wifi-netwerk (het `Network`-adres in de terminal).

## Productie builden

```bash
npm run build
npm run preview
```

## Online zetten en installeren op Android

1. Maak een lege repository op https://github.com/new en push de code:
   `git init && git add . && git commit -m "Start" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
2. Ga naar https://vercel.com, log in met GitHub, kies *Add New → Project*, selecteer de repository en klik op *Deploy*. Er zijn geen instellingen of variabelen nodig.
3. Open de URL (`https://<project>.vercel.app`) in Chrome op je telefoon.
4. Tik op ⋮ en kies *App installeren*.

## Widgets toevoegen

Maak een bestand in `src/widgets/` met `defineWidget()` en voeg het toe aan `src/widgets/registry.ts`.
