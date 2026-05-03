import { CinematicHero } from "@/components/ui/cinematic-hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Testimonial } from "@/components/ui/clean-testimonial";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground selection:bg-primary/30">
      <div className="overflow-x-hidden w-[100%] min-h-screen">
        <CinematicHero
          brandName="Faiq's Studio"
          tagline1="Crafting Digital Interfaces"
          tagline2="Beyond the Expected."
          cardHeading="UI/UX Designer & Developer"
          cardDescription={<><span className="text-white font-semibold">M. Faiq Shaikh </span>
            crafts digital experiences that feel alive — balancing cutting-edge design with smooth,
            functional code. Obsessed with micro-interactions and building interfaces that feel like second nature.</>}
          metricValue={30}
          metricLabel="Projects"
        />
      </div>
      <ProjectsSection />
      <ExperienceSection />
      <Testimonial />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
