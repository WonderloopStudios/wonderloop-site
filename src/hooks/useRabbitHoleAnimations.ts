import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wholePageScroll = () =>
  document.documentElement.scrollHeight - window.innerHeight;

export function useRabbitHoleAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      ScrollTrigger.config({ ignoreMobileResize: true });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 720px)",
          isDesktop: "(min-width: 721px)",
        },
        (context) => {
          const isMobile = !!context.conditions?.isMobile;

          // Continuous tunnel: rings scale + rotate as you fall through
          // the whole page. Numeric start/end drive off the true document
          // height, not any element box — the page's html/body height:100%
          // rule would otherwise collapse an element-based trigger to zero.
          gsap.to(".rabbit-hole", {
            scale: isMobile ? 2.1 : 3.4,
            rotation: isMobile ? 70 : 140,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: wholePageScroll,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          gsap.to(".fall-vignette", {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: wholePageScroll,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          // Parallax: elements drift at a different rate than scroll.
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const speed = parseFloat(el.dataset.parallax || "0.2") || 0.2;
            const distance = (isMobile ? 60 : 120) * speed;
            gsap.to(el, {
              y: distance,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        }
      );

      // Section reveals: content tumbles into place as it falls into view.
      const revealTargets = gsap.utils.toArray<HTMLElement>(".reveal");
      revealTargets.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          y: -50,
          scale: 0.94,
          rotate: i % 2 === 0 ? -2.5 : 2.5,
        });
      });

      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });

      // Refresh once images have loaded so trigger positions are accurate.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { scope }
  );
}
