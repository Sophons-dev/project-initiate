import { AcademicSection } from '../../features/home/components/academic-section';
import { AnnouncementSection } from '../../features/home/components/announcement-section';
import { FeatureSection } from '../../features/home/components/feature-section';
import { HeroSection } from '../../features/home/components/hero-section';
import { HowItWorksSection } from '../../features/home/components/how-it-works-section';
import { ProfessionalSection } from '../../features/home/components/professional-section';
import { SponsorSection } from '../../features/home/components/sponsor-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SponsorSection />
      <FeatureSection />
      <HowItWorksSection />
      <AcademicSection />
      <ProfessionalSection />
      <AnnouncementSection />
    </div>
  );
}
