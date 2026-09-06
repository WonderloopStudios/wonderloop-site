import { useRef } from "react";
import Header from "./components/Header";
import RabbitHole from "./components/RabbitHole";
import HeroSection from "./components/HeroSection";
import GamesCarousel from "./components/GamesCarousel";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import { useRabbitHoleAnimations } from "./hooks/useRabbitHoleAnimations";

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useRabbitHoleAnimations(rootRef);

  return (
    <div ref={rootRef}>
      <RabbitHole />
      <Header />
      <main>
        <HeroSection />
        <GamesCarousel />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
