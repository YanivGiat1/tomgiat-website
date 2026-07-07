# tomgiat.com

Website for filmmaker Tom Giat and his documentary *One Eye Open*.

Built with Next.js (App Router) + Tailwind CSS, exported as a fully static
site (`next build` → `out/`) for deployment on Netlify. Bilingual
(Hebrew/English) with live screenings pulled from a Google Sheet.

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

## Bilingual content (Hebrew / English)

All UI text lives in two translation files, never hardcoded in
components:

- `locales/he.json` — Hebrew (default language)
- `locales/en.json` — English

Edit these to change any heading, synopsis, press blurb, nav label, or
button text. Both files must keep the same key structure.

Language state is handled by `lib/i18n.js` (`LanguageProvider` /
`useLanguage()`), wraps the whole app in `app/layout.js`. Switching
language toggles `dir`/`lang` on `<html>` (full RTL for Hebrew, LTR for
English) and is remembered in the visitor's browser via `localStorage`,
so it persists across page navigation on the same device. The switcher
itself lives in the header (`components/LanguageSwitcher.js`).

## Live screenings from Google Sheets

Screenings are **not** stored in the repo. `components/ScreeningsTable.js`
fetches a published Google Sheet as CSV in the browser (via PapaParse) on
every page load, so **editing the Google Sheet is the entire workflow for
adding, changing, or removing a screening** — no code changes, no GitHub,
no redeploy.

Setup:

1. In the Google Sheet, make the header row (row 1) exactly:
   `city_he, city_en, venue_he, venue_en, date, time, note_he, note_en, ticketUrl`
   - `date` must be `YYYY-MM-DD` (format the column as plain text, or a
     custom date format, to avoid Sheets exporting locale-specific date
     strings).
   - `time` is `HH:MM` (24h), or leave blank for screenings with no fixed
     time.
   - `ticketUrl` starting with `http` shows a ticket button; anything
     else (blank, "PLACEHOLDER", etc.) shows "coming soon" / "בקרוב".
2. File → Share → **Publish to web** → select the screenings sheet/tab →
   format **Comma-separated values (.csv)** → Publish. Copy that URL (not
   the regular "Anyone with the link" share URL — it must be the
   Publish-to-web CSV link, or the browser fetch will fail).
3. Paste that URL into `SHEET_CSV_URL` at the top of
   `components/ScreeningsTable.js`.

The table sorts by date (soonest first), auto-hides past screenings
behind a collapsible "show past screenings" toggle, shows a loading
state while fetching, and falls back to a friendly bilingual message if
the fetch fails or `SHEET_CSV_URL` hasn't been set yet.

## Adding real images

See `public/images/README.md` for the exact filenames the site expects
(hero photo, poster, stills, portrait). Drop files in with those names and
the placeholder blocks are replaced automatically.

## Trailer

Once the trailer is live on YouTube, set its video ID in
`components/OneEyeOpenContent.js` (`YOUTUBE_ID` constant near the top).
