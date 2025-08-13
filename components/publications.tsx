// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { BookOpen, ExternalLink, Calendar, Users } from "lucide-react"
// import { useEffect, useState } from "react"

// interface Publication {
//   id: number
//   title: string
//   authors: string
//   journal: string
//   year: number
//   doi: string
//   type: string
// }

// interface PublicationsData {
//   journals: Publication[]
//   conferences: Publication[]
// }

// export function Publications() {
//   const [publicationsData, setPublicationsData] = useState<PublicationsData | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("All")

//   useEffect(() => {
//     fetch("/data/publications.json")
//       .then((res) => res.json())
//       .then((data) => setPublicationsData(data))
//       .catch(() => {
//         // Fallback data
//         setPublicationsData({
//           journals: [
//             {
//               id: 1,
//               title: "Mulberry Leaf Disease Detection Using CNN-based Smart Android Application",
//               authors: "Abdus Salam, Mansura Naznine, et al.",
//               journal: "IEEE Access",
//               year: 2024,
//               doi: "10.1109/ACCESS.2024.3407153",
//               type: "journal",
//             },
//           ],
//           conferences: [],
//         })
//       })
//   }, [])

//   if (!publicationsData) return null

//   const allPublications = [...publicationsData.journals, ...publicationsData.conferences]
//   const categories = ["All", "Journal", "Conference"]

//   const filteredPublications =
//     selectedCategory === "All"
//       ? allPublications
//       : allPublications.filter((pub) => pub.type.toLowerCase() === selectedCategory.toLowerCase())

//   const getCategoryColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "journal":
//         return "bg-blue-100 text-blue-700 hover:bg-blue-200"
//       case "conference":
//         return "bg-green-100 text-green-700 hover:bg-green-200"
//       default:
//         return "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }
//   }

//   return (
//     <section id="publications" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12 sm:mb-16">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 hover:text-blue-600 transition-colors duration-300 cursor-default">
//             Publications
//           </h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 sm:mb-8 transform hover:scale-x-150 transition-transform duration-300"></div>
//           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
//             Peer-reviewed research contributions in AI, machine learning, and biomedical applications
//           </p>
//         </div>

//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-wrap justify-center gap-2">
//             {categories.map((category, index) => (
//               <Badge
//                 key={index}
//                 variant={selectedCategory === category ? "default" : "outline"}
//                 className={`cursor-pointer hover:scale-110 transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "hover:bg-blue-50 hover:border-blue-300"
//                 }`}
//                 onClick={() => setSelectedCategory(category)}
//               >
//                 {category}
//               </Badge>
//             ))}
//           </div>
//         </div>

//         <div className="grid gap-4 sm:gap-6">
//           {filteredPublications.map((pub, index) => (
//             <Card
//               key={pub.id}
//               className="p-4 sm:p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 group"
//             >
//               <CardContent className="p-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-start mb-3">
//                       <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
//                       <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
//                         {pub.title}
//                       </h3>
//                     </div>

//                     <div className="flex items-start mb-3 text-gray-600">
//                       <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-1 flex-shrink-0" />
//                       <p className="text-xs sm:text-sm leading-relaxed">{pub.authors}</p>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
//                       <div className="flex items-center text-gray-600 text-sm sm:text-base">
//                         <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
//                         <span className="font-medium">{pub.journal}</span>
//                         <span className="ml-2">({pub.year})</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 mt-4 lg:mt-0">
//                     <Badge className={`${getCategoryColor(pub.type)} transition-all duration-300 hover:scale-105`}>
//                       {pub.type.charAt(0).toUpperCase() + pub.type.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
//                   <div className="text-xs sm:text-sm text-gray-500 break-all">DOI: {pub.doi}</div>
//                   <a
//                     href={`https://doi.org/${pub.doi}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center text-blue-600 hover:text-blue-800 hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
//                   >
//                     <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                     View Paper
//                   </a>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-8 sm:mt-12">
//           <p className="text-gray-600 mb-4 text-sm sm:text-base">
//             <strong>{allPublications.length}+</strong> peer-reviewed publications in top-tier journals and conferences
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <a
//               href="https://scholar.google.com"
//               className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-all duration-300 text-sm sm:text-base"
//             >
//               Google Scholar Profile
//             </a>
//             <span className="text-gray-400 hidden sm:inline">•</span>
//             <a
//               href="https://researchgate.net"
//               className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-all duration-300 text-sm sm:text-base"
//             >
//               ResearchGate Profile
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


