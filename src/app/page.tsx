import Hero from '@/components/sections/Hero';
import WelcomeSection from '@/components/sections/WelcomeSection';
import ProgramsPreview from '@/components/sections/ProgramsPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <ProgramsPreview />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}
