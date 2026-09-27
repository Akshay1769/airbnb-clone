"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ListingImage } from "@/data/listing";

type LightboxProps = {
  images: ListingImage[];
  initialIndex: number;
  onBack: () => void;
  onClose: () => void;
};

export function Lightbox({ images, initialIndex, onBack, onClose }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const activeImage = images[activeIndex];

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
      if (event.key === "ArrowRight") setActiveIndex((index) => Math.min(index + 1, images.length - 1));
      if (event.key === "ArrowLeft") setActiveIndex((index) => Math.max(index - 1, 0));
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".lightbox button:not([disabled])"));
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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [images.length, onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${activeIndex + 1} of ${images.length}: ${activeImage.alt}`}>
      <header className="lightbox-toolbar">
        <button className="lightbox-back" ref={backButtonRef} type="button" onClick={onBack}>
          <ArrowLeft size={18} /><span>Back to photo tour</span>
        </button>
        <p>{activeImage.room}</p>
        <div className="lightbox-toolbar-end">
          <span>{activeIndex + 1} of {images.length}</span>
          <button className="icon-button lightbox-close" type="button" onClick={onClose} aria-label="Close photo viewer"><X size={20} /></button>
        </div>
      </header>
      <div className="lightbox-stage">
        <button
          className="lightbox-arrow"
          type="button"
          aria-label="Previous photo"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))}
        ><ArrowLeft size={19} /></button>
        <figure className="lightbox-figure">
          <Image src={activeImage.src} alt={activeImage.alt} fill priority sizes="80vw" />
        </figure>
        <button
          className="lightbox-arrow"
          type="button"
          aria-label="Next photo"
          disabled={activeIndex === images.length - 1}
          onClick={() => setActiveIndex((index) => Math.min(index + 1, images.length - 1))}
        ><ArrowRight size={19} /></button>
      </div>
      <p className="lightbox-caption" aria-live="polite">Photo {activeIndex + 1} of {images.length}, {activeImage.alt}</p>
    </div>
  );
}
