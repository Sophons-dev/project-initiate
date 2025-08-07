import { FeatureSection } from './_components/feature-section';
import { HeroSection } from './_components/hero-section';
import { HowItWorksSection } from './_components/how-it-works-section';
import { SponsorSection } from './_components/sponsor-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SponsorSection />
      <FeatureSection />
      <HowItWorksSection />
    </div>
  );
}
