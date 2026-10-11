import { Atmosphere } from "@/components/Atmosphere";
import { FloatingCta } from "@/components/FloatingCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";

/*
 * Section rhythm: dark page sections alternate with framed light panels
 * (Work, Tools, Testimonials). The theme toggle flips the whole pattern.
 */
export default function Home() {
  return (
    <>
      <ProgressBar />
      <Atmosphere />
      <Header />
      <main id="top">
        <Hero />
        <Proof />
        <Services />
        <Work />
        <Process />
        <Tools />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
