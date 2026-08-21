import { getContent } from "@/content";
import { SiteNav } from "@/components/site-nav";
import { ScrollProgress } from "@/components/motion";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { CrosshairCursor } from "@/components/ui/crosshair-cursor";
import { Hero } from "@/components/sections/hero";
import { Gap } from "@/components/sections/gap";
import { Approach } from "@/components/sections/approach";
import { Comparison } from "@/components/sections/comparison";
import { Proof } from "@/components/sections/proof";
import { Work } from "@/components/sections/work";
import { Path } from "@/components/sections/path";
import { Stack } from "@/components/sections/stack";
import { Founder } from "@/components/sections/founder";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  const c = getContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dlyai.com/#organization",
        name: c.brand.name,
        url: "https://dlyai.com/",
        logo: "https://dlyai.com/brand/dly-logo-lockup.svg",
        description: c.meta.description,
        email: "contact@dlyai.com",
        areaServed: ["United Kingdom", "United States"],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://dlyai.com/#service",
        name: "DLY AI — Forward-deployed AI engineering",
        url: "https://dlyai.com/",
        description: c.meta.description,
        provider: { "@id": "https://dlyai.com/#organization" },
        serviceType: ["AI product development", "AI system development", "AI engineering and deployment"],
        areaServed: ["United Kingdom", "United States"],
      },
      {
        "@type": "WebSite",
        "@id": "https://dlyai.com/#website",
        name: c.brand.name,
        url: "https://dlyai.com/",
        publisher: { "@id": "https://dlyai.com/#organization" },
        inLanguage: c.meta.locale,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#gap"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:bg-yield focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      {/* Ambient chrome. The grid is fixed at z-0, so every content layer below
          is explicitly lifted above it. */}
      <BlueprintGrid />
      <CrosshairCursor />
      <ScrollProgress />

      <SiteNav nav={c.nav} />

      <main className="relative z-10">
        <Hero hero={c.hero} />
        <Gap gap={c.gap} />
        <Approach approach={c.approach} />
        <Comparison comparison={c.comparison} />
        {/* The engagement path sits before the evidence: once a buyer accepts
            the category, the next question is "so what do I actually do",
            not "show me more proof". */}
        <Path path={c.path} />
        <Proof proof={c.proof} />
        <Work work={c.work} />
        <Stack stack={c.stack} />
        <Founder founder={c.founder} />
        <Contact contact={c.contact} />
      </main>

      <SiteFooter footer={c.footer} />
    </>
  );
}
