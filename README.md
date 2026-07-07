# tomgiat.com

Website for filmmaker Tom Giat and his documentary *One Eye Open*.

Built with Next.js (App Router) + Tailwind CSS, exported as a fully static
site (`next build` → `out/`) for deployment on Netlify.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `out/`. Netlify is already configured via `netlify.toml`
(`npm run build`, publish directory `out`).

## Editing screenings

Screening dates/venues live in `data/screenings.json` — edit that file and
redeploy, no component code changes needed. Entries are sorted by date
automatically, and past screenings are hidden (collapsible) once their
date/time has passed.

Set a real `ticketUrl` (starting with `http`) to turn on the ticket button
for a screening; leave it as `"PLACEHOLDER"` to show "בקרוב" (coming soon)
instead.

## Adding real images

See `public/images/README.md` for the exact filenames the site expects
(hero photo, poster, stills, portrait). Drop files in with those names and
the placeholder blocks are replaced automatically.

## Trailer

Once the trailer is live on YouTube, set its video ID in
`app/one-eye-open/page.js` (`YOUTUBE_ID` constant near the top).
