import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/ayn-logo.png"
                alt="Ayn Legal Aid & Club"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg font-bold text-card-foreground">Ayn Legal Aid & Club</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional legal services a nationwide lawyers’ nexus and student representatives across educational institutes. Empowering communities throughout Pakistan with accessible, reliable legal support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/ambassadors"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Ambassadors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Legal Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">Family Law</li>
              <li className="text-muted-foreground text-sm">Property Law</li>
              <li className="text-muted-foreground text-sm">Corporate Law</li>
              <li className="text-muted-foreground text-sm">Criminal Defense</li>
              <li className="text-muted-foreground text-sm">Pro Bono Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                info@aynlegalaid.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4" />
                +92 339 3383379
              </li>
              
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2024 Ayn Legal Aid & Club. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/ayn-legal-aid-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >

              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
