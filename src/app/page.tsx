// src/app/page.tsx
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlatformPreview } from "@/components/platform-preview"
import { FeaturesSection } from "@/components/features-section"
import { TargetAudience } from "@/components/target-audience"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PlatformPreview />
      <FeaturesSection />
      <TargetAudience />
      <Footer />
    </main>
  )
}
