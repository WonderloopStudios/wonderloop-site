import { useCallback, useEffect, useRef, useState } from "react";

type Game = {
  title: string;
  href: string;
  thumb: string;
};

const GAMES: Game[] = [
  { title: "Pawlitics", href: "https://phanto86.itch.io/pawlitics", thumb: "/assets/thumbnails/pawlitics.png" },
  { title: "Wonderloop", href: "https://manny6902.itch.io/wonderloop", thumb: "/assets/thumbnails/wonderloop_game.png" },
  { title: "Slick Driver", href: "https://phanto86.itch.io/slick-driver", thumb: "/assets/thumbnails/slick_driver.png" },
  { title: "Charging Bull", href: "https://wonderloopstudios.itch.io/charging-bull-run", thumb: "/assets/thumbnails/charging_bull_icon.png" },
];

const AUTOPLAY_MS = 4500;

function getPerView(width: number) {
  if (width >= 1000) return 3;
  if (width >= 720) return 2;
  return 1;
}

export default function GamesCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [perView, setPerView] = useState(() =>
    typeof window === "undefined" ? 3 : getPerView(window.innerWidth)
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, GAMES.length - perView);

  const goTo = useCallback(
    (i: number) => setIndex(Math.min(Math.max(i, 0), maxIndex)),
    [maxIndex]
  );
  const next = useCallback(
    () => setIndex((cur) => (cur >= maxIndex ? 0 : cur + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setIndex((cur) => (cur <= 0 ? maxIndex : cur - 1)),
    [maxIndex]
  );

  useEffect(() => {
    const handleResize = () => setPerView(getPerView(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [index, maxIndex]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;
    const cardWidth = (track.firstElementChild as HTMLElement).getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }, [index, perView]);

  const dotCount = maxIndex + 1;

  return (
    <section id="games">
      <div className="section-inner">
        <div className="section-head reveal">
          <h2>Our Games</h2>
          <div className="rule"></div>
          <p>A look at what we're building.</p>
        </div>

        <div
          className="carousel reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            className="carousel-btn"
            aria-label="Previous game"
            onClick={() => {
              prev();
              setPaused(false);
            }}
          >
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
          </button>

          <div className="carousel-viewport">
            <ul className="carousel-track" ref={trackRef}>
              {GAMES.map((g) => (
                <li key={g.href} className="game-card">
                  <a className="game-link" href={g.href} target="_blank" rel="noopener noreferrer">
                    <figure>
                      <div className="thumb-wrap">
                        <img src={g.thumb} alt={`${g.title} thumbnail`} loading="lazy" />
                      </div>
                      <figcaption>{g.title}</figcaption>
                    </figure>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="carousel-btn"
            aria-label="Next game"
            onClick={() => {
              next();
              setPaused(false);
            }}
          >
            <svg viewBox="0 0 24 24"><path d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z" /></svg>
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              className={i === index ? "active" : ""}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
