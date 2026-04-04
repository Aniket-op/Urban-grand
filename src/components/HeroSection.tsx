import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/Men-1.jpg";
import heroSlide3 from "@/assets/women-1.avif";
import home1 from "@/assets/kids-1.webp";

const slides = [
  {
    image: heroSlide1,
    headline: <>Premium Line by<br /><span className="italic font-normal">Panchsheel Knitwears</span></>,
    subtext: <>UrbanGrand combines modern style with trusted craftsmanship,<br />delivering elegance, comfort, and lasting quality.</>,
    cta: "Our Vision",
    link: "/about/category/mission-vision",
  },
  {
    image: heroSlide2,
    headline: <>Explore<br /><span className="italic font-normal">Men's Collection</span></>,
    subtext: <>Discover our exclusive range of jackets, coats,<br />sweatshirts, and more for the modern man.</>,
    cta: "Shop Men",
    link: "/contact?category=men",
  },
  {
    image: heroSlide3,
    headline: <>Elegant<br /><span className="italic font-normal">Women's Wear</span></>,
    subtext: <>Chic and comfortable cardigans, hoodies,<br />and jackets designed to elevate your style.</>,
    cta: "Shop Women",
    link: "/contact?category=women",
  },
  {
    image: home1,
    headline: <>Trendy<br /><span className="italic font-normal">Kids Fashion</span></>,
    subtext: <>Playful, cozy, and high-quality clothing perfect<br />for your little ones' everyday adventures.</>,
    cta: "Shop Kids",
    link: "/contact?category=kids",
  },
];

const SLIDE_DURATION = 8000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance by timer
  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const slide = slides[current];

  return (
    <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-background">
      {/* Sliding Images */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          src={slide.image}
          className="absolute inset-0 h-full w-full object-cover object-[40%_top] md:object-top"
          alt="Hero background"
        />
      </AnimatePresence>

      {/* Gradient overlays to darken background for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 via-40% to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 md:from-black/30 md:via-transparent to-transparent pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-8 md:px-12 md:max-w-[55%] md:ml-[4%] md:mr-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-[-0.02em] text-white">
                {slide.headline}
              </h1>
              <p className="mt-5 sm:mt-8 max-w-md font-body text-base sm:text-lg font-light tracking-wide text-white/80 leading-relaxed">
                {slide.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 sm:mt-10 flex gap-4"
          >
            <Link to={slide.link} className="bg-primary text-primary-foreground px-8 py-4 rounded-sm font-semibold tracking-wide hover:opacity-90 transition-elegant text-center">
              {slide.cta}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 glass-light text-white hover:bg-white/20 transition-elegant"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 glass-light text-white hover:bg-white/20 transition-elegant"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all transition-elegant duration-500 ${i === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 group-hover:bg-white/70"
                }`}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-10">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          className="h-full bg-white/60"
        />
      </div>
    </section>
  );
};

export default HeroSection;