// components/publications.tsx
"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink, Calendar, Users } from "lucide-react"
import pubs from "@/data/publications.json"

type PubType = "journal" | "conference" | "chapter"

type RawPublication = {
  id: number
  title: string
  authors: string
  journal?: string       // for journals
  conference?: string    // for conferences
  venue?: string         // generic fallback
  year: number
  doi?: string           // may be full URL or suffix
  type: PubType
}

type PublicationsData = {
  journals?: RawPublication[]
  conferences?: RawPublication[]
  chapters?: RawPublication[]
}

const data = pubs as PublicationsData

function normalize(pub: RawPublication) {
  const venue = pub.venue ?? pub.journal ?? pub.conference ?? "—"
  const doiText = pub.doi ?? "—"
  const doiHref = pub.doi
    ? pub.doi.startsWith("http")
      ? pub.doi
      : `https://doi.org/${pub.doi.replace(/^https?:\/\/doi\.org\//, "")}`
    : undefined
  return { ...pub, venue, doiText, doiHref }
}

export function Publications() {
  const categories = ["All", "Journal", "Conference", "Chapter"] as const
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All")
  const [showAll, setShowAll] = useState(false)
  const DEFAULT_COUNT = 6

  const allNormalized = useMemo(() => {
    const j = (data.journals ?? []).map(normalize)
    const c = (data.conferences ?? []).map(normalize)
    const ch = (data.chapters ?? []).map(normalize)
    return [...j, ...c, ...ch]
  }, [])

  const sorted = useMemo(() => {
    // sort by year desc, then title
    return [...allNormalized].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      return a.title.localeCompare(b.title)
    })
  }, [allNormalized])

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return sorted
    const type = selectedCategory.toLowerCase()
    return sorted.filter((p) => p.type.toLowerCase() === type)
  }, [sorted, selectedCategory])

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_COUNT)
  const totalCount = filtered.length

  const getCategoryColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "journal":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200"
      case "conference":
        return "bg-green-100 text-green-700 hover:bg-green-200"
      case "chapter":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  }

  if (allNormalized.length === 0) return null

  return (
    <section id="publications" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 hover:text-blue-600 transition-colors duration-300 cursor-default">
            Publications
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 sm:mb-8 transform hover:scale-x-150 transition-transform duration-300"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Peer-reviewed research in AI, machine learning, and biomedical applications
          </p>
        </div>

        {/* Category chips */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer hover:scale-110 transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "hover:bg-blue-50 hover:border-blue-300"
                }`}
                onClick={() => {
                  setSelectedCategory(category)
                  setShowAll(false) // reset to default view when changing category
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6">
          {visible.map((pub) => (
            <Card
              key={pub.id}
              className="p-4 sm:p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm group"
>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {pub.title}
                      </h3>
                    </div>

                    <div className="flex items-start mb-3 text-gray-600">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-xs sm:text-sm leading-relaxed">{pub.authors}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center text-gray-600 text-sm sm:text-base">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        <span className="font-medium">{pub.venue}</span>
                        <span className="ml-2">({pub.year})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 mt-4 lg:mt-0">
                    <Badge className={`${getCategoryColor(pub.type)} transition-all duration-300 hover:scale-105`}>
                      {pub.type.charAt(0).toUpperCase() + pub.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 break-all">DOI: {pub.doiText ?? "—"}</div>
                  {pub.doiHref && (
                    <a
                      href={pub.doiHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      View Paper
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show all / less */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => setShowAll((s) => !s)}
            className="inline-flex items-center px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            {showAll ? "Show less" : `Show all (${totalCount})`}
          </button>

          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            Showing {visible.length} of {totalCount} {selectedCategory.toLowerCase()} publication
            {totalCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </section>
  )
}
