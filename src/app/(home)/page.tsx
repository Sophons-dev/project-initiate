import {
  AcademicSection,
  AnnouncementSection,
  FeatureSection,
  HeroSection,
  HowItWorksSection,
  ProfessionalSection,
  SponsorSection,
} from '@/features/home/components';

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
