import associate1 from "@/assets/associate1_montecarlo.png";
import associate2 from "@/assets/associate2_killerKing.png";
import associate3 from "@/assets/associate3_duke.jpg";
import associate4 from "@/assets/associate4_cobb.jpg";
import associate5 from "@/assets/associate5_klubFox.webp";
import associate6 from "@/assets/associate6_duke.jpg";
import associate7 from "@/assets/associate7.png";
import associate8 from "@/assets/associate8_meemee.png";

const associateImages = [
  associate1,
  associate2,
  associate3,
  associate4,
  associate5,
  associate6,
  associate7,
  associate8,
];

const AssociatesSection = () => {
  return (
    <section className="flex flex-col w-[80%] mx-auto justify-center py-10 lg:py-10 h-full w-full overflow-hidden bg-background">
      <div className="px-8 lg:px-14 mb-10 lg:mb-16">
        <h2 className="text-2xl lg:text-3xl uppercase tracking-[0.35em] text-foreground font-semibold">
          Our Associates
        </h2>
        <p className="mx-auto lg:mx-0 text-base sm:text-lg text-muted-soft mt-5 sm:mt-6 leading-relaxed">
          We partner with brands that value quality, consistency, and growth. We go beyond manufacturing —
        </p>
        <p className="mx-auto lg:mx-0 text-base sm:text-lg text-muted-soft mt-5 sm:mt-6 leading-relaxed">We become an extension of your brand, delivering products that align with your vision, market positioning and customer expectations.</p>

      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
        {/* We use two sets of images to create a seamless infinite loop */}
        <div className="flex w-max animate-scroll gap-4 sm:gap-8 lg:gap-12 px-4 hover:[animation-play-state:paused]">
          {[...associateImages, ...associateImages].map((img, index) => (
            <div
              key={index}
              className="group flex flex-col justify-center items-center w-[120px] sm:w-[180px] md:w-[220px] h-[80px] sm:h-[120px] rounded-xl bg-white subtle-border overflow-hidden shrink-0 shadow-sm"
            >
              <img
                src={img}
                alt={`Associate ${index}`}
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssociatesSection;
