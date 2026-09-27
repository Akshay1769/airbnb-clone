# Airbnb Listing Recreation

A desktop-first recreation of the Mirashya UG10 serviced-apartment listing in Candolim, built with Next.js App Router, TypeScript, and CSS.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint` and `npm run build` to validate changes.

## Structure

- `src/data/listing.ts` contains listing details, room groups, gallery ordering, amenities, and reviews.
- `src/components/` contains the page header, sticky section bar, booking rail, listing sections, photo tour, and single-photo viewer.
- `public/images/` contains the listing, host, and nearby-stay image assets used by the page.
- `architecture/marketplace-architecture.svg` is the production marketplace architecture diagram; `architecture/README.md` explains the scaling decisions.
- `.github/agents/`, `.github/skills/`, `.github/prompts/`, and `prompts/development-prompts.md` contain the reusable AI workflow artifacts and prompt log.

The photo tour opens from the all-photos button or any hero image. Open a photo inside the tour to use the full-screen viewer; use the arrow keys to move and Escape to close.
