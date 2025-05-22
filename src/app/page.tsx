import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Deliveries from "@/components/sections/landing/Deliveries";
import Hero from "@/components/sections/landing/Hero";
import JoinUs from "@/components/sections/landing/JoinUs";
import Offers from "@/components/sections/landing/Offers";
import Stats from "@/components/sections/landing/Stats";
import Testimonials from "@/components/sections/landing/Testimonials";
import Trading from "@/components/sections/landing/Trading";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <Trading />
      <Deliveries />
      <JoinUs />
      <Offers />
      <Testimonials/>
      <Footer/>
    </div>
  );
}
