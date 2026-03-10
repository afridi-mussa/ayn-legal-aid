import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Home, Briefcase, Shield, GraduationCap, Scale, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      icon: FileText,
      title: "Legal Documentation",
      description: "Professional drafting of contracts, agreements, and legal documents with attention to detail.",
      features: ["Contract Drafting", "Legal Agreements", "Document Review"],
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Compassionate legal support for family matters including divorce, custody, and inheritance.",
      features: ["Divorce Proceedings", "Child Custody", "Inheritance Law"],
    },
    {
      icon: Home,
      title: "Property Law",
      description: "Expert guidance on property transactions, disputes, and real estate legal matters.",
      features: ["Property Disputes", "Real Estate Transactions", "Land Registration"],
    },
    {
      icon: Briefcase,
      title: "Tax Law",
      description: "Comprehensive support for tax planning,compliance and dispute resolution.",
      features: ["Tax Planning", "Audit Representation", "Returns Filling"],
    },
    {
      icon: Shield,
      title: "Criminal Defense",
      description: "Strong legal representation for criminal cases with experienced defense attorneys.",
      features: ["Criminal Defense", "Bail Applications", "Court Representation"],
    },
    {
      icon: GraduationCap,
      title: "Pro Bono Services",
      description: "Free legal aid for students, low-income families, and community organizations.",
      features: ["Student Legal Aid", "Community Support", "Free Consultations"],
    },
    {
      icon: Scale,
      title: "Civil Law",
      description: "Expert guidance on resolving disputes and legal matters between individuals or organizations.",
      features: ["Civil Litigation", "Personal Injury Claims", "Contract Disputes"],
    },
  ]

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Legal Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive legal solutions tailored to meet the diverse needs of individuals, businesses, and communities
            across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isLastCard = index === services.length - 1
            const isAloneInRow = isLastCard && services.length % 3 !== 0
            return (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isAloneInRow ? 'lg:col-start-2' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/contact">Get Legal Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
