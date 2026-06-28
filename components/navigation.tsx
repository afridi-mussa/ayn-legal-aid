"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ExternalLink, ChevronDown, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ProfileMenu } from "@/components/profile-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false) // mobile dropdown
  const { user, loading, signOut } = useAuth()

  // Only render auth-dependent UI after mounting in the browser, so the
  // server HTML and the first client render match (avoids hydration errors).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const ready = mounted && !loading

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/ayn-logo.png"
              alt="Ayn Legal Aid & Club"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-foreground">Ayn Legal Aid & Club</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>

            {/* Desktop Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-foreground hover:text-primary transition-colors gap-1">
                Services <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute left-0 top-full mt-2 w-56 bg-card border border-border rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/services"
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
                >
                  Litigation Services
                </Link>
                <Link
                  href="/cyberSecurity-services"
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
                >
                  Cyber Analysis
                </Link>
                <Link
                  href="/tax-advisory"
                  className="block px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
                >
                  Tax Advisory & Filing
                </Link>
                <Link
                      href="/corporate-law"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Corporate law & Advisory
                    </Link>
              </div>
            </div>

            <a href="/#ambassadors" className="text-foreground hover:text-primary transition-colors scroll-smooth">
              Ambassadors
            </a>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>

            {/* Auth controls (desktop) */}
            {ready && (
              user ? (
                <ProfileMenu />
              ) : (
                <Link href="/login">
                  <Button size="sm">Log in</Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile: menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {/* Profile at the top when logged in */}
              {ready && user && (
                <div className="mb-2 pb-2 border-b border-border">
                  <ProfileMenu variant="row" />
                </div>
              )}

              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center w-full justify-between px-3 py-2 text-foreground hover:text-primary transition-colors"
                >
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-6 space-y-1">
                    <Link
                      href="/services"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Litigation Services
                    </Link>
                    <Link
                      href="/cyberSecurity-services"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Cyber Analysis
                    </Link>
                    <Link
                      href="/tax-advisory"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Tax Advisory and Filing
                    </Link>
                    <Link
                      href="/corporate-law"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Corporate law & Advisory
                    </Link>
                  </div>
                )}
              </div>

              <a
                href="/#ambassadors"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Ambassadors
              </a>
              <Link
                href="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Auth controls (mobile) */}
              {ready && !user && (
                <div className="px-3 py-2 border-t border-border mt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full">Log in</Button>
                  </Link>
                </div>
              )}
              {ready && user && (
                <div className="px-3 py-2 border-t border-border mt-2">
                  <Button
                    size="sm"
                    className="w-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all"
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}