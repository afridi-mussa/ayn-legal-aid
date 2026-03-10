import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Trophy, ExternalLink, Star, GraduationCap, Target, Award, Heart, BookOpen } from "lucide-react"

export default function AmbassadorsPage() {
  const ambassadors = [
    {
      name: "Ahmed Hassan",
      university: "University of Punjab",
      city: "Lahore",
      year: "Final Year Law Student",
      achievements: ["Top Performer 2024", "Community Leader", "Debate Champion"],
      cases: 25,
      rating: 4.9,
      specialization: "Family Law",
      joinDate: "January 2024",
    },
    {
      name: "Fatima Khan",
      university: "Karachi University",
      city: "Karachi",
      year: "3rd Year Law Student",
      achievements: ["Rising Star", "Student Advocate", "Research Excellence"],
      cases: 18,
      rating: 4.8,
      specialization: "Corporate Law",
      joinDate: "March 2024",
    },
    {
      name: "Ali Raza",
      university: "LUMS",
      city: "Lahore",
      year: "Graduate",
      achievements: ["Innovation Award", "Mentor", "Leadership Excellence"],
      cases: 32,
      rating: 5.0,
      specialization: "Criminal Law",
      joinDate: "September 2023",
    },
    {
      name: "Zara Ahmed",
      university: "IBA Karachi",
      city: "Karachi",
      year: "2nd Year Law Student",
      achievements: ["Newcomer Award", "Community Impact"],
      cases: 12,
      rating: 4.7,
      specialization: "Property Law",
      joinDate: "June 2024",
    },
    {
      name: "Hassan Ali",
      university: "University of Islamabad",
      city: "Islamabad",
      year: "Final Year Law Student",
      achievements: ["Academic Excellence", "Pro Bono Champion"],
      cases: 28,
      rating: 4.9,
      specialization: "Constitutional Law",
      joinDate: "February 2024",
    },
    {
      name: "Ayesha Malik",
      university: "University of Peshawar",
      city: "Peshawar",
      year: "3rd Year Law Student",
      achievements: ["Regional Leader", "Women's Rights Advocate"],
      cases: 20,
      rating: 4.8,
      specialization: "Human Rights",
      joinDate: "April 2024",
    },
  ]

  const benefits = [
    {
      icon: GraduationCap,
      title: "Skill Development",
      description: "Gain practical legal experience through real cases and mentorship from experienced attorneys.",
    },
    {
      icon: Users,
      title: "Network Building",
      description: "Connect with legal professionals, fellow students, and build lasting professional relationships.",
    },
    {
      icon: Trophy,
      title: "Recognition & Awards",
      description: "Earn certificates, awards, and recognition for your contributions to the legal community.",
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Make a real difference in your community by helping those who need legal assistance most.",
    },
    {
      icon: BookOpen,
      title: "Learning Opportunities",
      description: "Access exclusive workshops, seminars, and training programs to enhance your legal knowledge.",
    },
    {
      icon: Target,
      title: "Career Advancement",
      description: "Build your resume with meaningful experience and potential job opportunities within our network.",
    },
  ]

  const requirements = [
    "Currently enrolled in a law program at a Pakistani university",
    "Minimum CGPA of 3.0 or equivalent",
    "Strong communication skills in English and Urdu",
    "Commitment to serve the community and promote access to justice",
    "Availability for at least 10 hours per week",
    "Passion for legal aid and social justice",
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Campus Ambassador Program
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Join our network of passionate law students making a difference in their communities. Become a bridge
              between legal expertise and student needs across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Current Ambassadors */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Meet Our Ambassadors</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dedicated law students from top universities across Pakistan leading change in their communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((ambassador, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{ambassador.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{ambassador.city}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{ambassador.university}</p>
                      <p className="text-sm text-muted-foreground">{ambassador.year}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{ambassador.cases}</div>
                        <div className="text-xs text-muted-foreground">Cases Helped</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-lg font-bold">{ambassador.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-card-foreground mb-2">Specialization</p>
                      <Badge variant="outline">{ambassador.specialization}</Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-card-foreground mb-2">Achievements</p>
                      <div className="flex flex-wrap gap-1">
                        {ambassador.achievements.map((achievement, achIndex) => (
                          <Badge key={achIndex} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                      Joined: {ambassador.joinDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Join Our Program?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of becoming an ambassador and how it can transform your legal career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Application Requirements</h2>
            <p className="text-xl text-muted-foreground">
              Make sure you meet these criteria before applying to our ambassador program.
            </p>
          </div>

          <Card>
            <CardContent className="pt-8">
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our ambassador program and become part of a movement that's transforming legal aid accessibility
              across Pakistani universities. Your journey to making a real impact starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="animate-pulse-green">
                <a
                  href="https://forms.gle/whaTsGAPppdkLxRf8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Apply Now <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://www.linkedin.com/company/ayn-legal-aid-club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Follow Us on LinkedIn <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
