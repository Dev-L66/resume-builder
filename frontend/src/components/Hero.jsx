import HeroMiddle from "./HeroMiddle";
import Svg from "./Svg";
import { Button } from "./ui/button";
import { TypingEffect } from "./ui/TypingEffect";
import { Download, LayoutTemplate, Zap } from "lucide-react";
const Hero = () => {
  return (
    <section className="mt-5 grid mx-auto container">   
      <div className="lg:flex-row lg:flex lg:justify-between md:flex-col md:justify-center md:items-center "> 
        <TypingEffect text="Create Professional Resume" /> 
        <Svg/>
      </div>
        <article className="text-zinc-400 mb-5">
        Create a resume that is ATS-friendly, recruiter-approved, and tailored
        to your career goals.
      </article>
      <section className="grid gap-2 mb-5 md:grid-cols-2 md:w-50">
        <Button>Start Building</Button>
        <Button>View Templates</Button>
      </section>
      <section className="mt-5 mb-5">
        <h1 className="mb-5 text-4xl md:text-5xl font-bold text-zinc-300">
          Why Choose Resume Builder?
        </h1>
        <p className="text-zinc-400 mb-5">
          Everything you need to create a professional resume that stands out.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
     <HeroMiddle icon={<Zap color="white"/>} title={"Lightning Fast"} description={"Create your professional resume in minutes."} />
     <HeroMiddle icon={<LayoutTemplate  color="white"/>} title={"Pro Templates"} description={"Choose from our recruter approved, industry-specific templates."} />
      <HeroMiddle icon={<Download color="white"/>} title={"Instant Export"} description={"Download high-quality PDFs instantly with perfect formatting."} />
    </section>
    </section>
  );
};

export default Hero;
