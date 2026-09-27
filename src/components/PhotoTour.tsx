"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Grid2X2, Heart, Share, X } from "lucide-react";
import type { ListingImage, ListingPhotoGroup } from "@/data/listing";

type PhotoTourProps = {
  images: ListingImage[];
  groups: ListingPhotoGroup[];
  initialPhotoId: string | null;
  onClose: () => void;
  onOpenPhoto: (photoId: string) => void;
};

export function PhotoTour({ images, groups, initialPhotoId, onClose, onOpenPhoto }: PhotoTourProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !document.querySelector(".lightbox")) onCloseRef.current();
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".photo-tour button:not([disabled]), .photo-tour a[href]"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    if (initialPhotoId) {
      requestAnimationFrame(() => document.getElementById(`tour-photo-${initialPhotoId}`)?.scrollIntoView({ block: "center" }));
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [initialPhotoId]);

  const photosById = new Map(images.map((image) => [image.id, image]));

  return (
    <div className="photo-tour" role="dialog" aria-modal="true" aria-labelledby="photo-tour-title">
      <header className="photo-tour-header">
        <button ref={closeButtonRef} className="icon-button photo-tour-close" type="button" aria-label="Close photo tour" onClick={onClose}><X size={20} /></button>
        <h2 id="photo-tour-title">Photo tour</h2>
        <div className="photo-tour-actions">
          <button className="icon-button" type="button" aria-label="Share this listing"><Share size={18} /></button>
          <button className="icon-button" type="button" aria-label="Save this listing"><Heart size={18} /></button>
        </div>
      </header>
      <div className="photo-tour-content">
        <nav className="room-jump" aria-label="Jump to a room">
          {groups.map((group) => (
            <a key={group.title} href={`#tour-room-${group.title.toLowerCase().replaceAll(" ", "-")}`}>{group.title}</a>
          ))}
        </nav>
        <div className="photo-tour-rooms">
          {groups.map((group) => (
            <section className="photo-room" id={`tour-room-${group.title.toLowerCase().replaceAll(" ", "-")}`} key={group.title}>
              <div className="photo-room-heading">
                <h3>{group.title}</h3>
                {group.description && <p>{group.description}</p>}
              </div>
              <div className="photo-room-grid">
                {group.photoIds.map((photoId) => {
                  const photo = photosById.get(photoId);
                  if (!photo) return null;
                  return (
                    <button
                      className="tour-photo-button"
                      id={`tour-photo-${photo.id}`}
                      type="button"
                      key={photo.id}
                      aria-label={`Open ${photo.alt} full screen`}
                      onClick={() => onOpenPhoto(photo.id)}
                    >
                      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 80vw, 560px" />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
      <span className="photo-tour-count"><Grid2X2 size={14} /> {images.length} photos</span>
    </div>
  );
}
