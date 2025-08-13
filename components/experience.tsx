// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Briefcase, Calendar, MapPin, Building } from "lucide-react"

// const experiences = [
//   {
//     title: "Software Engineer – Artificial Intelligence",
//     company: "MyMedicalHub International Ltd.",
//     location: "Dhaka, Bangladesh",
//     period: "Aug 2024 - Present",
//     type: "Full-time",
//     status: "current",
//     responsibilities: [
//       "Designing and developing enterprise-grade AI applications for medical professionals",
//       "Implementing machine learning models to streamline clinical workflows and data analysis",
//     ],
//   },
//   {
//     title: "Research Assistant",
//     company: "Qatar University Machine Learning Group",
//     location: "Doha, Qatar",
//     period: "Aug 2023 - Present",
//     type: "Remote, Full-time",
//     status: "current",
//     responsibilities: [
//       "Developed deep learning models for medical image classification and abnormality detection",
//       "Built ML solutions for smart agriculture, including crop disease prediction and yield optimization",
//     ],
//   },
// ]

// export function Experience() {
//   return (
//     <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Experience</h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
//         </div>

//         <div className="space-y-8">
//           {experiences.map((exp, index) => (
//             <Card
//               key={index}
//               className={`p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm ${
//                 exp.status === "current" ? "ring-2 ring-green-200" : ""
//               }`}
//             >
//               <CardContent className="p-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-2">
//                       <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
//                       <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
//                       {exp.status === "current" && <Badge className="ml-3 bg-green-100 text-green-700">Current</Badge>}
//                     </div>
//                     <div className="flex items-center mb-2">
//                       <Building className="w-5 h-5 text-gray-500 mr-2" />
//                       <p className="text-xl text-gray-700">{exp.company}</p>
//                     </div>
//                     <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {exp.period}
//                       </div>
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         {exp.location}
//                       </div>
//                       <Badge variant="outline">{exp.type}</Badge>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities:</h4>
//                   <ul className="space-y-2">
//                     {exp.responsibilities.map((responsibility, respIndex) => (
//                       <li key={respIndex} className="flex items-start">
//                         <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
//                         <span className="text-gray-700">{responsibility}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


// components/experience.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin, Building } from "lucide-react"
import profile from "@/data/profile.json"

type ProfileExperienceItem = {
  title?: string        // e.g., "Software Engineer – Artificial Intelligence"
  role?: string         // (alternate key some JSONs use)
  company?: string
  organization?: string // (alternate key)
  location?: string
  period?: string       // e.g., "Aug 2024 - Present"
  type?: string         // e.g., "Full-time"
  status?: string       // e.g., "current"
  responsibilities?: string[] | string
  bullets?: string[]    // (alternate key)
}

const experiences: ProfileExperienceItem[] =
  ((profile as any)?.experience as ProfileExperienceItem[]) ?? []

export function Experience() {
  // Sensible fallback if JSON is empty
  const items = experiences.length
    ? experiences
    : [
        {
          title: "Software Engineer – Artificial Intelligence",
          company: "MyMedicalHub International Ltd.",
          location: "Dhaka, Bangladesh",
          period: "Aug 2024 - Present",
          type: "Full-time",
          status: "current",
          responsibilities: [
            "Designing and developing enterprise-grade AI applications for medical professionals",
            "Implementing machine learning models to streamline clinical workflows and data analysis",
          ],
        },
        {
          title: "Research Assistant",
          company: "Qatar University Machine Learning Group",
          location: "Doha, Qatar",
          period: "Aug 2023 - Present",
          type: "Remote, Full-time",
          status: "current",
          responsibilities: [
            "Developed deep learning models for medical image classification and abnormality detection",
            "Built ML solutions for smart agriculture, including crop disease prediction and yield optimization",
          ],
        },
      ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Experience</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
        </div>

        <div className="space-y-8">
          {items.map((exp, index) => {
            const title = exp.title ?? exp.role ?? "Role"
            const company = exp.company ?? exp.organization ?? "Organization"
            const isCurrent =
              /present/i.test(exp.period ?? "") || /current/i.test(exp.status ?? "")
            const period = exp.period ?? ""
            const location = exp.location ?? ""
            const type = exp.type ?? ""
            const respArray =
              Array.isArray(exp.responsibilities)
                ? exp.responsibilities
                : typeof exp.responsibilities === "string"
                ? [exp.responsibilities]
                : Array.isArray(exp.bullets)
                ? exp.bullets
                : []

            return (
              <Card
                key={index}
                className={`p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm ${
                  isCurrent ? "ring-2 ring-red-600" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                        {isCurrent && (
                          <Badge className="ml-3 bg-green-100 text-green-700">Current</Badge>
                        )}
                      </div>

                      <div className="flex items-center mb-2">
                        <Building className="w-5 h-5 text-gray-500 mr-2" />
                        <p className="text-xl text-gray-700">{company}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                        {period && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {period}
                          </div>
                        )}
                        {location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {location}
                          </div>
                        )}
                        {type && <Badge variant="outline">{type}</Badge>}
                      </div>
                    </div>
                  </div>

                  {respArray.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {respArray.map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
