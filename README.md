# Show-Me Ballot — local full-stack app

This is the whole thing running together: type an address, a real backend
geocodes it and matches it against the real Jackson County district
boundaries, and the app shows the candidates for that address's two
legislature districts. No map tool, no manual district picking.

This only works run locally like this (or on a real host later) — it
cannot run as a Claude.ai artifact, because those sandboxed pages can't
make outbound network calls to the Census geocoding API at all. A normal
Node process on your own machine has no such restriction.

## What's in here

```
jackson-district-app/
  server.js            — Express server: serves the frontend + the API
  geocode.js            — address -> lat/lon (Census Bureau, free, no API key)
  district-lookup.js    — lat/lon -> district (point-in-polygon over the real boundary files)
  districts.js          — combines the two, plus the name -> district-label translation
  boundaries/
    individual-districts.geojson
    at-large-districts.geojson
  public/
    index.html           — loads React from a CDN, no build step
    app.jsx               — the app itself (screens, candidate data, styling)
  package.json
```

## 1. Prerequisites

- **Node.js 18 or newer.** Check with:
  ```
  node --version
  ```
  If that's missing or older, install from https://nodejs.org (the LTS version).

## 2. Install dependencies

From inside this folder:

```
npm install
```

This pulls in `express`, `@turf/turf` (point-in-polygon math), and
`node-fetch` (for calling the Census geocoder).

## 3. Run it

```
npm start
```

You should see:

```
Show-Me Ballot running at http://localhost:3000
```

Open that URL in a browser. Type an address like `8640 Holmes Rd, Kansas
City, MO 64131`, hit **Find my districts**, and it should resolve straight
to the two districts and show the candidates — the whole thing happens
server-side, the browser never talks to Census directly.

## 4. If something goes wrong

- **"No geocoding match found for..."** — the Census geocoder is picky
  about formatting. Try including the ZIP code, or spelling out
  directionals ("North" not "N").
- **"Couldn't reach the server. Is it running?"** — the `npm start`
  process needs to stay running in its terminal window while you use the
  app in the browser. If you closed that terminal, the server stopped.
- **A district shows as blank / "outside the district boundaries we have
  on file"** — the address geocoded fine but landed outside both boundary
  polygons, which usually means it's outside Jackson County.
- **Port 3000 already in use** — run `PORT=4000 npm start` instead, then
  open `http://localhost:4000`.

## 5. Known limitations worth knowing about

- **District labels will go stale after the Nov 3, 2026 election.** The
  boundary files only contain the *current* (pre-election) legislator's
  name, not a district number — `districts.js` translates that into "1st
  District" etc. using a lookup table built from the current roster. Once
  new legislators are seated, that table needs updating with their names
  (the district boundaries themselves don't change, just who's listed).
- **Candidate data only covers 3 races right now**: County Executive,
  1st District, and 3rd At-Large — those are the only ones with candidate
  data loaded in `public/app.jsx` (`COUNTIES` near the top of the file).
  The other 4 individual districts and 2 at-large districts will show
  "no candidate data loaded yet" until that's filled in.
- **This only knows Jackson County.** An address outside it will
  correctly report "outside the district boundaries we have on file."

## 6. If you want this on the actual internet later

Right now this only runs on your own machine. To make it a real website
anyone can visit, it needs to be deployed to a hosting service — Render,
Railway, and Fly.io all have straightforward free tiers for a small
Node/Express app like this one. The short version: push this folder to a
GitHub repo, connect that repo to the host, set the start command to
`npm start`, and it'll build and run this exact same code — the frontend
and backend are already bundled together as one app, so there's nothing
extra to wire up.
