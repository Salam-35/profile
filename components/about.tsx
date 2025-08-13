// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { Brain, Microscope, Cpu, Shield, Camera, Leaf, Signal, Database } from "lucide-react"
// import { useEffect, useState } from "react"

// const iconMap = {
//   "Artificial Intelligence": Brain,
//   "Machine Learning": Cpu,
//   "Computer Vision": Camera,
//   BioMedical: Microscope,
//   "Image Processing": Database,
//   "Smart Agriculture": Leaf,
//   "Cyber Security": Shield,
//   "Signal Processing": Signal,
// }

// interface AboutData {
//   title: string
//   description: string
//   interests: string[]
// }

// interface ProfileData {
//   name: string
//   image: string
// }

// export function About() {
//   const [aboutData, setAboutData] = useState<AboutData | null>(null)
//   const [profile, setProfile] = useState<ProfileData | null>(null)

//   useEffect(() => {
//     fetch("@/data/profile.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setAboutData(data.about)
//         setProfile(data.personal)
//       })
//       .catch(() => {
//         setAboutData({
//           title: "About Me",
//           description:
//             "I'm driven by innovation, continuous learning, and collaboration in research-oriented environments.",
//           interests: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "BioMedical"],
//         })
//         setProfile({
//           name: "Abdus Salam",
//           image: "/ai-researcher-headshot.png",
//         })
//       })
//   }, [])

//   if (!aboutData || !profile) return null

//   return (
//     <section id="about" className="px-6 lg:px-12 py-8 lg:py-12">
//       {/* Mobile profile image */}
//       <div className="lg:hidden text-center mb-8">
//         <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 p-1 shadow-lg">
//           <img
//             src={profile?.image || "/placeholder.svg"}
//             alt={profile?.name || "Profile"}
//             className="w-full h-full rounded-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Section header */}
//       <div className="mb-8 text-center lg:text-left">
//         <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">About Me</h2>
//         <div className="w-12 h-1 bg-blue-600 mx-auto lg:mx-0"></div>
//       </div>

//       {/* Main content card */}
//       <Card className="shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
//         <CardContent className="p-6 lg:p-8 space-y-6">
//           {/* About description */}
          // <div className="space-y-4">
          //   <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
          //     I am <span className="font-semibold text-blue-600">Abdus Salam</span>, a Software Engineer specializing in Artificial Intelligence at 
          //     <span className="font-semibold text-black-600"> MyMedicalHub International Ltd.</span> and a 
          //     <span className="font-semibold text-green-600"> Research Assistant at Qatar University</span>. 
          //     I design and develop AI-driven solutions for healthcare, while also advancing research in medical image analysis and smart agriculture.
          //   </p>
            
          //   <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
          //     I hold a <span className="font-semibold">B.Sc. in Electrical & Computer Engineering</span> from Rajshahi University of Engineering & Technology (RUET), 
          //     where I built a strong foundation in computer programming, neural networks, and machine learning. 
          //     I am currently pursuing an <span className="font-semibold">M.Sc. in Computer Science & Engineering</span> at RUET, 
          //     focusing on advanced artificial intelligence, biometrics, and image processing, with expected completion in March 2025.
          //   </p>
            
          //   <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
          //     My research interests span Artificial Intelligence, Machine Learning, Computer Vision, Biomedical Imaging, Smart Agriculture, 
          //     and Explainable AI. I have co-authored multiple peer-reviewed publications in IEEE Access, Frontiers in Plant Science, and 
          //     the International Journal of Imaging Systems and Technology.
          //   </p>
            
          //   <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
          //     Outside of my professional and academic work, I have a strong background in competitive programming, 
          //     achieving top rankings in national contests. This problem-solving mindset drives my approach to building 
          //     innovative, practical, and impactful AI solutions.
          //   </p>
          // </div>


//           {/* Research interests */}
//           <div className="pt-6 border-t border-slate-200">
//             <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">Research Interests</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//               {[
//                 "Artificial Intelligence",
//                 "Machine Learning",
//                 "Computer Vision",
//                 "BioMedical",
//                 "Image Processing",
//                 "Smart Agriculture",
//                 "Cyber Security",
//                 "Signal Processing",
//               ].map((interest, index) => {
//                 const IconComponent = iconMap[interest as keyof typeof iconMap] || Brain
//                 return (
//                   <div
//                     key={index}
//                     className="flex items-center space-x-2 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors duration-200 group"
//                   >
//                     <IconComponent className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
//                     <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800">
//                       {interest}
//                     </span>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </section>
//   )
// }


