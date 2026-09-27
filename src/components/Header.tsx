import Image from "next/image";
import { Globe2, Menu, Search } from "lucide-react";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#main" aria-label="Airbnb homepage">
            <FontAwesomeIcon icon={faAirbnb} aria-hidden="true" />
            <span>airbnb</span>
          </a>
          <div className="search-pill" role="group" aria-label="Search stays">
            <button type="button">
                <Image className="search-house" src="/images/searchbar-house.png" alt="" width={70} height={70} unoptimized />
                <span>Anywhere</span>
            </button>

            <button type="button">Anytime</button>

            <button type="button">Add guests</button>

            <button className="search-icon" type="button" aria-label="Search">
                <Search size={16} />
            </button>
            </div>
          <div className="header-actions">
            <button className="host-link" type="button">Become a host</button>
            <button className="globe-button" type="button" aria-label="Choose a language"><Globe2 size={18} /></button>
            <button className="menu-button" type="button" aria-label="Main navigation menu"><Menu size={18} /></button>
          </div>
        </div>
      </header>
    </>
  );
}