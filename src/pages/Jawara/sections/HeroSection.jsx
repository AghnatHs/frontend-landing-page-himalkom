import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import MotionReveal from "@/components/common/MotionReveal";

const HeroSection = () => (
  <section className="pb-4 md:pb-8 mb-2">
    <MotionReveal animation="fade-up">
      <SectionHeader title="Jawara Ilkomerz" altText="Garis Jawara" />
      <p className="text-center max-w-2xl mx-auto text-lg text-primary-darker mb-4">
        Kumpulan prestasi dan lomba yang diikuti serta diraih oleh mahasiswa Ilmu Komputer IPB. Temukan inspirasi dan motivasi dari para jawara Ilkomerz!
      </p>
    </MotionReveal>
  </section>
);

export default HeroSection;