// components/about.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Microscope, Cpu, Shield, Camera, Leaf, Signal, Database } from "lucide-react"
import profile from "@/data/profile.json"

const iconMap = {
  "Artificial Intelligence": Brain,
  "Machine Learning": Cpu,
  "Computer Vision": Camera,
  BioMedical: Microscope,
  "Image Processing": Database,
  "Smart Agriculture": Leaf,
  "Cyber Security": Shield,
  "Signal Processing": Signal,
}

type AboutData =
  | {
      title?: string
      description?: string | string[]
      interests?: string[]
    }
  | undefined

type ProfileData =
  | {
      name?: string
      image?: string
    }
  | undefined

export function About() {
  const aboutData = (profile as any)?.about as AboutData
  const personal = (profile as any)?.personal as ProfileData

  const name = personal?.name ?? "Abdus Salam"
  const image = personal?.image ?? "/placeholder.svg"
  const title = aboutData?.title ?? "About Me"
  const paragraphs = Array.isArray(aboutData?.description)
    ? (aboutData?.description as string[])
    : aboutData?.description
    ? [aboutData?.description as string]
    : [
        "I'm driven by innovation, continuous learning, and collaboration in research-oriented environments.",
      ]
  const interests =
    aboutData?.interests && aboutData.interests.length > 0
      ? aboutData.interests
      : [
          "Artificial Intelligence",
          "Machine Learning",
          "Computer Vision",
          "BioMedical",
          "Image Processing",
          "Smart Agriculture",
          "Cyber Security",
          "Signal Processing",
        ]

  return (
    <section id="about" className="px-6 lg:px-12 py-8 lg:py-12">
      {/* Mobile profile image */}
      <div className="lg:hidden text-center mb-8">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 p-1 shadow-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Section header */}
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
        <div className="w-12 h-1 bg-blue-600 mx-auto lg:mx-0"></div>
      </div>

      {/* Main content card */}
      <Card className="shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 lg:p-8 space-y-6">
          {/* About description */}
          
          <div className="space-y-4">
            <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
              I am <span className="font-semibold text-blue-600">Abdus Salam</span>, a Software Engineer specializing in Artificial Intelligence at 
              <span className="font-semibold text-black-600"> MyMedicalHub International Ltd.</span> and a 
              <span className="font-semibold text-green-600"> Research Assistant at Qatar University</span>. 
              I design and develop AI-driven solutions for healthcare, while also advancing research in medical image analysis and smart agriculture.
            </p>
            
            <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
              I hold a <span className="font-semibold">B.Sc. in Electrical & Computer Engineering</span> from Rajshahi University of Engineering & Technology (RUET), 
              where I built a strong foundation in computer programming, neural networks, and machine learning. 
              I am currently pursuing an <span className="font-semibold">M.Sc. in Computer Science & Engineering</span> at RUET, 
              focusing on advanced artificial intelligence, biometrics, and image processing, with expected completion in March 2025.
            </p>
            
            <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
              My research interests span Artificial Intelligence, Machine Learning, Computer Vision, Biomedical Imaging, Smart Agriculture, 
              and Explainable AI. I have co-authored multiple peer-reviewed publications in IEEE Access, Frontiers in Plant Science, and 
              the International Journal of Imaging Systems and Technology.
            </p>
            
            <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
              Outside of my professional and academic work, I have a strong background in competitive programming, 
              achieving top rankings in national contests. This problem-solving mindset drives my approach to building 
              innovative, practical, and impactful AI solutions.
            </p>
          </div>

          {/* Research interests */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">Research Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {interests.map((interest, index) => {
                const IconComponent =
                  iconMap[interest as keyof typeof iconMap] ?? Brain
                return (
                  <div
                    key={`${interest}-${index}`}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors duration-200 group"
                  >
                    <IconComponent className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-800">
                      {interest}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
