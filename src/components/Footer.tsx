import { Linkedin, Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logoUrl from "@/assets/urbangrant.jpeg";

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "FAQ", to: "/faq" },
];

const platformLinks = [
  { label: "Men", to: "/contact?category=men" },
  { label: "Women", to: "/contact?category=women" },
  { label: "Kids", to: "/contact?category=kids" },
  { label: "Accessories", to: "/contact?category=accessories" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-zinc-300 px-5 sm:px-8 lg:px-16 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">

        {/* Brand & Info Column */}
        <div className="flex flex-col gap-6 lg:w-1/4">
          <Link to="/" className="inline-block">
            <img src={logoUrl} alt="UrbanGrand Logo" className="h-14 w-auto rounded-sm bg-white p-1" />
          </Link>
          <div className="space-y-1.5 text-sm text-zinc-400 font-medium tracking-wide">
            <p className="font-display text-2xl text-zinc-300">UrbanGrand</p>
          </div>
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="flex items-center justify-center w-8 h-8 rounded-md bg-zinc-800/80 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns container */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 lg:w-3/4 lg:justify-end">

          {/* Platform */}
          <div className="flex flex-col gap-6 min-w-[140px]">
            <h3 className="text-white font-semibold text-[15px]">Platform</h3>
            <ul className="space-y-4">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="flex items-center text-[13px] text-zinc-400 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-3 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-6 min-w-[140px]">
            <h3 className="text-white font-semibold text-[15px]">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="flex items-center text-[13px] text-zinc-400 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mr-3 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6 min-w-[200px]">
            <h3 className="text-white font-semibold text-[15px]">Contact</h3>
            <ul className="space-y-4 text-[13px] text-zinc-400">
              <li>
                <a href="mailto:URBANGRAND78@GMAIL.COM" className="flex items-center hover:text-white transition-colors lowercase">
                  <Mail size={16} className="text-gray-500 mr-3 flex-shrink-0" />
                  URBANGRAND78@GMAIL.COM
                </a>
              </li>
              <li>
                <div className="flex items-start">
                  <Phone size={16} className="text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span>(+91) 76968-80871</span>
                    <span>(+91) 94170-15928</span>
                    <span>(+91) 98888-91485</span>
                  </div>
                </div>
              </li>
              <li className="pt-2">
                <a href="https://maps.app.goo.gl/QQFf4Q21gVMyjt8F8" target="_blank" rel="noopener noreferrer" className="flex items-start text-zinc-400 hover:text-white transition-colors">
                  <MapPin size={16} className="text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">213/15-C, NEW KUNDAN PURI,<br />CIVIL LINES, LUDHIANA-141001 PUNJAB</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-800/60 pt-6">
        <p className="text-[11px] text-zinc-500 font-medium">
          © {new Date().getFullYear()} Panchsheel Knitwears. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
