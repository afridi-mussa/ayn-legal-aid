"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Linkedin, Mail, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Ambassador } from "@/lib/ambassadors-data"

interface SocialLink {
  iconName: "linkedin" | "email"
  url?: string
  label: string
  color: string
}

interface AmbassadorProfileClientProps {
  ambassador: Ambassador
  socialLinks: SocialLink[]
}

// Icon mapping
const iconMap = {
  linkedin: Linkedin,
  email: Mail,
}

export function AmbassadorProfileClient({ ambassador, socialLinks }: AmbassadorProfileClientProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Main Content - Centered Layout */}
      <section className="pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Button 
              variant="ghost" 
              asChild
              className="text-gray-600 hover:text-primary"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Profile Content - Centered */}
          <div className="text-center">
            {/* Profile Picture */}
            <div className={`mb-8 flex justify-center transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative group">
                {/* Subtle shadow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Profile image */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={ambassador.image}
                    alt={ambassador.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Name */}
            <div className={`mb-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {ambassador.name}
              </h1>
            </div>

            {/* Role */}
            <div className={`mb-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-xl md:text-2xl text-primary font-semibold">
                Campus Ambassador
              </p>
            </div>

            {/* University and City */}
            <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg text-gray-600">
                {ambassador.university}
                {ambassador.location && ` • ${ambassador.location}`}
              </p>
            </div>

            {/* Quote */}
            <div className={`mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Card className="p-8 bg-gray-50 border-gray-200 shadow-sm">
                <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
                  "{ambassador.tagline}"
                </p>
              </Card>
            </div>

            {/* Divider */}
            <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />

            {/* About Section */}
            <div className={`mb-12 text-left transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                About
              </h2>
              <Card className="p-8 shadow-sm border-gray-200">
                <p className="text-lg text-white leading-relaxed">
                  {ambassador.bio}
                </p>
                
                {/* Additional Info */}
                {ambassador.joinDate && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                        Member Since
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {ambassador.joinDate}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>

                    {/* Social Media Links */}
                    {socialLinks.length > 0 && (
                      <div className={`mb-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                          Connect
                        </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {socialLinks.map((social, index) => {
                    const Icon = iconMap[social.iconName]
                    const href = social.iconName === 'email' ? `mailto:${social.url}` : social.url
                    return (
                      <a
                        key={social.label}
                        href={href}
                        target={social.iconName === 'email' ? undefined : "_blank"}
                        rel={social.iconName === 'email' ? undefined : "noopener noreferrer"}
                        className={`group relative w-14 h-14 rounded-full bg-gray-100 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
                        
                        {/* Tooltip */}
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                          {social.label}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

      </div>
      </div>
      </section>
      </>  
  )
}
export default AmbassadorProfileClient;