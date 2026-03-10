import { Button } from "@/components/ui/button"
import { ExternalLink, Users, Heart } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 pb-32">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 bg-[url('/background-ayn.jpg')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-card/20 to-card pointer-events-none z-[5]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Justice for <span className="text-primary">All</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Professional legal services, non-profit advocacy, and a nationwide university club network. Empowering
            communities across Pakistan through accessible legal aid.
          </p>

          {/* Student Ambassador Section */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-6">
              <Users className="w-12 h-12 text-primary mb-4" />
              <div className="text-2xl font-bold text-foreground mb-3">Student Ambassadors</div>
              <div className="text-muted-foreground text-center mb-4 max-w-3xl">
                Our dedicated university ambassadors serve as the bridge between communities and legal aid, 
                organizing awareness campaigns, facilitating access to legal resources, and building a network 
                of support across campuses nationwide. They play a crucial role in making justice accessible 
                to all, one campus at a time.
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Our Services</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a
                href="https://www.linkedin.com/company/ayn-legal-aid-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Follow Us <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
