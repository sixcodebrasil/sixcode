import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stack } from "@/components/Stack";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

// Below-the-fold sections — code-split so their JS doesn't ship in the
// initial bundle. SSR stays on so the HTML is still rendered server-side.
const Process = dynamic(() =>
  import("@/components/Process").then((m) => m.Process)
);
const Cases = dynamic(() =>
  import("@/components/Cases").then((m) => m.Cases)
);
const About = dynamic(() =>
  import("@/components/About").then((m) => m.About)
);
const CTA = dynamic(() => import("@/components/CTA").then((m) => m.CTA));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stack />
        <Services />
        <Process />
        <Cases />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
