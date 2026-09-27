"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { listing } from "@/data/listing";

const sections = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

export function StickyNav() {
  const [activeSection, setActiveSection] = useState("photos");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > 600);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-12% 0px -72% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`sticky-nav${isVisible ? " is-visible" : ""}`} aria-label="Listing sections" aria-hidden={!isVisible}>
      <div className="sticky-nav-links">
        {sections.map(({ id, label }) => (
          <a key={id} className={activeSection === id ? "is-active" : ""} href={`#${id}`}>{label}</a>
        ))}
      </div>
      <a className="sticky-booking-summary" href="#booking">
        <span><strong>₹{listing.totalPrice.toLocaleString("en-IN")}</strong> for 5 nights</span>
        <span className="sticky-rating"><Star size={12} fill="currentColor" /> {listing.rating} · {listing.reviews} reviews</span>
      </a>
      <a className="sticky-reserve-button" href="#booking">Reserve</a>
    </nav>
  );
}
