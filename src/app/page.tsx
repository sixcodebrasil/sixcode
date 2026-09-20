import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
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
const Value = dynamic(() =>
  import("@/components/Value").then((m) => m.Value)
);
const About = dynamic(() =>
  import("@/components/About").then((m) => m.About)
);
const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ));
const CTA = dynamic(() => import("@/components/CTA").then((m) => m.CTA));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Cases />
        <Value />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
