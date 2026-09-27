---
name: listing-visual-validation
description: 'Use when reproducing a vacation-rental listing from screenshots or a live reference, especially for pixel-level layout, room photo tours, single-photo viewers, keyboard navigation, and focus management.'
argument-hint: 'Reference URL and target desktop viewport'
---

# Listing Visual Validation

Use this repeatable workflow to compare a local listing page with its reference without copying implementation source.

## Procedure
1. Capture the reference and local page at the same desktop viewport and scroll position.
2. Compare the centered content width, header baseline, title/gallery spacing, photo crop order, sticky strip, booking rail, and section dividers.
3. Verify local images load and that gallery room groups preserve the reference ordering and accessible names.
4. Open the tour from both the all-photos command and a hero image; follow a room jump link; open a photo viewer from the tour.
5. Test ArrowLeft/ArrowRight at the first, middle, and last photo; verify disabled bounds, Escape behavior, focus trapping/restoration, and body-scroll locking.
6. Check browser console, image errors, lint, and production build after any change.
7. Report measured mismatches and limitations; avoid ungrounded polish changes.

## Completion Criteria
- Desktop page sections and sticky behavior match the supplied captures.
- All hero and tour photos render with useful alt text.
- Both gallery overlays work with pointer and keyboard input.
- Lint and production build pass.
