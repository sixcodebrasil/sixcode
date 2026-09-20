import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

// Home renderiza no servidor a cada request, sem cache estático/ISR. A
// homepage é a vitrine comercial do site — qualquer atraso de propagação de
// cache (visto ao vivo em 20/09/2026: X-Vercel-Cache HIT com Age de 40min
// depois de um deploy novo) é pior que o custo mínimo de SSR numa página
// dessas, que não tem tráfego alto o bastante pra isso pesar.
export const dynamic = "force-dynamic";

// Below-the-fold sections — code-split so their JS doesn't ship in the
// initial bundle. SSR stays on so the HTML is still rendered server-side.
const Process = nextDynamic(() =>
  import("@/components/Process").then((m) => m.Process)
);
const Cases = nextDynamic(() =>
  import("@/components/Cases").then((m) => m.Cases)
);
const Value = nextDynamic(() =>
  import("@/components/Value").then((m) => m.Value)
);
const About = nextDynamic(() =>
  import("@/components/About").then((m) => m.About)
);
const FAQ = nextDynamic(() => import("@/components/FAQ").then((m) => m.FAQ));
const CTA = nextDynamic(() => import("@/components/CTA").then((m) => m.CTA));

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
