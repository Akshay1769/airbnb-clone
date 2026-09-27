"use client";

import Image from "next/image";
import { useState } from "react";
import { Grid2X2 } from "lucide-react";
import type { ListingImage, ListingPhotoGroup } from "@/data/listing";
import { Lightbox } from "@/components/Lightbox";
import { PhotoTour } from "@/components/PhotoTour";

type HeroGalleryProps = {
  images: ListingImage[];
  heroPhotoIds: string[];
  photoGroups: ListingPhotoGroup[];
};

export function HeroGallery({ images, heroPhotoIds, photoGroups }: HeroGalleryProps) {
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStartId, setTourStartId] = useState<string | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const heroImages = heroPhotoIds
    .map((id) => images.find((image) => image.id === id))
    .filter((image): image is ListingImage => image !== undefined);

  function openTour(photoId: string | null = null) {
    setTourStartId(photoId);
    setTourOpen(true);
  }

  return (
    <>
      <div className="hero-gallery" id="photos" aria-label="Property photos">
        {heroImages.map((image, index) => (
          <button
            className={`hero-photo hero-photo-${index + 1}`}
            key={image.id}
            type="button"
            aria-label={`View photo ${index + 1} of ${images.length}: ${image.alt}`}
            onClick={() => openTour(image.id)}
          >
            <Image src={image.src} alt={image.alt} fill priority={index === 0} sizes={index === 0 ? "50vw" : "25vw"} />
          </button>
        ))}
        <button className="gallery-button" type="button" onClick={() => openTour()}>
          <Grid2X2 size={15} /> Show all photos
        </button>
      </div>
      {tourOpen && (
        <PhotoTour
          images={images}
          groups={photoGroups}
          initialPhotoId={tourStartId}
          onClose={() => setTourOpen(false)}
          onOpenPhoto={(photoId) => setViewerIndex(images.findIndex((image) => image.id === photoId))}
        />
      )}
      {viewerIndex !== null && viewerIndex >= 0 && (
        <Lightbox
          images={images}
          initialIndex={viewerIndex}
          onBack={() => setViewerIndex(null)}
          onClose={() => {
            setViewerIndex(null);
            setTourOpen(false);
          }}
        />
      )}
    </>
  );
}
