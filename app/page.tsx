import FAQsTwo from "@/components/faqs-2";
import Features from "@/components/features-1";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-7";
import StatsSection from "@/components/stats";
import TeamSection from "@/components/team";


export default function Home() {
  return <div> 
    <HeroSection/>
    <Features/>
    <IntegrationsSection/>
    <StatsSection/>
    <TeamSection/>
    <FAQsTwo/>
    <Footer/>
    </div>
}
