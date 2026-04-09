"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Users, Globe, Link2, FileText, Repeat, Scale, Clock } from "lucide-react"
import Link from "next/link"

export default function CompanyRegistrationPage() {
  const services = [
    {
      icon: Building,
      title: "SECP Company Registration & Incorporation",
      description: "Private Limited, Single Member, Public Ltd, name reservation, MoA/AoA drafting, full incorporation.",
      category: "Registration",
    },
    {
      icon: Users,
      title: "Partnership Firm & AOP Registration",
      description: "Registration with Registrar of Firms, Association of Persons setup, and related documentation.",
      category: "Registration",
    },
    {
      icon: Globe,
      title: "Branch / Liaison / Foreign Company Registration",
      description: "Support for foreign entities setting up operations in Pakistan.",
      category: "Registration",
    },
    {
      icon: Link2,
      title: "Post-Incorporation Compliance & FBR Linkage",
      description: "Obtaining NTN, GST/STRN, business bank account facilitation, and initial FBR onboarding.",
      category: "Compliance",
    },
    {
      icon: FileText,
      title: "Corporate Secretarial Services",
      description: "Annual filings, board resolutions, share transfers, director changes, authorized capital increase.",
      category: "Compliance",
    },
    {
      icon: Repeat,
      title: "Corporate Structuring & Restructuring",
      description: "Advice on best structure, mergers, demergers, acquisitions, and conversions.",
      category: "Advisory",
    },
    {
      icon: Scale,
      title: "Corporate Governance & Advisory",
      description: "Shareholder agreements, director duties, compliance manuals, ongoing corporate law advice.",
      category: "Advisory",
    },
    {
      icon: FileText,
      title: "SECP Filings & Amendments",
      description: "MoA/AoA amendments, change of name/address, other regulatory filings.",
      category: "Compliance",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-background text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Company Registration & Corporate Advisory Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SECP Registration • Corporate Compliance • Business Structuring
          </p>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            From Pvt Ltd to Foreign Company setup — complete end-to-end corporate solutions in Pakistan.
          </p>
        </div>
      </section>

      {/* Introduction */}
     

      {/* Services Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const IconComponent = service.icon
            return (
              <Card key={idx} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 text-foreground">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick Package CTA */}
      <section className="py-16 bg-card text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quick Company Registration Package</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Pvt Ltd / SMC in just 7–10 days • Complete end-to-end support
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 py-5">
            <Link href="/contact">Get Your Company Registered Today</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Why Choose Ayn Legal Aid for Corporate Matters</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Scale className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h4 className="font-semibold text-foreground">SECP & FBR Compliant</h4>
            <p className="text-muted-foreground">100% legal and up-to-date with Companies Act 2017</p>
          </div>
          <div>
            <Clock className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h4 className="font-semibold text-foreground">Fast Turnaround</h4>
            <p className="text-muted-foreground">Most companies registered within 7–10 working days</p>
          </div>
          <div>
            <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h4 className="font-semibold text-foreground">End-to-End Support</h4>
            <p className="text-muted-foreground">From name reservation to ongoing compliance</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-card text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Register Your Company?</h2>
        <p className="text-xl text-muted-foreground mb-8">Get expert guidance and complete support from Ayn Legal Aid & Club</p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 py-5">
          <Link href="https://aynlegalaid.com/contact">Book Your Free Consultation Now</Link>
        </Button>
      </section>

      <Footer />
    </main>
  )
}