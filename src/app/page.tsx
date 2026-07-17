import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Roles from "@/components/Roles";
import Audience from "@/components/Audience";
import Program from "@/components/Program";
import Revenue from "@/components/Revenue";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <FloatingParticles count={50} />
      <Navbar />
      <main>
        <Hero />
        <Roles />
        <Audience />
        <Program />
        <Revenue />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
