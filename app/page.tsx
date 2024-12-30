import HeroSection, { CallAction, FeatureSection } from "./components/HeroSection";
import { TempSection } from "./components/TempSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection/>
      <FeatureSection/>
      <CallAction/>
      <TempSection/>
    </div>
  );
}
