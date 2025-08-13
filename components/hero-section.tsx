// components/hero-section.tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  BookOpen,
  MapPin,
  Phone,
  Download,
  Rocket,
  Menu,
  X,
} from "lucide-react"

interface TypingEffectProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  backDelay?: number
}

const TypingEffect = ({ strings, typeSpeed = 80, backSpeed = 40, backDelay = 900 }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentString = strings[currentStringIndex]
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < currentString.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1))
        }, typeSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, backDelay)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, backSpeed)
      } else {
        setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentStringIndex, isTyping, strings, typeSpeed, backSpeed, backDelay])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span>
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}>
        |
      </span>
    </span>
  )
}


import { 
  SiResearchgate,
  SiGooglescholar,
  SiLinkedin,
  SiGithub,
  SiMaildotru,
 } from "react-icons/si";


import { useEffect, useState } from "react"
import profileJson from "@/data/profile.json"

const navItems = [
  { href: "#about", label: "About", id: "about" },
  { href: "#news", label: "News", id: "news" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#experience", label: "Experience", id: "experience" },
  // { href: "#skills", label: "Skills", id: "skills" },
  { href: "#publications", label: "Publications", id: "publications" },
  { href: "#contact", label: "Contact", id: "contact" },
]

interface ProfileData {
  name?: string
  title?: string
  subtitle?: string
  bio?: string
  location?: string
  phone?: string
  email?: string
  image?: string
  cv?: string
  social?: {
    linkedin?: string
    github?: string
    scholar?: string
    researchgate?: string
    website?: string
  }
}

export default function HeroSection() {
  // Pull once from JSON (no network)
  const personal = (profileJson as any)?.personal as ProfileData

  const [currentSection, setCurrentSection] = useState("about")
  const [isOpen, setIsOpen] = useState(false)
  const [rocketPosition, setRocketPosition] = useState(0)
  const [rocketPhase, setRocketPhase] = useState<
    "idle" | "moving-right" | "moving-down" | "moving-left" | "moving-up"
  >("idle")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "education", "experience", "skills", "publications", "news", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (currentSection !== section) setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentSection])

  useEffect(() => {
    const newIndex = navItems.findIndex((item) => item.id === currentSection)
    if (newIndex !== -1 && newIndex !== rocketPosition) {
      const oldIndex = rocketPosition

      if (newIndex > oldIndex) {
        // Moving down - go right then down
        setRocketPhase("moving-right")
        setTimeout(() => {
          setRocketPhase("moving-down")
          setRocketPosition(newIndex)
          setTimeout(() => setRocketPhase("idle"), 400)
        }, 300)
      } else {
        // Moving up - go left then up
        setRocketPhase("moving-left")
        setTimeout(() => {
          setRocketPhase("moving-up")
          setRocketPosition(newIndex)
          setTimeout(() => setRocketPhase("idle"), 400)
        }, 300)
      }
    }
  }, [currentSection, rocketPosition])

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

 const handleDownloadCV = () => {
  const cvUrl = "https://drive.google.com/file/d/1rtPwnEUMSLE8WGGGlvBd58MmDJd6U6yt/view?usp=sharing"
  window.open(cvUrl, "_blank")
}


  const getRocketTransform = () => {
    const baseTop = rocketPosition * 48 + 12
    const baseLeft = 8

    switch (rocketPhase) {
      case "moving-right":
        return `translateY(${baseTop}px) translateX(${baseLeft + 180}px) rotate(45deg)`
      case "moving-down":
        return `translateY(${baseTop}px) translateX(${baseLeft + 180}px) rotate(90deg)`
      case "moving-left":
        return `translateY(${baseTop}px) translateX(${baseLeft + 180 - 80}px) rotate(-135deg)`
      case "moving-up":
        return `translateY(${baseTop}px) translateX(${baseLeft + 180 - 80}px) rotate(-90deg)`
      default:
        return `translateY(${baseTop}px) translateX(${baseLeft}px) rotate(0deg)`
    }
  }

  const name = personal?.name ?? "Abdus Salam"
  const title = personal?.title ?? "Software Engineer"
  const subtitle = personal?.subtitle ?? "Researcher"
  const bio = personal?.bio ?? "Developing AI solutions for healthcare and smart agriculture."
  const image = personal?.image ?? "/salam.svg"
  const email = personal?.email ?? "salam35.ruet17@gmail.com"
  const phone = personal?.phone ?? "+8801791373638"
  const location = personal?.location ?? "Rajshahi, Bangladesh"
  const social = personal?.social ?? {}

  return (
    <>
      {/* Fixed Left Sidebar - Desktop only */}
      <div className="hidden lg:block fixed left-0 top-1 w-[25%] h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-r border-slate-200 overflow-hidden z-40">
        <div className="h-full flex flex-col">
          {/* Profile Section - Compact */}
          <div className="p-4 border-b border-slate-200">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-center border border-white/50 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-60 bg-gradient-to-bl from-blue-100 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-60"></div>

              {/* Compact Profile Image */}
              <div className="relative group mb-3">
                <div className="w-35 h-35 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-xl transform group-hover:scale-105 transition-all duration-500">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Compact Name and Title */}
              <h1
                className="text-4xl font-bold mb-5 leading-tight"
                style={{ fontFamily: "Consolas, monospace" }}
              >
                <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <TypingEffect
                    strings={[name, "Software Engineer", "Researcher"]}
                    typeSpeed={80}
                    backSpeed={40}
                    backDelay={900}
                  />
                </span>
              </h1>

              <p className="text-xs text-slate-600 mb-1 uppercase tracking-wide font-medium">{title}</p>
              <p className="text-xs text-slate-500 mb-3">{subtitle}</p>

              {/* Compact Bio */}
              <p className="text-sm text-slate-700 leading-relaxed mb-4 px-2">
                {(bio?.split(".")[0] ?? "Developing AI solutions for healthcare and smart agriculture") + "."}
              </p>

              {/* Compact Social Links */}
              <div className="flex justify-center space-x-6 mb-6">
                {[
                  { href: social.linkedin, icon: SiLinkedin, color: "hover:bg-blue-100 hover:text-blue-600" },
                  { href: social.github, icon: SiGithub, color: "hover:bg-gray-800 hover:text-white" },
                  { href: social.scholar, icon: SiGooglescholar, color: "hover:bg-green-100 hover:text-green-600" },
                  { href: social.researchgate, icon: SiResearchgate, color: "hover:bg-teal-100 hover:text-teal-600" },
                ].map(({ href, icon: Icon, color }, index) => (
                  <a
                    key={index}
                    href={href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-full bg-slate-100 text-slate-900 ${color} transform hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Compact Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleContactClick}
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-xs"
                >
                  <Mail className="w-3 h-3 mr-2" />
                  Contact Me
                </Button>
                <Button
                  onClick={handleDownloadCV}
                  variant="outline"
                  size="sm"
                  className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 transform hover:scale-105 transition-all duration-300 bg-white/70 text-xs"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Section - Takes remaining space */}
          <div className="flex-1 p-4 overflow-y-auto">
            <nav>
              <ul className="space-y-1 relative">
                <div
                  className="absolute transition-all duration-500 ease-out z-10"
                  style={{ transform: getRocketTransform() }}
                >
                  <Rocket className={`w-4 h-4 text-orange-500 ${rocketPhase === "idle" ? "animate-pulse" : ""}`} />
                </div>

                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`block px-3 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-1 relative z-20 text-sm ${
                        currentSection === item.id
                          ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 font-semibold shadow-sm border-l-4 border-blue-500"
                          : "text-gray-700 hover:text-blue-600 hover:bg-white/50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="ml-6">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info at Bottom */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300 group">
                  <Mail className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span className="truncate font-mono">{email}</span>
                </div>
                {/* <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300 group">
                  <Phone className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span className="font-mono">{phone}</span>
                </div> */}
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300 group">
                  <MapPin className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            {name}
          </div>

          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="bg-white/95 backdrop-blur-sm border-t shadow-lg">
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

            {/* Mobile Contact Info */}
            <div className="px-4 py-3 border-t bg-slate-50/90">
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{(personal?.email ?? "salam35.ruet17@gmail.com").split("@")[0]}@...</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{phone.replace(/(\+\d{6}).+/, "$1...")}</span>
                </div> */}
              </div>
              <div className="flex justify-center space-x-3 mt-3">
                {[
                  { href: social.linkedin, icon: Linkedin },
                  { href: social.github, icon: Github },
                  { href: social.scholar, icon: BookOpen },
                  { href: social.researchgate, icon: ExternalLink },
                ].map(({ href, icon: Icon }, index) => (
                  <a
                    key={index}
                    href={href || "#"}
                    className="p-2 rounded-full bg-white text-slate-600 hover:text-blue-600 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
