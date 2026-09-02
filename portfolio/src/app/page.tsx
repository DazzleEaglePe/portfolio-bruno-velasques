import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSlider from "@/components/sections/SkillsSlider";
import Projects from "@/components/Projects";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-10 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(circle_at_50%_8%,rgba(142,97,255,0.16),transparent_34%),radial-gradient(circle_at_72%_24%,rgba(188,255,98,0.07),transparent_22%)]" />
        <div className="mx-auto max-w-[1240px] space-y-24 px-4 sm:px-6 lg:space-y-32 lg:px-8">
          <HeroSection />
          <AboutSection />
          <SkillsSlider />
          <Projects />
          <ExperienceSection />
          <ContactSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
}
