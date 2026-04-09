"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    FileText,
    Shield,
    Users,
    Briefcase,
    GraduationCap,
    ArrowRight,
    CheckCircle,
    Clock,
    DollarSign
} from "lucide-react"
import Link from "next/link"

export default function CyberSecurityServicesPage() {
    const services = [
        {
            icon: Shield,
            title: "Cyber Harassment & Online Abuse Investigation",
            description:
                "Investigation of cyber harassment, stalking, and online abuse with evidence collection and analysis.",
            features: [
                "Investigation of cyber harassment or stalking",
                "Identification of fake or anonymous social media accounts",
                "Analysis of harassment patterns",
                "Evidence collection from social media, chats, and emails",
                "Verification of threatening messages"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: FileText,
            title: "Social Media Account Hacking Investigation",
            description:
                "Identify account compromise methods and provide guidance for recovery and security.",
            features: [
                "Investigation of hacked social media accounts",
                "Identifying compromise methods (phishing, password reuse, malware)",
                "Log and activity analysis",
                "Evidence preparation for legal action",
                "Guidance for account recovery and securing accounts"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: Users,
            title: "Email Account Compromise Investigation",
            description:
                "Analyze suspicious login activity and prepare evidence for legal cases.",
            features: [
                "Investigation of hacked email accounts (Gmail, Outlook, etc.)",
                "Analysis of suspicious login activity",
                "Identification of phishing or credential theft",
                "Evidence preparation for legal cases",
                "Recovery and security recommendations"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: Briefcase,
            title: "Identity Theft Investigation",
            description:
                "Track impersonation activities and collect evidence for legal proceedings.",
            features: [
                "Investigation of fake profiles using a victim's identity",
                "Tracking impersonation activities",
                "Evidence collection for legal proceedings",
                "Analysis of identity misuse across platforms"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: GraduationCap,
            title: "Digital Evidence Verification",
            description:
                "Verify screenshots, metadata, and timestamps to ensure authenticity of digital records.",
            features: [
                "Verification of screenshot authenticity",
                "Detection of image editing or manipulation",
                "Metadata examination",
                "Validation of message timestamps",
                "Authenticity checks for digital records"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: Shield,
            title: "Device Compromise Investigation",
            description:
                "Analyze suspicious device activity and recommend security measures.",
            features: [
                "Investigation of suspicious device activity",
                "Detection of spyware or malicious programs",
                "Analysis of suspicious network activity",
                "Identification of possible compromise indicators",
                "Recommendations for securing devices"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: FileText,
            title: "Phishing & Online Fraud Investigation",
            description:
                "Investigate phishing and online fraud, prepare documentation for complaints.",
            features: [
                "Investigation of phishing emails or messages",
                "Analysis of fraudulent websites",
                "Tracking scammer infrastructure (basic OSINT)",
                "Evidence preparation for cybercrime complaints",
                "Documentation of fraud activity"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: Users,
            title: "Data Leak & Privacy Breach Investigation",
            description:
                "Identify data leaks, monitor exposure, and document evidence for legal action.",
            features: [
                "Investigation of leaked personal data",
                "Identifying potential breach sources",
                "Monitoring exposure on public platforms",
                "Evidence documentation for legal action"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: Briefcase,
            title: "Cybercrime Case Technical Support",
            description:
                "Provide technical reports and consultation for cyber incident documentation.",
            features: [
                "Technical explanation of incidents",
                "Preparation of technical reports",
                "Support in legal documentation",
                "Technical consultation for complaints"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: GraduationCap,
            title: "OSINT Based Investigation",
            description:
                "Track digital footprints and attacker activity across platforms using open-source intelligence.",
            features: [
                "Open Source Intelligence investigations",
                "Tracking digital footprints",
                "Finding connections between online identities",
                "Mapping attacker activity across platforms"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
        {
            icon: Shield,
            title: "Personal Digital Security Advisory",
            description:
                "Assess personal account safety and provide guidance for protection against online threats.",
            features: [
                "Security assessment of personal accounts",
                "Password security and MFA setup",
                "Social media privacy configuration",
                "Protection against phishing and scams",
                "Digital footprint reduction guidance"
            ],
            pricing: "Contact for pricing",
            duration: "Varies by case",
            category: "Cyber Analysis",
        },
    ]

    const process = [
        {
            step: 1,
            title: "Initial Consultation",
            description: "Schedule a consultation to discuss your digital safety concerns."
        },
        {
            step: 2,
            title: "Investigation & Analysis",
            description: "We investigate incidents and collect technical evidence."
        },
        {
            step: 3,
            title: "Reporting & Documentation",
            description: "Prepare detailed reports for legal or advisory purposes."
        },
        {
            step: 4,
            title: "Resolution & Advisory",
            description: "Provide guidance to secure accounts and prevent future incidents."
        },
    ]

    return (
        <main className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                        Cyber Analysis Services
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                        Comprehensive digital threat analysis, investigation, and advisory services for individuals and organizations,
                        ensuring your digital safety and privacy.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-card-foreground mb-2">
                                                Services Include:
                                            </h4>
                                            <ul className="space-y-1">
                                                {service.features.map((feature, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                                    >
                                                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="border-t border-border pt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                <span className="font-medium text-card-foreground">
                                                    {service.pricing}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="w-4 h-4 text-primary" />
                                                <span className="text-muted-foreground">
                                                    {service.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Our Process
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                        Structured approach to digital threat analysis, investigations, reporting, and advisory for individuals and organizations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {process.map((step, index) => (
                            <div key={index} className="text-center relative">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary-foreground">
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-card text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                        Need Assistance?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Protect your digital presence. Our experts provide investigation, technical support, and advisory services to safeguard your online accounts.
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