import { AcademicSection } from './_components/academic-section';
import { AnnouncementSection } from './_components/announcement-section';
import { FeatureSection } from './_components/feature-section';
import { HeroSection } from './_components/hero-section';
import { HowItWorksSection } from './_components/how-it-works-section';
import { ProfessionalSection } from './_components/professional-section';
import { SponsorSection } from './_components/sponsor-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <a href="/auth/login">Login</a>
      <SponsorSection />
      <FeatureSection />
      <HowItWorksSection />
      <AcademicSection />
      <ProfessionalSection />
      <AnnouncementSection />
    </div>
  );
}
