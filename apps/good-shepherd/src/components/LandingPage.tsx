import { AboutUs } from "./AboutUs";
import { BoardMembers } from "./BoardMembers";
import { Contributions } from "./Contributions";
import { Footer } from "./Footer";
import { FounderDirector } from "./FounderDirector";
import { Gallery } from "./Gallery";
import { Navigation } from "./Navigation";
import { OurStrengths } from "./OurStrengths";
import { Video } from "./Video";
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
        <FounderDirector />
        <BoardMembers />
        <Contributions />
        <Gallery />
        <Video />
        <OurStrengths />
      </main>
      <Footer />
    </div>
  );
}
