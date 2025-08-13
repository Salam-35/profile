import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github, BookOpen, ExternalLink } from "lucide-react"
import { 
  SiResearchgate,
  SiGooglescholar,
  SiLinkedin,
  SiGithub,
  SiMaildotru,
 } from "react-icons/si";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "salam35.ruet17@gmail.com",
    href: "mailto:salam35.ruet17@gmail.com",
  },
  // {
  //   icon: Phone,
  //   label: "Phone",
  //   value: "+8801791373638",
  //   href: "tel:+8801791373638",
  // },
  {
    icon: MapPin,
    label: "Location",
    value: "Rajshahi, Bangladesh",
    href: null,
  },
]

const socialLinks = [
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/salam-35/",
    color: "hover:text-blue-600",
  },
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com/Salam-35",
    color: "hover:text-gray-900",
  },
  {
    icon: SiGooglescholar,
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=JVu1U2EAAAAJ",
    color: "hover:text-blue-700",
  },
  {
    icon: SiResearchgate,
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Abdus-Salam-45",
    color: "hover:text-green-600",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interested in collaboration, research opportunities, or discussing AI innovations? I'd love to hear from
            you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect with me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-gray-100 text-gray-600 rounded-lg transition-colors ${link.color}`}
                        title={link.label}
                      >
                        <link.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Collaborate</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Research Collaboration</h4>
                    <p className="text-gray-700">
                      Open to collaborative research in AI, machine learning, computer vision, and biomedical
                      applications.
                    </p>
                  </div>

                  <div className="p-6 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Consulting & Development</h4>
                    <p className="text-gray-700">
                      Available for AI consulting and development of enterprise-grade machine learning solutions.
                    </p>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Speaking & Mentoring</h4>
                    <p className="text-gray-700">
                      Interested in speaking at conferences and mentoring aspiring AI researchers and engineers.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <a href="mailto:salam35.ruet17@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Send me an email
                  </a>
                </Button>
              </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* <div className="mt-16 text-center">
          <Card className="p-8 shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to innovate together?</h3>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're looking for research collaboration, AI consulting, or just want to discuss the latest
                developments in artificial intelligence, I'm always excited to connect with fellow researchers and
                innovators.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start a Conversation
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  )
}
