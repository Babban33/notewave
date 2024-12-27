import HeroSection, { CallAction, FeatureSection } from "./components/HeroSection";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection/>
      <CallAction/>
      <FeatureSection/>
    </div>
  );
}
