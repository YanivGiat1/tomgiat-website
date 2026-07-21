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

### Editing text from a Google Sheet (no code changes)

On top of the two JSON files above, `lib/i18n.js` also fetches a
published Google Sheet ("Translations" tab) as CSV on every page load and
overlays it onto the built-in text — same live-fetch mechanism as the
screenings table below. This lets a non-technical editor change site
copy from a spreadsheet instead of touching code.

- Sheet columns: `key, he, en`. Each `key` is a dot-path into the
  translation structure (e.g. `home.heading`, `about.bio.0`).
- Leave a cell blank to keep the built-in default from `locales/he.json`
  / `locales/en.json` for that row. To deliberately make a field blank
  instead (e.g. hide an optional section heading), type a single `-` in
  that cell — a plain empty cell can't mean "blank" since it already
  means "keep the default."
- `oneEyeOpen.facts.*` rows are ignored even if present in the sheet. It's
  an ordered array of structured content maintained in code — matching
  sheet rows to array items by position breaks the moment the array is
  reordered or resized, so edit facts directly in `locales/he.json` /
  `locales/en.json` instead. Press and Awards used to have this same
  problem, which is why they've been moved to their own dedicated sheet
  tabs instead (see below) — no code changes needed to add a row there.
- The published CSV URL lives in `TRANSLATIONS_CSV_URL` at the top of
  `lib/i18n.js`. Publish via the same File → Share → Publish to web →
  CSV flow as the screenings sheet, just for the Translations tab.
- Editing an existing row's `he`/`en` cell updates the site next time a
  visitor loads the page (Google's publish cache can take a minute or
  two to catch up). Adding a brand-new row with a key nothing in the
  code reads does nothing — this only overrides text for fields the
  site already renders.

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

## Press & Awards from Google Sheets

Like screenings, Press and Awards content is **not** stored in the repo.
`components/PressList.js` and `components/AwardsTimeline.js` each fetch
their own published Google Sheet tab as CSV in the browser, so **editing
the Google Sheet is the entire workflow for adding, changing, or removing
a press mention or award** — no code changes, no GitHub, no redeploy.
Adding a new row at the bottom of either tab is all it takes; there's no
row-position matching to break.

**Press tab** — header row exactly:
`date, outlet_he, outlet_en, critic_he, critic_en, group, summary_he, summary_en, href`
- `date` is optional (`YYYY-MM-DD`); rows with a date sort newest-first,
  rows without one keep the sheet's row order at the end.
- `critic_he` / `critic_en` are optional (leave blank when there's no
  named byline).
- `group` must be exactly `award` or `media` — controls which tag label
  shows on the card.
- Paste the published CSV URL into `PRESS_CSV_URL` at the top of
  `components/PressList.js`.

**Awards tab** — header row exactly:
`year, award_he, award_en, status_he, status_en, presenter_he, presenter_en, amount, description_he, description_en, href, featured`
- `year` drives the timeline order (newest first).
- `status_*`, `presenter_*`, `amount`, `description_*`, `href` are all optional.
- Set `featured` to `yes` on exactly one row (the current headline award)
  to render it as the larger highlighted card at the top of the timeline.
- Paste the published CSV URL into `AWARDS_CSV_URL` at the top of
  `components/AwardsTimeline.js`.

Both use the same File → Share → **Publish to web** → CSV flow as the
screenings sheet, just for their own tab. Both show a loading state while
fetching and a friendly bilingual message if the fetch fails or no rows
exist yet.

## Adding real images

See `public/images/README.md` for the exact filenames the site expects
(hero photo, poster, stills, portrait). Drop files in with those names and
the placeholder blocks are replaced automatically.

## Trailer

`components/TrailerEmbed.js` embeds either a YouTube video or a Google
Drive file (in that priority order), controlled by two constants near the
top of `components/OneEyeOpenContent.js`:

- `YOUTUBE_ID` — once the trailer is live on YouTube, set its video ID
  here and it takes priority over the Drive fallback.
- `DRIVE_FILE_ID` — the file ID from a Drive share link
  (`drive.google.com/file/d/<FILE_ID>/view`). The Drive file must be
  shared as "Anyone with the link" (Viewer) for the embed to load for
  visitors.
