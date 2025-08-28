import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import MotionReveal from "@/components/common/MotionReveal";

const HeroSection = () => (
  <section className="pb-4 md:pb-8 mb-2">
    <MotionReveal animation="fade-up">
      <SectionHeader title="Jawara Ilkomerz" altText="Garis Jawara" />
      <p className="text-center max-w-2xl mx-auto text-lg text-primary-darker mb-4">
        Pusat Informasi Lomba Ilkomerz
      </p>
    </MotionReveal>
  </section>
);

export default HeroSection;
