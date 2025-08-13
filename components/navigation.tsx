"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Rocket } from "lucide-react"

const navItems = [
  { href: "#about", label: "About", id: "about" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#publications", label: "Publications", id: "publications" },
  { href: "#news", label: "News", id: "news" },
  { href: "#contact", label: "Contact", id: "contact" },
]

interface NavigationProps {
  currentSection?: string
}

export function Navigation({ currentSection = "about" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rocketPosition, setRocketPosition] = useState(0)

  useEffect(() => {
    const newIndex = navItems.findIndex((item) => item.id === currentSection)
    if (newIndex !== -1) {
      setRocketPosition(newIndex)
    }
  }, [currentSection])

  return (
    <>
      {/* Desktop Navigation - Inside Fixed Sidebar */}
      <div className="hidden lg:block">
        <nav className="mt-8">
          <ul className="space-y-2 relative">
            <div
              className="absolute left-2 transition-all duration-700 ease-in-out z-10"
              style={{
                top: `${rocketPosition * 60 + 16}px`,
              }}
            >
              <Rocket className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>

            {navItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 relative z-20 ${
                    currentSection === item.id
                      ? "text-blue-600 bg-blue-50 font-semibold shadow-md border-l-4 border-blue-500"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="ml-8">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold text-gray-900">Abdus Salam</div>

          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-3 rounded-lg transition-colors duration-200 ${
                    currentSection === item.id
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
