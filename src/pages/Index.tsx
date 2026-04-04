import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import AssociatesSection from "@/components/AssociatesSection";
import OurCommitment from "@/components/OurCommitment";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Page 1: Nav + Hero */}
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <HeroSection />
          {/* Category Section just below Hero */}
          <CategorySection />
        </div>
      </div>

      {/* Page 2: Associates + Footer */}
      <div className="flex flex-col">
        <div className="flex-1 w-full max-w-[1600px] mx-auto overflow-hidden">
          <AssociatesSection />
          <OurCommitment />
        </div>

        {/* Footer pinned at bottom */}
        <Footer />
      </div>

    </div>
  );
};

export default Index;
