# Component Ownership

- `Header.tsx` and `StickyNav.tsx` own page-level navigation.
- `HeroGallery.tsx`, `PhotoTour.tsx`, and `Lightbox.tsx` own gallery state and keyboard-accessible photo viewing.
- `ListingDetails.tsx` owns the listing content sections and their local interactions.
- `BookingCard.tsx` owns the fixed reference booking state and reservation affordance.
- `src/data/listing.ts` is the single source for listing identity, room groups, photo ordering, amenities, and review content.
