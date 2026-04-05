import { useParams, Navigate, Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Men images
import menJacket1 from "@/assets/men/jacket_1.png";
import menJacket2 from "@/assets/men/jacket_2.png";
import menCoat from "@/assets/men/coats1.png";
import menHoodie1 from "@/assets/men/hoodies_1.png";
import menHoodie2 from "@/assets/men/hoodies_2.png";
import menSweater from "@/assets/men/sweatshirts_1.png";

// ── Women images
import womenJacket1 from "@/assets/women/jacket_1.png";
import womenJacket2 from "@/assets/women/jacket_2.png";
import womenCoat from "@/assets/women/coat1.png";
import womenSweater from "@/assets/women/sweatshirts_1.png";

// ── Kids images
import kidsJacket1 from "@/assets/kids/jacket_1.png";
import kidsJacket2 from "@/assets/kids/jacket_2.png";
import kidsCoat from "@/assets/kids/coat1.png";
import kidsHoodie1 from "@/assets/kids/hoodies1.png";
import kidsHoodie2 from "@/assets/kids/hoodies2.png";

type Product = {
  image: string;
  subcategory: string;
};

type CategoryData = {
  title: string;
  tagline: string;
  accent: string; // tailwind gradient class
  products: Product[];
};

const categoryData: Record<string, CategoryData> = {
  men: {
    title: "Men's Collection",
    tagline: "Bold & Refined — Premium Knitwear for the Modern Man",
    accent: "from-slate-900 to-blue-950",
    products: [
      { image: menJacket1, subcategory: "Jackets" },
      { image: menJacket2, subcategory: "Jackets" },
      { image: menCoat, subcategory: "Coats" },
      { image: menHoodie1, subcategory: "Hoodies" },
      { image: menHoodie2, subcategory: "Hoodies" },
      { image: menSweater, subcategory: "Sweatshirts" },
    ],
  },
  women: {
    title: "Women's Collection",
    tagline: "Feminine Elegance — Timeless Silhouettes in Premium Knitwear",
    accent: "from-stone-900 to-rose-950",
    products: [
      { image: womenJacket1, subcategory: "Jackets" },
      { image: womenJacket2, subcategory: "Jackets" },
      { image: womenCoat, subcategory: "Coats" },
      { image: womenSweater, subcategory: "Sweatshirts" },
    ],
  },
  kids: {
    title: "Kids' Collection",
    tagline: "Playful & Cozy — High-Quality Clothing for Little Adventurers",
    accent: "from-stone-900 to-amber-950",
    products: [
      { image: kidsJacket1, subcategory: "Jackets" },
      { image: kidsJacket2, subcategory: "Jackets" },
      { image: kidsCoat, subcategory: "Coats" },
      { image: kidsHoodie1, subcategory: "Hoodies" },
      { image: kidsHoodie2, subcategory: "Hoodies" },
    ],
  },
};

// ── Single product card
const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-sm bg-soft"
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.subcategory}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </div>

      {/* Subcategory badge — only label, no price */}
      <div className="absolute top-3 left-3">
        <span className="bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-[2px]">
          {product.subcategory}
        </span>
      </div>
    </motion.div>
  );
};

// ── Main page
const CategoryPage = () => {
  const { gender } = useParams<{ gender: string }>();

  if (!gender || !categoryData[gender]) {
    return <Navigate to="/" replace />;
  }

  const data = categoryData[gender];

  // other gender links
  const others = Object.keys(categoryData).filter((k) => k !== gender);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      {/* ── Hero banner */}
      <div className={`background ${data.accent} text-white px-6 py-16 md:py-20 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-[10px] uppercase tracking-[0.45em] opacity-50 mb-4 font-semibold">
            Urban Grand
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {data.title}
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm opacity-60 leading-relaxed">
            {data.tagline}
          </p>
        </motion.div>
      </div>

      {/* ── Category tabs (switch between men/women/kids) */}
      <div className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 h-12 overflow-x-auto">
          {Object.entries(categoryData).map(([key, cat]) => (
            <Link
              key={key}
              to={`/category/${key}`}
              className={`px-5 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-full transition-all whitespace-nowrap ${key === gender
                ? "bg-foreground text-background"
                : "text-muted-medium hover:text-foreground"
                }`}
            >
              {cat.title.split("'")[0]}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Product grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
        {/* Count label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={gender}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">
            {data.products.length} Products
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">
            {data.title}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {data.products.map((product, i) => (
            <ProductCard key={i} product={product} index={i} />
          ))}
        </div>

        {/* Enquire CTA */}
        <div className="mt-16 text-center border-t border-border/30 pt-12">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-semibold mb-3">
            Interested in our products?
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
            Get in Touch for Bulk Orders
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-85 transition-all rounded-sm"
          >
            Enquire Now →
          </Link>

          {/* Browse other categories */}
          {others.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Browse
              </span>
              {others.map((key) => (
                <Link
                  key={key}
                  to={`/category/${key}`}
                  className="text-[11px] uppercase tracking-widest font-semibold text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors"
                >
                  {categoryData[key].title.split("'")[0]}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
