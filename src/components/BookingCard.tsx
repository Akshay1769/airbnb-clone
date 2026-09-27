"use client";

import { useState } from "react";
import { ChevronDown, Flag, Tag } from "lucide-react";
import type { Listing } from "@/data/listing";

export function BookingCard({ listing }: { listing: Listing }) {
  const [claimed, setClaimed] = useState(false);

  return (
    <aside className="booking-sidebar" aria-label="Reserve this place">
      <div className="discount-offer">
        <Tag size={18} fill="#78a96b" stroke="#78a96b" />
        <div><p>{claimed ? "Discount added to your next stay." : "Get 10% off your next stay."}</p><a href="#offer-terms">Terms apply</a></div>
        <button type="button" onClick={() => setClaimed(true)}>{claimed ? "Claimed" : "Claim"}</button>
      </div>
      <section className="booking-card" id="booking">
        <p className="booking-total"><strong>₹{listing.totalPrice.toLocaleString("en-IN")}</strong> <span>for 5 nights</span></p>
        <div className="booking-fields">
          <a className="booking-field" href="#date-picker"><strong>CHECK-IN</strong><span>10/18/2026</span></a>
          <a className="booking-field" href="#date-picker"><strong>CHECKOUT</strong><span>10/23/2026</span></a>
          <button className="booking-field guest-field" type="button"><span><strong>GUESTS</strong><span>2 guests</span></span><ChevronDown size={17} /></button>
        </div>
        <p className="cancellation-note">Free cancellation before <strong>17 October</strong></p>
        <button className="reserve-button" type="button" onClick={() => document.getElementById("date-picker")?.scrollIntoView({ behavior: "smooth" })}>Reserve</button>
        <p className="booking-note">You won’t be charged yet</p>
      </section>
      <button className="report-listing" type="button"><Flag size={14} /> <span>Report this listing</span></button>
      <p className="booking-disclaimer">{listing.title} — ₹{listing.totalPrice.toLocaleString("en-IN")} for 5 nights</p>
    </aside>
  );
}
