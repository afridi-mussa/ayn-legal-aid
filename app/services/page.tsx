import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Users,
  Home,
  Briefcase,
  Shield,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Legal Documentation",
      description: "Professional drafting and review of legal documents with meticulous attention to detail.",
      features: [
        "Contract Drafting & Review",
        "Legal Agreements",
        "Document Verification",
        "Notarization Services",
        "Legal Translation",
      ],
      pricing: "Contact for pricing",
      
      category: "Documentation",
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Compassionate legal support for family matters with sensitivity and expertise.",
      features: [
        "Divorce Proceedings",
        "Child Custody Cases",
        "Inheritance & Succession",
        "Marriage Contracts",
        "Family Mediation",
      ],
      pricing: "Contact for pricing",
      
      category: "Family",
    },
    {
      icon: Home,
      title: "Property Law",
      description: "Expert guidance on property transactions and real estate legal matters.",
      features: [
        "Property Disputes",
        "Real Estate Transactions",
        "Land Registration",
        "Title Verification",
        "Property Documentation",
      ],
      pricing: "Contact for pricing",
      
      category: "Property",
    },
    {
      icon: Briefcase,
      title: "Corporate Law",
      description: "Comprehensive business legal services for startups and established companies.",
      features: [
        "Business Registration",
        "Corporate Compliance",
        "Commercial Contracts",
        "Intellectual Property",
        "Employment Law",
      ],
      pricing: "Contact for pricing",
      
      category: "Corporate",
    },
    {
      icon: Shield,
      title: "Criminal Defense",
      description: "Strong legal representation for criminal cases with experienced defense attorneys.",
      features: [
        "Criminal Defense",
        "Bail Applications",
        "Court Representation",
        "Legal Consultation",
        "Case Investigation",
      ],
      pricing: "Contact for pricing",
      
      category: "Criminal",
    },
    {
      icon: GraduationCap,
      title: "Pro Bono Services",
      description: "Free legal aid for students, low-income families, and community organizations.",
      features: [
        "Student Legal Aid",
        "Community Support",
        "Free Consultations",
        "Legal Awareness Programs",
        "Document Assistance",
      ],
      pricing: "Contact for pricing",
      
      category: "Pro Bono",
    },
  ]

  const process = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Schedule a consultation to discuss your legal needs and case details.",
    },
    {
      step: 2,
      title: "Case Assessment",
      description: "Our legal experts assess your case and provide a detailed action plan.",
    },
    {
      step: 3,
      title: "Legal Representation",
      description: "We handle your case with professional expertise and regular updates.",
    },
    {
      step: 4,
      title: "Resolution",
      description: "Achieve the best possible outcome with our dedicated legal support.",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Our Legal Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive legal solutions tailored to meet the diverse needs of individuals, businesses, and
              communities across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-2">Services Include:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="font-medium text-card-foreground">{service.pricing}</span>
                        </div>
                       
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach to handling your legal matters with transparency and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-primary mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Ready to Get Legal Help?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't let legal challenges overwhelm you. Our experienced team is here to provide the support and
            representation you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn About Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
