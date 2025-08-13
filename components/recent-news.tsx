// components/recent-news.tsx
"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, BookOpen, Briefcase, GraduationCap, ExternalLink } from "lucide-react"
import newsJson from "@/data/news.json"

type NewsItem = {
  id: number
  title: string
  date: string // ISO string in JSON
  description: string
  link?: string
  type: "publication" | "career" | "award" | "education" | "research"
}

type NewsData = { news: NewsItem[] }

const iconMap = {
  publication: BookOpen,
  career: Briefcase,
  award: Award,
  education: GraduationCap,
  research: BookOpen,
}

const colorMap = {
  publication: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  career: "bg-green-100 text-green-700 hover:bg-green-200",
  award: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  education: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  research: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
}

export function RecentNews() {
  const data = (newsJson as NewsData)?.news ?? []
  const DEFAULT_COUNT = 5

  const sorted = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [data]
  )

  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? sorted : sorted.slice(0, DEFAULT_COUNT)
  const total = sorted.length

  if (total === 0) return null

  return (
    <section id="news" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 hover:text-blue-600 transition-colors duration-300 cursor-default">
            Recent News
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 sm:mb-8 transform hover:scale-x-150 transition-transform duration-300"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with my latest achievements, publications, and career milestones
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto">
          {visible.map((item) => {
            const IconComponent = iconMap[item.type] ?? BookOpen
            const colorClass = colorMap[item.type] ?? colorMap.publication

            return (
              <Card
                key={item.id}
                className="p-4 sm:p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 group"
              >
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div
                      className={`p-2 sm:p-3 rounded-lg ${colorClass} mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-4">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <Badge className={`${colorClass} transition-all duration-300 hover:scale-105 text-xs sm:text-sm`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base flex-1">
                          {item.description}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800 hover:scale-110 transition-all duration-300 text-sm whitespace-nowrap"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            View Details
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Show All / Less */}
        <div className="text-center mt-6 sm:mt-8">
          <Button
            onClick={() => setShowAll((s) => !s)}
            variant="outline"
            size="lg"
            className="hover:scale-110 hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-400 text-sm sm:text-base px-6 sm:px-8"
          >
            {showAll ? "Show less" : `Show all (${total})`}
          </Button>
          <p className="text-gray-600 mt-3 text-sm">
            Showing {visible.length} of {total} news item{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </section>
  )
}
