import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Heart, Users, Target, Eye, Handshake } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Barrister Sarah Ahmed",
      role: "Founder & Managing Partner",
      experience: "15+ years",
      specialization: "Constitutional Law",
      education: "LLM from Oxford University",
    },
    {
      name: "Advocate Muhammad Ali",
      role: "Senior Partner",
      experience: "12+ years",
      specialization: "Corporate & Commercial Law",
      education: "LLB from Punjab University",
    },
    {
      name: "Dr. Fatima Khan",
      role: "Head of Pro Bono Services",
      experience: "10+ years",
      specialization: "Human Rights Law",
      education: "PhD in Law from LUMS",
    },
  ]

  const values = [
    {
      icon: Scale,
      title: "Justice",
      description: "We believe in equal access to justice for all, regardless of economic status or social background.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every case with empathy and understanding, recognizing the human element in legal matters.",
    },
    {
      icon: Handshake,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our professional dealings and client relationships.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in legal representation and continuously improve our services.",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              About Ayn Legal Aid & Club
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Bridging the gap between legal expertise and community needs through innovative approaches to legal aid
              and education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-card-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To democratize access to legal services by combining professional expertise with community outreach,
                creating a sustainable ecosystem where legal aid is accessible, affordable, and effective for all
                segments of society.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We achieve this through our unique three-pillar approach: operating as a professional law firm, a
                non-profit organization, and a university club network that nurtures the next generation of legal
                professionals.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-card-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To create a Pakistan where every individual, regardless of their economic status, has access to quality
                legal representation and where young legal minds are empowered to serve their communities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where legal aid is not a privilege but a fundamental right, supported by a network
                of passionate advocates working across universities and communities nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every case we handle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced legal professionals dedicated to making justice accessible for all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <Badge variant="secondary" className="mb-4">
                      {member.experience}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-foreground text-sm">Specialization</h4>
                      <p className="text-muted-foreground text-sm">{member.specialization}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground text-sm">Education</h4>
                      <p className="text-muted-foreground text-sm">{member.education}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect our commitment to accessible legal aid across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">University Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
