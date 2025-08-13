import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, BookOpen, GraduationCap } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <img
              src="/software-engineer-researcher-headshot.png"
              alt="Abdus Salam"
              className="w-48 h-48 rounded-full mx-auto mb-8 shadow-2xl border-4 border-white"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Abdus <span className="text-blue-600">Salam</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <GraduationCap className="w-4 h-4 mr-2" />
              PhD Candidate
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Software Engineer (AI)
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Research Assistant
            </Badge>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Artificial Intelligence researcher with expertise in machine learning, computer vision, and biomedical
            applications. Currently pursuing PhD while developing enterprise-grade AI solutions for healthcare and smart
            agriculture.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="w-5 h-5 mr-2" />
              View Publications
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="https://github.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://scholar.google.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <BookOpen className="w-8 h-8" />
            </a>
            <a href="https://researchgate.net" className="text-gray-600 hover:text-blue-600 transition-colors">
              <ExternalLink className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
