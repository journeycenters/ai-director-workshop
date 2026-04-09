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
