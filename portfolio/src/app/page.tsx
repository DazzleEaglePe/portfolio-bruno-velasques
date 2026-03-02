import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSlider from "@/components/sections/SkillsSlider";
import Projects from "@/components/Projects";
import Testimonial from "@/components/Testimonial";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="space-y-14">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSlider />
          <Projects />
          <Testimonial />
          <ContactSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
}
