import { ChevronDown, Menu, X, Sun, Moon, Globe, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoUrl from "@/assets/urbangrant.jpeg";
import brochurePdf from "@/assets/PANCHSHEEL-PROFILE-LATEST.pdf";

const menuItems = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    slug: "about",
    subcategories: ["Our Legacy", "Philosophy & Core Values", "Mission & Vision", "Our Brands", "Our Leadership", "Company Credentials", "Brochure"]
  },
  {
    label: "Men",
    slug: "men",
    subcategories: ["Jacket", "Coats", "Sweatshirts", "Hoodies", "T-Shirts", "Lowers"]
  },
  {
    label: "Women",
    slug: "women",
    subcategories: ["Jacket", "Coats", "Sweatshirts", "Hoodies", "Cardigans"]
  },
  {
    label: "Kids",
    slug: "kids",
    subcategories: ["Jacket", "Coats", "Sweaters"]
  },
  {
    label: "Accessories",
    slug: "accessories",
    subcategories: ["Thermal", "Socks", "Caps", "Mufflers", "Hand Gloves"]
  },
];

const languages = ["English", "Hindi", "Punjabi"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);

      const listener = (e: MediaQueryListEvent) => {
        if (theme === 'system') {
          root.classList.remove("light", "dark");
          root.classList.add(e.matches ? 'dark' : 'light');
        }
      };
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
      return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  return (
    <nav className="h-20 flex items-center justify-between px-5 lg:px-12 sticky top-0 z-50 glass-light subtle-border">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logoUrl} alt="UrbanGrand Logo" className="h-[50px] w-[50px] rounded-sm mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:p-1" />
        <span className="font-display text-2xl">UrbanGrand</span>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-6 lg:gap-8 items-center h-full">
        {menuItems.map((item) => {
          if (item.to) {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`text-[13px] font-semibold uppercase tracking-widest transition-elegant relative group ${active ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`}
              >
                {item.label}
                <span className={`absolute bottom-[-4px] left-0 w-full h-[0.5px] bg-foreground transition-transform transition-elegant origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          }

          // Dropdown for Men, Women, Kids, Accessories
          return (
            <div key={item.label} className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest text-foreground/80 hover:text-foreground transition-elegant">
                {item.label} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown menu */}
              <div className="absolute top-[64px] left-1/2 -translate-x-1/2 w-48 bg-background subtle-border-strong shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 py-2">
                {item.subcategories?.map((sub) => {
                  if (sub === "Brochure") {
                    return (
                      <a
                        key={sub}
                        href={brochurePdf}
                        download="PANCHSHEEL_BROCHURE.pdf"
                        className="block px-6 py-2.5 text-sm text-muted-medium hover:text-foreground hover:bg-soft transition-colors"
                      >
                        {sub}
                      </a>
                    );
                  }

                  const toUrl = item.slug === "about"
                    ? `/about/category/${sub.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`
                    : `/contact?category=${item.slug}&subcategory=${encodeURIComponent(sub)}`;

                  return (
                    <Link
                      key={sub}
                      to={toUrl}
                      className="block px-6 py-2.5 text-sm text-muted-medium hover:text-foreground hover:bg-soft transition-colors"
                    >
                      {sub}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop right actions */}
      <div className="hidden md:flex items-center gap-4">
        {/* Language Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <button className="flex items-center gap-1.5 text-[13px] text-foreground/80 hover:text-foreground transition-elegant uppercase font-semibold tracking-wide">
            <Globe size={14} /> {currentLang} <ChevronDown size={14} className={`${langOpen ? "rotate-180" : ""} transition-transform duration-300`} />
          </button>

          <div className={`absolute top-full right-0 mt-4 w-32 bg-background subtle-border-strong shadow-xl rounded-b-md transition-all duration-300 py-1 ${langOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                className="w-full text-left px-5 py-2 text-[13px] text-muted-medium hover:text-foreground hover:bg-soft transition-colors"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-soft transition-elegant text-foreground/80 hover:text-foreground ml-2 mr-1"
          aria-label="Toggle theme"
          title={`Theme: ${theme}`}
        >
          {theme === "light" ? <Sun size={16} /> : theme === "dark" ? <Moon size={16} /> : <Monitor size={16} />}
        </button>

        <Link
          to="/contact"
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide hover:opacity-90 transition-elegant"
        >
          CONTACT
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-soft transition-elegant"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 h-[calc(100vh-64px)] overflow-y-auto bg-background/95 backdrop-blur-xl subtle-border-strong flex flex-col pt-4 pb-12 md:hidden shadow-lg z-50">
          {menuItems.map((item) => {
            if (item.to) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-4 text-[15px] font-semibold uppercase tracking-widest text-foreground/80 hover:text-foreground hover:bg-soft transition-colors border-b border-border/40"
                >
                  {item.label}
                </Link>
              );
            }

            const isExpanded = mobileExpanded === item.label;

            return (
              <div key={item.label} className="border-b border-border/40">
                <button
                  onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                  className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                  <ChevronDown size={18} className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`} />
                </button>

                {/* Mobile Subcategories */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}>
                  <div className="bg-soft/50 py-2">
                    {item.subcategories?.map((sub) => {
                      if (sub === "Brochure") {
                        return (
                          <a
                            key={sub}
                            href={brochurePdf}
                            download="PANCHSHEEL_BROCHURE.pdf"
                            onClick={() => setMobileOpen(false)}
                            className="block px-8 py-3 text-sm text-muted-medium hover:text-foreground hover:bg-soft transition-colors"
                          >
                            {sub}
                          </a>
                        );
                      }

                      const toUrlMobile = item.slug === "about"
                        ? `/about/category/${sub.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`
                        : `/contact?category=${item.slug}&subcategory=${encodeURIComponent(sub)}`;

                      return (
                        <Link
                          key={sub}
                          to={toUrlMobile}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-3 text-sm text-muted-medium hover:text-foreground hover:bg-soft transition-colors"
                        >
                          {sub}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile Bottom Row Actions */}
          <div className="mt-auto px-6 pt-8 flex flex-col gap-6">

            {/* Language Selector */}
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-muted-soft font-semibold">Language</span>
              <div className="flex gap-2 flex-wrap">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={`px-4 py-2 text-xs rounded-full border transition-all ${currentLang === lang
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-medium hover:border-foreground/50"
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border/40">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-soft transition-elegant text-foreground/80 hover:text-foreground font-semibold text-sm"
              >
                {theme === "light" ? (
                  <><Moon size={18} /> Dark Mode</>
                ) : theme === "dark" ? (
                  <><Monitor size={18} /> System Mode</>
                ) : (
                  <><Sun size={18} /> Light Mode</>
                )}
              </button>

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide hover:opacity-90 transition-elegant"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
