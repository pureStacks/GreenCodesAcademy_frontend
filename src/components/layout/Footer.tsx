import { Link } from "react-router-dom"
import { Code2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useAppStore } from "@/src/store"

export function Footer() {
  const { data } = useAppStore();
  const siteData = data?.site || {};
  const navigation = data?.navigation || {
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Programs", path: "/programs" },
      { name: "Why Choose Us", path: "/why-choose-us" },
      { name: "Testimonials", path: "/testimonials" },
      { name: "Contact", path: "/contact" },
    ],
    cta: { text: "ENROLL NOW", url: "/enrollment" }
  };
  
  const navItems = navigation.links || [];

  const siteName = siteData.name || "Green Codes Academy";
  const footerDesc = siteData.footerDescription || "Empowering the next generation with practical technology and digital skills.";
  const phone = siteData.whatsapp || "+234 903 088 2127";
  const email = siteData.email || "greencodesacademy@gmail.com";
  const address = siteData.address || "123 Tech Avenue, Lagos, Nigeria.";
  const copyright = siteData.copyright || "© 2026 Green Code Academy. All Rights Reserved.";

  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              {siteData.logo ? (
                <img src={siteData.logo} alt={siteName} className="h-8 w-auto object-contain brightness-0 invert" />
              ) : (
                <div className="bg-green-600 text-white p-1.5 rounded-lg">
                  <Code2 className="h-6 w-6" />
                </div>
              )}
              <span className="font-bold text-xl tracking-tight">{siteName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              {footerDesc}
            </p>
            <div className="flex items-center gap-4">
              {siteData.facebook && (
                <a href={siteData.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {siteData.twitter && (
                <a href={siteData.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {siteData.instagram && (
                <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteData.linkedin && (
                <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {(!siteData.facebook && !siteData.twitter && !siteData.instagram && !siteData.linkedin) && (
                <>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-green-400 transition-colors focus-visible:outline-none focus-visible:text-green-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <span className="block text-sm text-gray-500 mb-1">WhatsApp & Call</span>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors block">
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Email</span>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors block break-all">
                    {email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Location</span>
                  <span className="block">{address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest tech news and enrollment updates.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {copyright}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
