// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { GraduationCap, Calendar, Award } from "lucide-react"

// const education = [
//   {
//     degree: "MSc Engg. in Computer Science & Engineering",
//     institution: "Rajshahi University of Engineering & Technology",
//     period: "2023 – Present",
//     expectedCompletion: "March 2025",
//     cgpa: "3.50",
//     status: "current",
//     courses: [
//       "Machine Learning",
//       "Advanced Artificial Intelligence",
//       "Biometrics",
//       "Advanced Image Processing",
//       "Software Project Management",
//     ],
//   },
//   {
//     degree: "BSc in Electrical & Computer Engineering",
//     institution: "Rajshahi University of Engineering & Technology",
//     period: "2018 – 2023",
//     cgpa: "3.42",
//     yearlyGPA: ["3.83", "3.65", "3.69", "3.73"],
//     status: "completed",
//     courses: [
//       "Computer Programming",
//       "Software Engineering",
//       "Time Series Analysis",
//       "Computer Networks & Architecture",
//       "Neural Networks & Machine Learning",
//     ],
//   },
// ]

// export function Education() {
//   return (
//     <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Education</h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
//         </div>

//         <div className="space-y-8">
//           {education.map((edu, index) => (
//             <Card
//               key={index}
//               className={`p-8 shadow-lg border border-slate-200 bg-white hover:shadow-xl hover:scale-99 transition-all duration-300 transform ${
//                 edu.status === "current" ? "ring-2 ring-blue-200" : ""
//               }`}
//             >
//               <CardContent className="p-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
//                   <div className="flex-1">
//                     <div className="flex items-center mb-2">
//                       <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
//                       <h3 className="text-2xl font-bold text-slate-900">{edu.degree}</h3>
//                       {edu.status === "current" && <Badge className="ml-3 bg-green-100 text-green-700">Current</Badge>}
//                     </div>
//                     <p className="text-xl text-slate-700 mb-2">{edu.institution}</p>
//                     <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {edu.period}
//                       </div>
//                       {edu.expectedCompletion && (
//                         <div className="flex items-center">
//                           <Award className="w-4 h-4 mr-2" />
//                           Expected: {edu.expectedCompletion}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="lg:text-right">
//                     {/* <div className="text-3xl font-bold text-blue-600 mb-2">{edu.cgpa}</div> */}
//                     {/* <div className="text-slate-600">CGPA</div> */}
                    
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-slate-900 mb-3">Relevant Courses:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {edu.courses.map((course, courseIndex) => (
//                       <Badge
//                         key={courseIndex}
//                         variant="secondary"
//                         className="text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
//                       >
//                         {course}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


// components/education.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, Award } from "lucide-react"
import profile from "@/data/profile.json" // <- JSON source

type EducationItem = {
  degree: string
  institution: string
  period: string
  status?: string // e.g., "Expected Completion: March 2025"
  cgpa?: string
  logo?: string
  courses?: string[]
}

const education: EducationItem[] = (profile as any)?.education ?? []

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Education</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => {
            // Derive "expected completion" (if present) from the JSON's status field
            const expectedMatch = edu.status?.match(/Expected Completion:\s*(.+)/i)
            const expectedCompletion = expectedMatch ? expectedMatch[1] : undefined

            // Consider current vs completed by looking at "period" text (e.g., "2023–Present")
            const isCurrent =
              /present/i.test(edu.period || "") || /current/i.test(edu.status || "")

            return (
              <Card
                key={index}
                className={`p-8 shadow-lg border border-slate-200 bg-white hover:shadow-xl hover:scale-99 transition-all duration-300 transform ${
                  isCurrent ? "ring-2 ring-red-600" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Logo Section */}
                      {edu.logo && (
                        <div className="flex-shrink-0">
                          <img
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            className="w-25 h-25 object-contain rounded-lg border border-slate-200 bg-white p-1"
                          />
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                          <h3 className="text-2xl font-bold text-slate-900">{edu.degree}</h3>
                          {isCurrent && (
                            <Badge className="ml-3 bg-green-100 text-green-700">Ongoing</Badge>
                          )}
                        </div>

                        <p className="text-xl text-slate-700 mb-2">{edu.institution}</p>

                        <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {edu.period}
                          </div>

                          {expectedCompletion && (
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-2" />
                              Expected: {expectedCompletion}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CGPA Section - commented out as in original */}
                    {/* <div className="lg:text-right">
                      {edu.cgpa && (
                        <div>
                          <div className="text-3xl font-bold text-blue-600 mb-1">{edu.cgpa}</div>
                          <div className="text-slate-600">CGPA</div>
                        </div>
                      )}
                    </div> */}
                  </div>

                  {edu.courses?.length ? (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Relevant Courses:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, courseIndex) => (
                          <Badge
                            key={courseIndex}
                            variant="secondary"
                            className="text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
