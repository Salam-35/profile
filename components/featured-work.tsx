import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Award } from "lucide-react"

export function FeaturedWork() {
  const featuredProjects = [
    {
      title: "AI-Powered Medical Diagnosis",
      description:
        "Deep learning models for medical image classification and abnormality detection in healthcare applications.",
      tags: ["PyTorch", "Computer Vision", "Healthcare AI"],
      status: "Active Research",
      impact: "Published in IEEE Access",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Smart Agriculture Solutions",
      description: "ML solutions for crop disease prediction and yield optimization using advanced image processing.",
      tags: ["Machine Learning", "Agriculture", "Mobile App"],
      status: "In Production",
      impact: "Real-world deployment",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ]

  return (
    <section className="flex-1 p-8 bg-gradient-to-br from-slate-800/30 to-purple-800/30 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Featured Research</h2>
          <p className="text-gray-300">Cutting-edge AI solutions making real-world impact</p>
        </div>

        <div className="grid gap-6 flex-1">
          {featuredProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">{project.icon}</div>
                    <div>
                      <CardTitle className="text-white text-lg group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-300">
                          {project.status}
                        </Badge>
                        <span className="text-xs text-gray-400">• {project.impact}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs border-white/20 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
