import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Code2, Lock } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { cn } from "@/src/lib/utils"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Programs", path: "/programs" },
  { name: "Why Choose Us", path: "/why-choose-us" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white/95 backdrop-blur-md py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-lg p-1">
            <div className="bg-green-700 text-white p-1.5 rounded-lg">
              <Code2 className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Green Codes Academy</span>
            <span className="font-bold text-xl tracking-tight sm:hidden">GCA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                  location.pathname === item.path
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/admin/login" className="text-gray-400 hover:text-gray-600 transition-colors" title="Admin Login">
              <Lock className="h-4 w-4" />
            </Link>
            
            <Link to="/enrollment" tabIndex={-1}>
              <Button size="sm" className="hidden md:inline-flex px-6">
                ENROLL NOW
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block px-4 py-3 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                location.pathname === item.path
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <Link to="/enrollment" tabIndex={-1} className="block w-full">
              <Button className="w-full">ENROLL NOW</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
