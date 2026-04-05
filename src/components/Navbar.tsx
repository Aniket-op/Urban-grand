import { ChevronDown, Menu, X, Sun, Moon, Globe, Monitor, LogIn, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoUrl from "@/assets/urbangrant.jpeg";
import brochurePdf from "@/assets/PANCHSHEEL-PROFILE-LATEST.pdf";

type SubItem = { label: string; to: string; download?: boolean };
type MenuItem =
  | { label: string; to: string; slug?: never; subcategories?: never }
  | { label: string; to?: never; slug: string; subcategories: SubItem[] };

const menuItems: MenuItem[] = [
  { label: "Home Page", to: "/" },
  {
    label: "Discover Us",
    slug: "about",
    subcategories: [
      { label: "Our Legacy & Brands", to: "/about/category/our-legacy" },
      { label: "Mission, Vision & Philosophy", to: "/about/category/mission-vision" },
      { label: "Our Leadership", to: "/about/category/our-leadership" },
      { label: "Company Credentials", to: "/about/category/company-credentials" },
      { label: "Brochure", to: brochurePdf, download: true },
    ],
  },
  {
    label: "Our Products",
    slug: "products",
    subcategories: [
      { label: "Men", to: "/contact?category=men" },
      { label: "Women", to: "/contact?category=women" },
      { label: "Kids", to: "/contact?category=kids" },
    ],
  },
  { label: "Contact Us", to: "/contact" },
];

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll to toggle hero/scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("theme") || "system";
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(sys);
      const listener = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
      return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((p) => (p === "light" ? "dark" : p === "dark" ? "system" : "light"));

  // Language
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  return (
    <>
      {/* ── TOP INFO BAR ─────────────────────────────────────────────── */}
      <div className={`fixed top-0 w-full z-[51] transition-all duration-500 ${
        scrolled
          ? "h-0 opacity-0 overflow-hidden"
          : "h-9 opacity-100"
      }`}>
        <div className="h-full bg-[hsl(220,25%,12%)] text-white/80 flex items-center justify-center gap-8 text-[11px] tracking-wide font-medium">
          <a href="mailto:URBANGRAND78@GMAIL.COM" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} />
            <span className="hidden sm:inline">URBANGRAND78@GMAIL.COM</span>
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <a href="tel:+917696880871" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} />
            <span>(+91) 76968-80871</span>
          </a>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-white/60">Trusted Craftsmanship Since 1978</span>
        </div>
      </div>

      {/* ── NAV BAR ──────────────────────────────────────────────────────── */}
      <nav className={`h-[72px] flex items-center justify-between px-5 lg:px-12 fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "top-0 glass-corporate border-b border-border/40"
          : "top-9 bg-transparent border-transparent"
      }`}>
        {/* Logo — centered when at hero top, left-aligned when scrolled */}
        <Link
          to="/"
          className={`flex items-center gap-3 group transition-all duration-500 ${!scrolled
            ? "absolute left-1/2 -translate-x-1/2"
            : "relative translate-x-0"
            }`}
        >
          <img
            src={logoUrl}
            alt="Urban Grand Logo"
            className="h-[44px] w-[44px] rounded-sm mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:p-1 transition-transform duration-300 group-hover:scale-105 "
          />
          <span className={`font-heading text-[20px] font-bold tracking-[0.08em] leading-none transition-colors duration-500 ${!scrolled ? "text-white" : ""}`}>
            URBAN GRAND
          </span>
        </Link>

        {/* Desktop nav links — hidden on hero top */}
        <div
          className={`hidden md:flex gap-5 lg:gap-7 items-center h-full transition-all duration-500 ${scrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          {menuItems.map((item) => {
            if (item.to) {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-[12px] font-semibold uppercase tracking-[0.12em] transition-elegant relative group ${active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-[-4px] left-0 w-full h-[1.5px] bg-foreground transition-transform origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </Link>
              );
            }

            return (
              <div key={item.label} className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-foreground/70 hover:text-foreground transition-elegant">
                  {item.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>

                <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-56 bg-background border border-border/60 shadow-lg shadow-black/[0.06] rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 py-1.5">
                  {item.subcategories.map((sub) =>
                    sub.download ? (
                      <a
                        key={sub.label}
                        href={sub.to}
                        download="PANCHSHEEL_BROCHURE.pdf"
                        className="flex items-center px-5 py-2.5 text-[13px] text-muted-medium hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent hover:border-foreground/50"
                      >
                        {sub.label}
                      </a>
                    ) : (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className="flex items-center px-5 py-2.5 text-[13px] text-muted-medium hover:text-foreground hover:bg-muted/50 transition-colors border-l-2 border-transparent hover:border-foreground/50"
                      >
                        {sub.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop right actions — hidden on hero top */}
        <div
          className={`hidden md:flex items-center gap-3 transition-all duration-500 ${scrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          {/* Language Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[12px] text-foreground/70 hover:text-foreground transition-elegant font-semibold">
              <span>{currentLang.flag}</span>
              <span className="hidden lg:inline uppercase tracking-wide">{currentLang.label}</span>
              <ChevronDown
                size={13}
                className={`${langOpen ? "rotate-180" : ""} transition-transform duration-300`}
              />
            </button>

            <div
              className={`absolute top-full right-0 mt-4 w-44 bg-background border border-border/60 shadow-lg shadow-black/[0.06] rounded-md transition-all duration-300 py-1 ${langOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                  className={`w-full text-left px-5 py-2.5 text-[13px] flex items-center gap-3 transition-colors ${currentLang.code === lang.code
                    ? "text-foreground font-semibold bg-muted/50"
                    : "text-muted-medium hover:text-foreground hover:bg-muted/30"
                    }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted/50 transition-elegant text-foreground/70 hover:text-foreground"
            aria-label="Toggle theme"
            title={`Theme: ${theme}`}
          >
            {theme === "light" ? <Sun size={16} /> : theme === "dark" ? <Moon size={16} /> : <Monitor size={16} />}
          </button>

          {/* Login Button */}
          <button
            onClick={() => setLoginOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-md border border-foreground/20 text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground hover:border-foreground/40 hover:bg-muted/30 transition-elegant"
          >
            <LogIn size={13} />
            Login
          </button>
        </div>

        {/* Mobile hamburger — hidden on hero top */}
        <button
          className={`md:hidden p-2 rounded-lg hover:bg-muted/50 transition-all duration-500 ${scrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="absolute top-[72px] left-0 right-0 h-[calc(100vh-72px)] overflow-y-auto bg-background/98 backdrop-blur-xl border-t border-border/40 flex flex-col pt-4 pb-12 md:hidden shadow-lg z-50">
            {menuItems.map((item) => {
              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-6 py-4 text-[14px] font-semibold uppercase tracking-[0.1em] text-foreground/80 hover:text-foreground hover:bg-muted/30 transition-colors border-b border-border/30"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isExpanded = mobileExpanded === item.label;
              return (
                <div key={item.label} className="border-b border-border/30">
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                    className="w-full flex items-center justify-between px-6 py-4 text-[14px] font-semibold uppercase tracking-[0.1em] text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}
                  >
                    <div className="bg-muted/20 py-2">
                      {item.subcategories.map((sub) =>
                        sub.download ? (
                          <a
                            key={sub.label}
                            href={sub.to}
                            download="PANCHSHEEL_BROCHURE.pdf"
                            onClick={() => setMobileOpen(false)}
                            className="block px-8 py-3 text-sm text-muted-medium hover:text-foreground hover:bg-muted/30 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            onClick={() => setMobileOpen(false)}
                            className="block px-8 py-3 text-sm text-muted-medium hover:text-foreground hover:bg-muted/30 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile bottom: Language + Theme + Login */}
            <div className="mt-auto px-6 pt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-muted-soft font-semibold">Language</span>
                <div className="flex gap-2 flex-wrap">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition-all ${currentLang.code === lang.code
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-medium hover:border-foreground/50"
                        }`}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border/30">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-elegant text-foreground/80 hover:text-foreground font-semibold text-sm"
                >
                  {theme === "light" ? (
                    <><Moon size={18} /> Dark Mode</>
                  ) : theme === "dark" ? (
                    <><Monitor size={18} /> System Mode</>
                  ) : (
                    <><Sun size={18} /> Light Mode</>
                  )}
                </button>

                <button
                  onClick={() => { setLoginOpen(true); setMobileOpen(false); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-semibold tracking-wide hover:opacity-85 transition-elegant"
                >
                  <LogIn size={13} />
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── LOGIN MODAL ──────────────────────────────────────────────────── */}
      {loginOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            onClick={() => setLoginOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-full max-w-md bg-background border border-border/60 shadow-2xl rounded-lg p-10">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-5 right-5 p-2 hover:bg-muted/50 rounded-md transition-elegant text-muted-medium"
              aria-label="Close login"
            >
              <X size={18} />
            </button>
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold mb-2">
                Welcome Back
              </p>
              <h2 className="font-display text-3xl font-bold">Sign In</h2>
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-background border border-border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-background border border-border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background py-4 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-80 transition-elegant rounded-md"
              >
                Sign In
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Don't have an account?{" "}
                <button type="button" className="underline hover:text-foreground transition-colors">
                  Register
                </button>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
