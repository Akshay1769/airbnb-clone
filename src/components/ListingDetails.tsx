"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AirVent,
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  CookingPot,
  DoorOpen,
  Dumbbell,
  KeyRound,
  Map,
  MessageCircle,
  PawPrint,
  Shield,
  Sparkles,
  Star,
  Tv,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import type { Listing } from "@/data/listing";

const featureCards = [
  { title: "Outdoor entertainment", body: "The pool and alfresco dining are great for summer trips.", Icon: Waves },
  { title: "Designed for staying cool", body: "Beat the heat with the A/C and ceiling fan.", Icon: AirVent },
  { title: "Self check-in", body: "You can check in with the building staff.", Icon: Check },
];

const ratingCategories = [
  ["Cleanliness", "5.0", Sparkles],
  ["Accuracy", "5.0", Check],
  ["Check-in", "5.0", KeyRound],
  ["Communication", "5.0", MessageCircle],
  ["Location", "4.8", Map],
  ["Value", "4.8", TagIcon],
] as const;

function TagIcon() {
  return <span className="tag-icon" aria-hidden="true">◇</span>;
}

function BookingCalendar() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [checkIn, setCheckIn] = useState("2026-10-18");
  const [checkOut, setCheckOut] = useState("2026-10-23");
  const months = [0, 1].map((month) => new Date(2026, 9 + monthOffset + month, 1));

  function chooseDate(date: Date) {
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    if (!checkIn || checkOut) {
      setCheckIn(value);
      setCheckOut("");
    } else if (value > checkIn) {
      setCheckOut(value);
    } else {
      setCheckIn(value);
      setCheckOut("");
    }
  }

  return (
    <section className="calendar-section" id="date-picker" aria-labelledby="calendar-title">
      <h2 id="calendar-title">5 nights in Candolim</h2>
      <p className="calendar-dates">18 Oct 2026 - 23 Oct 2026</p>
      <div className="calendar-controls">
        <button type="button" aria-label="Previous month" disabled={monthOffset === 0} onClick={() => setMonthOffset((month) => month - 1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label="Next month" onClick={() => setMonthOffset((month) => month + 1)}><ArrowRight size={18} /></button>
      </div>
      <div className="calendar-months">
        {months.map((month) => {
          const year = month.getFullYear();
          const monthIndex = month.getMonth();
          const days = new Date(year, monthIndex + 1, 0).getDate();
          const startDay = month.getDay();
          const monthName = month.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
          return (
            <div className="calendar-month" key={monthName}>
              <h3>{monthName}</h3>
              <div className="calendar-weekdays" aria-hidden="true">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
              <div className="calendar-days" role="group" aria-label={monthName}>
                {Array.from({ length: startDay }, (_, index) => <span className="calendar-blank" key={`blank-${index}`} />)}
                {Array.from({ length: days }, (_, index) => {
                  const day = index + 1;
                  const date = new Date(year, monthIndex, day);
                  const value = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const selected = value === checkIn || value === checkOut;
                  const between = Boolean(checkIn && checkOut && value > checkIn && value < checkOut);
                  const unavailable = monthIndex === 10 && day >= 18 && day <= 21;
                  return (
                    <button
                      className={`${selected ? "selected" : ""} ${between ? "in-range" : ""}`}
                      type="button"
                      key={value}
                      aria-label={date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      aria-pressed={selected}
                      disabled={unavailable}
                      onClick={() => chooseDate(date)}
                    >{day}</button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button className="clear-dates" type="button" onClick={() => { setCheckIn(""); setCheckOut(""); }}>Clear dates</button>
    </section>
  );
}

function ReviewsSection({ listing }: { listing: Listing }) {
  const reviewChips = [
    ["Accuracy", "5"], ["Hot tub", "5"], ["Condition", "4"], ["Hospitality", "8"],
    ["Cleanliness", "4"], ["Amenities", "2"], ["Decor", "2"], ["Indoor spaces", "2"], ["Location", "2"],
  ];

  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="review-award">
        <div className="award-score"><span>❧</span><strong>{listing.rating}</strong><span>❧</span></div>
        <h2 id="reviews-title">Guest favourite</h2>
        <p>This home is a guest favourite based on ratings, reviews and reliability</p>
        <a href="#reviews">How reviews work</a>
      </div>
      <div className="rating-categories">
        <div className="overall-rating">
          <strong>Overall rating</strong>
          {[5, 4, 3, 2, 1].map((score, index) => <div className="rating-bar-row" key={score}><span>{score}</span><i><b style={{ width: index === 0 ? "94%" : "4%" }} /></i></div>)}
        </div>
        {ratingCategories.map(([label, score, Icon]) => (
          <div className="rating-category" key={label}>
            <span>{label}</span>
            <strong>{score}</strong>
            {Icon === TagIcon ? <Icon /> : <Icon size={26} strokeWidth={1.7} />}
          </div>
        ))}
      </div>
      <div className="review-chips">{reviewChips.map(([label, count], index) => <span key={label}><i>{["✅", "🛁", "🧹", "🎁", "🧼", "🛋️", "🖼️", "🪑", "🗺️"][index]}</i> {label} <small>{count}</small></span>)}</div>
      <div className="review-grid">
        {listing.reviewsList.map((review, index) => (
          <article className="review-card" key={review.name}>
            <div className="review-person">
              {index === 2 || index === 4 ? <div className={`review-avatar review-avatar-${index}`}>{review.name[0]}</div> : <div className="review-avatar">{review.name[0]}</div>}
              <div><strong>{review.name}</strong><span>{review.tenure}</span></div>
            </div>
            <p className="review-stars" aria-label="5 out of 5 stars">★★★★★ <span>· {review.date}</span></p>
            <p className="review-copy">{review.text}</p>
            {review.text.length > 150 && <button className="text-button" type="button">Show more <ChevronRight size={15} /></button>}
          </article>
        ))}
      </div>
      <button className="outline-button" type="button">Show all {listing.reviews} reviews</button>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="location-section" id="location" aria-labelledby="location-title">
      <h2 id="location-title">Where you’ll be</h2>
      <iframe
        className="location-map"
        title="Map of Candolim, Goa, India"
        src="https://www.openstreetmap.org/export/embed.html?bbox=73.75%2C15.50%2C73.79%2C15.54&layer=mapnik&marker=15.516%2C73.762"
        loading="lazy"
      />
      <p className="location-name">Candolim, Goa, India</p>
      <p className="muted-copy">Exact location will be provided after booking.</p>
      <h3>Neighbourhood highlights</h3>
      <p className="neighbourhood-copy">Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p>
      <button className="text-button" type="button">Show more <ChevronRight size={15} /></button>
    </section>
  );
}

function HostSection() {
  const cohosts = ["Sharath", "Aman Dev Pahwa", "Maria Karen Priyanka", "Simran", "Pallavi", "Sanyukta", "Shruti", "Amisha"];
  return (
    <section className="host-section" id="host" aria-labelledby="host-title">
      <h2 id="host-title">Meet your host</h2>
      <div className="host-layout">
        <div>
          <div className="host-profile-card">
            <div className="host-profile-main">
              <Image src="/images/host.jpeg" alt="Mirashya Homes host profile" width={88} height={88} />
              <h3>Mirashya Homes</h3>
              <span>Host</span>
            </div>
            <div className="host-stat-list">
              <strong>1,463<span>Reviews</span></strong>
              <strong>4.68 ★<span>Rating</span></strong>
              <strong>2<span>Years hosting</span></strong>
            </div>
          </div>
          <p className="host-fact"><Sparkles size={21} /> Born in the 80s</p>
          <p className="host-fact"><DoorOpen size={21} /> Where I went to school: NICMAR GOA</p>
        </div>
        <div className="host-details">
          <h3>Co-Hosts</h3>
          <ul className="cohost-list">{cohosts.map((name, index) => <li key={name}><span className={`cohost-avatar cohost-avatar-${index}`}>{name[0]}</span>{name}</li>)}</ul>
          <h3>Host details</h3>
          <p>Response rate: 100%</p>
          <p>Responds within an hour</p>
          <button className="message-host" type="button">Message host</button>
          <p className="payment-safety"><Shield size={22} /> To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
        </div>
      </div>
    </section>
  );
}

function ThingsToKnow() {
  return (
    <section className="things-section" id="things-to-know" aria-labelledby="things-title">
      <h2 id="things-title">Things to know</h2>
      <div className="things-grid">
        <article><CalendarDays size={23} /><h3>Cancellation policy</h3><p>Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.</p><p>Review this host’s full policy for details.</p><a href="#booking">Learn more</a></article>
        <article><KeyRound size={23} /><h3>House rules</h3><p>Check-in after 2:00 pm</p><p>Checkout before 11:00 am</p><p>3 guests maximum</p><a href="#overview">Learn more</a></article>
        <article><Shield size={23} /><h3>Safety &amp; property</h3><p>Carbon monoxide alarm not reported</p><p>Smoke alarm not reported</p><p>Exterior security cameras on property</p><a href="#amenities">Learn more</a></article>
      </div>
    </section>
  );
}

function NearbyStays() {
  const stays = [
    {
      title: "Beautiful Studio with a view to die for",
      price: "₹23,600",
      rating: "4.91",
      photo: "/images/nearby-s1.jpeg",
    },
    {
      title: "NAQAB - 1bhk with private pool",
      price: "₹42,218",
      rating: "4.95",
      photo: "/images/nearby-s2.jpeg",
    },
    {
      title: "Greentique Luxury Flat with plunge pool, Calangute",
      price: "₹44,506",
      rating: "4.94",
      photo: "/images/nearby-s3.jpeg",
    },
    {
      title: "The Tropical Studio | 5 mins to Beach",
      price: "₹22,824",
      rating: "4.96",
      photo: "/images/nearby-s4.jpeg",
    },

    {
      title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
      price: "₹39,942",
      rating: "4.95",
      photo: "/images/nearby-s5.jpeg",
    },
    {
      title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
      price: "₹45,648",
      rating: "5.0",
      photo: "/images/nearby-s6.jpeg",
    },
    {
      title: "Luxury Apt | Private Pool | 6 Mins from Beach",
      price: "₹48,786",
      rating: "4.93",
      photo: "/images/nearby-s3.jpeg",
    },
    {
      title: "Serendipity Cottage - Calm Stay in Calangute-Baga.",
      price: "₹22,824",
      rating: "4.92",
      photo: "/images/nearby-s4.jpeg",
    },
  ];

  const scrollWindowRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const cardsPerPage = 4;
  const totalPages = Math.ceil(stays.length / cardsPerPage);

  function scrollNearby(direction: -1 | 1) {
    const scrollWindow = scrollWindowRef.current;
    if (!scrollWindow) return;

    scrollWindow.scrollBy({
      left: direction * (scrollWindow.clientWidth + 24),
      behavior: "smooth",
    });
  }

  function updatePage() {
    const scrollWindow = scrollWindowRef.current;
    if (!scrollWindow) return;

    const maxScroll = scrollWindow.scrollWidth - scrollWindow.clientWidth;
    const nextPage = maxScroll > 0
      ? Math.round((scrollWindow.scrollLeft / maxScroll) * (totalPages - 1))
      : 0;
    setPage(nextPage);
  }

  return (
    <section className="nearby-section" aria-labelledby="nearby-title">

      <div className="nearby-heading">
        <h2 id="nearby-title">More stays nearby</h2>

        <div className="nearby-controls">
          <span>
            {page + 1} / {totalPages}
          </span>

          <button
            type="button"
            aria-label="Previous stays"
            disabled={page === 0}
            onClick={() => scrollNearby(-1)}
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            aria-label="Next stays"
            disabled={page === totalPages - 1}
            onClick={() => scrollNearby(1)}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="nearby-window" ref={scrollWindowRef} onScroll={updatePage}>
        <div className="nearby-track">
          {stays.map((stay) => (
            <article className="nearby-card" key={stay.title}>
              <div className="nearby-image">
                <Image
                  src={stay.photo}
                  alt={stay.title}
                  fill
                  sizes="25vw"
                />
              </div>

              <div className="nearby-info">
                <strong>{stay.title}</strong>

                <span>
                  <Star size={13} fill="currentColor" />
                  {stay.rating}
                </span>
              </div>

              <p>{stay.price} for 5 nights</p>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}

const amenityGroups = [
  { title: "Bathroom", Icon: Bath, items: ["Hairdryer", "Cleaning products", "Shampoo", "Hot water", "Shower gel"] },
  { title: "Bedroom and laundry", Icon: BedDouble, items: ["Washing machine", "Hangers", "Bed linen", "Extra pillows and blankets", "Iron", "Drying rack for clothing", "Clothing storage"] },
  { title: "Entertainment", Icon: Tv, items: ["TV", "Sound system"] },
  { title: "Heating and cooling", Icon: AirVent, items: ["Air conditioning", "Ceiling fan"] },
  { title: "Home safety", Icon: Shield, items: ["Exterior security cameras on property", "Smoke alarm", "Carbon monoxide alarm"] },
  { title: "Internet and office", Icon: Wifi, items: ["Wifi", "Dedicated workspace"] },
  { title: "Kitchen and dining", Icon: CookingPot, items: ["Kitchen", "Refrigerator", "Microwave", "Cooking basics", "Kettle", "Dining table", "Wine glasses", "Toaster", "Coffee maker"] },
  { title: "Outdoor", Icon: Waves, items: ["Patio or balcony", "Outdoor dining area", "Outdoor furniture", "BBQ grill"] },
  { title: "Parking and facilities", Icon: Map, items: ["Free parking on premises", "Pool", "Hot tub", "Gym", "Elevator", "Free street parking"] },
  { title: "Services", Icon: Sparkles, items: ["Long-term stays allowed", "Luggage drop-off allowed", "Self check-in", "Building staff", "Cleaning available during stay"] },
  { title: "Family", Icon: BedDouble, items: ["Travel cot", "Board games"] },
  { title: "Location", Icon: Map, items: ["Beach access", "Resort view", "Private entrance"] },
];

function AmenitiesDialog({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".amenities-dialog button"));
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
  }, [onClose]);

  return (
    <div
      className="amenities-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="amenities-dialog" role="dialog" aria-modal="true" aria-labelledby="amenities-dialog-title">
        <button ref={closeButtonRef} className="amenities-dialog-close" type="button" aria-label="Close amenities" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="amenities-dialog-content">
          <h2 id="amenities-dialog-title">What this place offers</h2>
          {amenityGroups.map(({ title, Icon, items }) => (
            <section className="amenities-group" key={title} aria-labelledby={`amenity-group-${title.toLowerCase().replaceAll(" ", "-")}`}>
              <h3 id={`amenity-group-${title.toLowerCase().replaceAll(" ", "-")}`}>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}><Icon size={21} strokeWidth={1.7} /><span>{item}</span></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ListingDetails({ listing }: { listing: Listing }) {
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const visibleAmenities = listing.amenities.slice(0, 10);
  const description = "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴";

  return (
    <div className="listing-content">
      <section className="overview-section" id="overview" aria-labelledby="overview-title">
        <h2 id="overview-title">Entire serviced apartment in Candolim, India</h2>
        <p className="overview-meta">3 guests · 1 bedroom · 1 bed · 1 bathroom</p>
        <div className="guest-favourite">
          <div className="guest-favourite-copy"><span>Guest<br />favourite</span><p>One of the most loved homes on Airbnb,<br /> according to guests</p></div>
          <div className="favourite-rating"><strong>4.95</strong><span>Rating</span></div>
          <div className="favourite-reviews"><strong>19</strong><span>Reviews</span></div>
        </div>
        <ul className="feature-list">
          {featureCards.map(({ title, body, Icon }) => <li className="feature" key={title}><Icon size={23} strokeWidth={1.7} /><div><strong>{title}</strong><span>{body}</span></div></li>)}
        </ul>
        <div className="host-strip"><Image src="/images/host.jpeg" alt="" width={44} height={44} /><div><strong>Hosted by Mirashya Homes</strong><span>2 years hosting</span></div></div>
        <div className="description-block">
          <p className="translation-note">Some info has been automatically translated. <button type="button">Show original</button></p>
          <p>{showMoreDescription ? `${description} Enjoy an easy, comfortable stay with everything you need close by.` : description}</p>
          <button className="text-button" type="button" onClick={() => setShowMoreDescription((expanded) => !expanded)}>{showMoreDescription ? "Show less" : "Show more"} <ChevronRight size={15} /></button>
        </div>
      </section>

      <section className="sleeping-section content-divider" aria-labelledby="sleeping-title">
        <h2 id="sleeping-title">Where you’ll sleep</h2>
        <div className="sleeping-options">
          <article>
            <Image src="/images/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg" alt="Bedroom with a double bed" width={640} height={480} loading="eager" unoptimized />
            <div className="sleeping-card-copy"><BedDouble size={22} /><div><strong>Bedroom</strong><span>1 double bed</span></div></div>
          </article>
          <article>
            <Image src="/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg" alt="Living room with sofa and dining area" width={640} height={480} loading="eager" unoptimized />
            <div className="sleeping-card-copy"><DoorOpen size={22} /><div><strong>Living room</strong><span>1 sofa</span></div></div>
          </article>
        </div>
      </section>

      <section className="amenities-section content-divider" id="amenities" aria-labelledby="amenities-title">
        <h2 id="amenities-title">What this place offers</h2>
        <ul className="amenity-list">{visibleAmenities.map((amenity, index) => {
          const Icon = [CookingPot, Wifi, DoorOpen, Map, Waves, Bath, PawPrint, Shield, AirVent, Sparkles, Tv, AirVent, Tv, CookingPot, CookingPot, CookingPot, CookingPot, Waves, CookingPot, Dumbbell][index % 20];
          return <li key={amenity}><Icon size={20} strokeWidth={1.6} /><span>{amenity}</span></li>;
        })}</ul>
        <button className="outline-button" type="button" onClick={() => setAmenitiesOpen(true)}>Show all 50 amenities</button>
      </section>

      <BookingCalendar />
      {amenitiesOpen && <AmenitiesDialog onClose={() => setAmenitiesOpen(false)} />}
    </div>
  );
}

export function ListingSupplementalSections({ listing }: { listing: Listing }) {
  return (
    <div className="listing-full-width">
      <ReviewsSection listing={listing} />
      <LocationSection />
      <HostSection />
      <ThingsToKnow />
      <NearbyStays />
    </div>
  );
}
