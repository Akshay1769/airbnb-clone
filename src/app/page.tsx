import { BookingCard } from "@/components/BookingCard";
import { Header } from "@/components/Header";
import { HeroGallery } from "@/components/HeroGallery";
import { ListingDetails, ListingSupplementalSections } from "@/components/ListingDetails";
import { StickyNav } from "@/components/StickyNav";
import { listing } from "@/data/listing";
import {Share, Heart} from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="site-main" id="main">
        <div className="listing-heading">
          <h1>{listing.title}</h1>
          <div className="listing-actions">
            <button type="button"><span aria-hidden="true"><Share /></span> Share</button>
            <button type="button"><span aria-hidden="true"><Heart /></span> Save</button>
          </div>
        </div>
        <HeroGallery images={listing.images} heroPhotoIds={listing.heroPhotoIds} photoGroups={listing.photoGroups} />
        <StickyNav />
        <div className="listing-layout">
          <ListingDetails listing={listing} />
          <BookingCard listing={listing} />
        </div>
        <ListingSupplementalSections listing={listing} />
      </main>
    </>
  );
}
