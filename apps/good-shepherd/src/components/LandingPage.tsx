import { AboutUs } from "./AboutUs";
import { CallToAction } from "./CallToAction";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { OurStrengths } from "./OurStrengths";
import { VisionMission } from "./VisionMission";
import { Welcome } from "./Welcome";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Navigation />
      <main className="flex-1">
        <Welcome />
        <AboutUs />
        <VisionMission />
        <OurStrengths />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
