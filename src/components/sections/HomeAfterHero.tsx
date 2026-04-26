"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import HomeAfterHeroBlobs from "./HomeAfterHeroBlobs";
import HomeAfterHeroTitle from "./HomeAfterHeroTitle";
import HomeAfterHeroFeatures from "./HomeAfterHeroFeatures";
import HomeAfterHeroAdoption from "./HomeAfterHeroAdoption";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useHomeAfterHeroAnimations from "@/hooks/useHomeAfterHeroAnimations";

const HomeAfterHero = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useHomeAfterHeroAnimations({ rootRef, prefersReducedMotion });

  return (
    <section ref={rootRef} className="relative py-24" style={{ visibility: "hidden" }}>
      <HomeAfterHeroBlobs />

      <Container>
        <HomeAfterHeroTitle />
        <HomeAfterHeroFeatures />
        <HomeAfterHeroAdoption />
      </Container>
    </section>
  );
};

export default HomeAfterHero;
