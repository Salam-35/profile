import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Trophy, Target } from "lucide-react"

export function ResearchHighlights() {
  const stats = [
    { label: "Publications", value: "10+", icon: <BookOpen className="w-4 h-4" />, color: "text-blue-400" },
    { label: "Collaborations", value: "5+", icon: <Users className="w-4 h-4" />, color: "text-green-400" },
    { label: "Awards", value: "6+", icon: <Trophy className="w-4 h-4" />, color: "text-yellow-400" },
    { label: "Research Areas", value: "8", icon: <Target className="w-4 h-4" />, color: "text-purple-400" },
  ]

  const recentAchievements = [
    "IEEE Access Publication (2024)",
    "Qatar University Collaboration",
    "Excellent Researcher Award",
    "Codeforces Specialist Rank",
  ]

  return (
    <section className="flex-1 p-8 bg-gradient-to-br from-purple-800/30 to-slate-800/30 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Research Impact</h2>
          <p className="text-gray-300">Measurable contributions to AI and machine learning</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 mb-2 ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300 text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
