"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, ExternalLink, Instagram } from "lucide-react"

export function ContactSection() {
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Legal Consultation Request")
    const body = encodeURIComponent(`Hello Ayn Legal Aid & Club,

I would like to inquire about your legal services. Please contact me at your earliest convenience.

Best regards,`)

    window.location.href = `mailto:info@aynlegalaid.com?subject=${subject}&body=${body}`
  }

  const handleSupportEmailClick = () => {
    const subject = encodeURIComponent("Support Request")
    const body = encodeURIComponent(`Hello Support Team,

I need assistance with:

Please contact me back.

Thank you,`)

    window.location.href = `mailto:support@aynlegalaid.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ready to get legal help or join our mission? We're here to assist you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <button
                      onClick={handleEmailClick}
                      className="text-primary hover:text-primary/80 underline transition-colors"
                    >
                      aynlegalaid.club@gmail.com
                    </button>
                    <br />
                    
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a
                      href="tel:+923393383379"
                      className="text-primary hover:text-primary/80 underline transition-colors"
                    >
                      +92 339 3383379
                    </a>
                    <br />

                  </div>
                </div>



                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Office Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                  <a
                    href="https://www.instagram.com/aynlegalaid.club?igsh=ZmU2anltMjhoYXB1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    Follow on Instagram
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                  <a
                    href="https://www.facebook.com/share/1Cs7JPENZu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Follow on Facebook
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                  <a
                    href="https://www.linkedin.com/company/ayn-legal-aid-club/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Follow on LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us Directly</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Choose the best way to reach us for your legal needs</p>

                <div className="space-y-4">
                  <Button onClick={handleEmailClick} className="w-full" size="lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email for Legal Consultation
                  </Button>

                  <Button
                    onClick={handleSupportEmailClick}
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Support Team
                  </Button>


                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-foreground mb-3">Emergency Legal Help</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  For urgent legal matters, call us directly or send an email with "URGENT" in the subject line.
                </p>
                <Button
                  onClick={() => {
                    const subject = encodeURIComponent("URGENT: Legal Emergency")
                    const body = encodeURIComponent(`URGENT LEGAL MATTER

Please contact me immediately regarding:

My contact number: 
Best time to call: 

This is an urgent matter requiring immediate attention.`)

                    window.location.href = `mailto:info@aynlegalaid.com?subject=${subject}&body=${body}`
                  }}
                  variant="destructive"
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Emergency Legal Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
