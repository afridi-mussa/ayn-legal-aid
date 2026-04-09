"use client";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { FaCalculator, FaRocket } from "react-icons/fa";
import TaxCalculator from "@/components/TaxCalculator";
import Link from "next/link";

export default function TaxPage() {
  return (
    <main className="min-h-screen bg-background">
        <Navigation/>

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tax Advisory & Filing
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Expert Income Tax • Sales Tax • FBR Compliance • Strategic Tax Planning
          </p>

          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional tax services in Pakistan — hassle-free filing, audits, appeals & strategic advice for individuals, businesses & startups.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="#calculator"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2"
            >
              <FaCalculator /> Calculate Your Tax Now
            </a>

            <Link href="/contact">
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-lg h-[72px] flex items-center"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick File Section */}
      <section className="py-14 bg-card border-b border-border text-center">
        <div className="max-w-6xl mx-auto px-6">
          <a
            href="#calculator"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-bold px-10 py-5 rounded-lg shadow-sm transition-all"
          >
            <FaRocket className="text-2xl" />
            QUICK FILE YOUR INCOME TAX RETURNS WITH AYN
          </a>

          <p className="text-sm text-muted-foreground mt-4">
            Fast • Accurate • Fully IRIS Compliant • Start in 60 seconds
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Professional Tax Solutions You Can Trust
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Ayn Legal Aid & Club, we simplify Pakistan’s complex tax system.
            From annual Income Tax Returns and GST filings to FBR audits, notices,
            and strategic planning — our experienced tax lawyers handle everything
            so you can focus on growth.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Tax Advisory & Compliance Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[  
              { title: "Income Tax Return Filing & Compliance", desc: "Annual, revised, and late filings via IRIS portal with wealth statement prep." },
              { title: "Sales Tax (GST)", desc: "STRN registration, GST returns, and full compliance." },
              { title: "Tax Registration", desc: "NTN registration, ATL assistance, and FBR profile setup." },
              { title: "Tax Planning", desc: "Strategic tax structuring and optimization of deductions." },
              { title: "WHT Compliance", desc: "Withholding tax statements and filings." },
              { title: "International Tax", desc: "Cross-border taxation and expatriate advisory." },
              { title: "Audits & Notices", desc: "Handling FBR notices, audits, and appeals." },
              { title: "Tax Litigation", desc: "Representation in courts and tribunals." },
              { title: "Due Diligence", desc: "Tax health checks and compliance reviews." }
            ].map((service, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Annual Income Tax Return Filing
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            File your ITR in minutes — stress-free, accurate, and fully FBR compliant.
          </p>

          <div className="bg-card border border-border rounded-lg p-10 mt-10 grid md:grid-cols-4 gap-8">
            {["Share Documents", "We Prepare", "You Approve", "Filed via IRIS"].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <CheckCircle className="w-10 h-10 text-primary" />
                <p className="text-card-foreground text-sm md:text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
       
      {/* Calculator */}
      <section id="calculator" className="py-16 bg-card text-center">
        <div className="max-w-4xl mx-auto px-6">
          <TaxCalculator/>
        </div>
      </section>

     

      <Footer/>
    </main>
  );
}