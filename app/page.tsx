"use client"

import  HeroSection  from "@/components/hero-section"
import { About } from "@/components/about"
import { Education } from "@/components/education"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Publications } from "@/components/publications"
import { RecentNews } from "@/components/recent-news"
import { Contact } from "@/components/contact"
import PhotoGallery from "@/components/gallery"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Fixed Sidebar */}
      <HeroSection />

      {/* Main Content Sections */}
      <div className="lg:ml-[25.333333%]">
        <About />
        <RecentNews />
        <Education />
        <Experience />
        {/* <PhotoGallery /> */}
        {/* <Skills /> */}
        <Publications />
        
        <Contact />
      </div>
    </main>
  )
}
