import { HeroSection } from "@/components/home/hero-section";
import {
  FeaturedCharactersSection,
  LatestChaptersSection,
  LoreSection,
  MerchSection,
  NewsSection,
  NewsletterSection,
  PowerRankSection,
  StoreSection,
} from "@/components/home/home-sections";
import { StorySection } from "@/components/home/story-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <LatestChaptersSection />
      <FeaturedCharactersSection />
      <PowerRankSection />
      <LoreSection />
      <StoreSection />
      <MerchSection />
      <NewsSection />
      <NewsletterSection />
    </>
  );
}
