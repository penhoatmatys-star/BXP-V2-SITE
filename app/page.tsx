import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Audiences } from "@/components/site/audiences";
import { Discover } from "@/components/site/discover";
import { Programs } from "@/components/site/programs";
import { WelcomePack } from "@/components/site/welcome-pack";
import { Journey } from "@/components/site/journey";
import { Dna } from "@/components/site/dna";
import { Destinations } from "@/components/site/destinations";
import { Organizations, FinalCta, Footer } from "@/components/site/closing";
import { SealOpening } from "@/components/site/seal-opening";

// Section order follows the memorandum's homepage sequence (section 03).
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Audiences />
        <Discover />
        <Programs />
        <WelcomePack />
        <Journey />
        <Dna />
        <SealOpening>
          <Destinations />
        </SealOpening>
        <Organizations />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
