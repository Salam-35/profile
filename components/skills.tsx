import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Brain, Globe, Award, Trophy } from "lucide-react"

const skillCategories = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: [
      { name: "Python", level: "Highly Professional", color: "bg-blue-100 text-blue-700" },
      { name: "PyTorch", level: "Professional", color: "bg-orange-100 text-orange-700" },
      { name: "C/C++", level: "Professional", color: "bg-green-100 text-green-700" },
      { name: "HTML/CSS", level: "Professional", color: "bg-purple-100 text-purple-700" },
      { name: "JavaScript/jQuery", level: "Professional", color: "bg-yellow-100 text-yellow-700" },
      { name: "PHP", level: "Professional", color: "bg-indigo-100 text-indigo-700" },
    ],
  },
  {
    icon: Brain,
    title: "AI/ML Technologies",
    skills: [
      { name: "Deep Learning", level: "Expert", color: "bg-red-100 text-red-700" },
      { name: "Computer Vision", level: "Expert", color: "bg-pink-100 text-pink-700" },
      { name: "Medical Image Analysis", level: "Expert", color: "bg-teal-100 text-teal-700" },
      { name: "Smart Agriculture", level: "Professional", color: "bg-emerald-100 text-emerald-700" },
    ],
  },
  {
    icon: Globe,
    title: "Tools & Frameworks",
    skills: [
      { name: "Bootstrap", level: "Professional", color: "bg-violet-100 text-violet-700" },
      { name: "Microsoft Office", level: "Professional", color: "bg-blue-100 text-blue-700" },
    ],
  },
]

const achievements = [
  {
    icon: Award,
    title: '"Excellent Researcher" Award',
    description: "Department of ECE, RUET",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: Trophy,
    title: "Specialist Rank",
    description: "Codeforces Programming",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: Trophy,
    title: "11th Place",
    description: "Codesmash 2018 Programming Contest",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Trophy,
    title: "10th Place",
    description: "RUET GyanJam 2018",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Trophy,
    title: "34th Place",
    description: "Technocracy Programming Contest (RUET IUPC)",
    color: "bg-red-100 text-red-700",
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Skills & Achievements</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Skills</h3>
            <div className="space-y-8">
              {skillCategories.map((category, index) => (
                <Card key={index} className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <category.icon className="w-6 h-6 text-blue-600 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-900">{category.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="group">
                          <Badge className={`${skill.color} hover:scale-105 transition-transform cursor-pointer`}>
                            {skill.name}
                            <span className="ml-2 text-xs opacity-75">({skill.level})</span>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg ${achievement.color} mr-4`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-6 shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Problem Setting Experience</h4>
                <p className="text-gray-700">
                  Set multiple problems in Intra-RUET programming contests covering Number Theory, Geometry, and Ad-hoc
                  problems, contributing to the competitive programming community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
