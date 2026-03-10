"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, Scale } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ambassadorsData } from "@/lib/ambassadors-data"

export function AmbassadorSection() {
  // Use the shared ambassadors data
  const ambassadors = ambassadorsData

  // Triple ambassadors for seamless infinite scroll
  const duplicatedAmbassadors = [...ambassadors, ...ambassadors, ...ambassadors]
  
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const autoScrollRef = useRef<number>()
  const isUserScrollingRef = useRef(false)
  const userScrollTimeoutRef = useRef<NodeJS.Timeout>()
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const wheelAnimationRef = useRef<number>()
  const targetScrollRef = useRef(0)
  const currentScrollRef = useRef(0)

  // Initialize scroll position to middle set on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      // Start at the beginning of the second set (middle of tripled array)
      const oneSetWidth = container.scrollWidth / 3
      container.scrollLeft = oneSetWidth
      
      // Initialize smooth scroll refs
      currentScrollRef.current = oneSetWidth
      targetScrollRef.current = oneSetWidth
    }
  }, [])

  // Auto-scroll animation
  useEffect(() => {
    const animate = () => {
      if (!isPaused && !isUserScrollingRef.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current
        
        // Auto-scroll at constant speed (1px per frame = smooth movement)
        container.scrollLeft += 1

        // Calculate the width of one complete set (total width / 3 since we have 3 copies)
        const oneSetWidth = container.scrollWidth / 3
        
        // Reset to the start of second set when we finish the second set
        // This creates seamless infinite loop
        if (container.scrollLeft >= oneSetWidth * 2) {
          container.scrollLeft = oneSetWidth
        }
      }
      autoScrollRef.current = requestAnimationFrame(animate)
    }

    autoScrollRef.current = requestAnimationFrame(animate)

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [isPaused])

  // Smooth wheel scrolling with easing
  useEffect(() => {
    const smoothScroll = () => {
      if (scrollContainerRef.current && targetScrollRef.current !== currentScrollRef.current) {
        // Smooth easing (ease out)
        const diff = targetScrollRef.current - currentScrollRef.current
        const step = diff * 0.15 // Easing factor (lower = smoother but slower)
        
        if (Math.abs(step) > 0.5) {
          currentScrollRef.current += step
          scrollContainerRef.current.scrollLeft = currentScrollRef.current

          // Check boundaries for infinite loop
          const oneSetWidth = scrollContainerRef.current.scrollWidth / 3
          
          if (currentScrollRef.current >= oneSetWidth * 2) {
            const offset = currentScrollRef.current - oneSetWidth * 2
            currentScrollRef.current = oneSetWidth + offset
            targetScrollRef.current = oneSetWidth + offset
            scrollContainerRef.current.scrollLeft = currentScrollRef.current
          } else if (currentScrollRef.current < oneSetWidth * 0.5) {
            const offset = currentScrollRef.current - oneSetWidth * 0.5
            currentScrollRef.current = oneSetWidth + offset
            targetScrollRef.current = oneSetWidth + offset
            scrollContainerRef.current.scrollLeft = currentScrollRef.current
          }
        } else {
          currentScrollRef.current = targetScrollRef.current
        }
      }
      
      wheelAnimationRef.current = requestAnimationFrame(smoothScroll)
    }

    wheelAnimationRef.current = requestAnimationFrame(smoothScroll)

    return () => {
      if (wheelAnimationRef.current) {
        cancelAnimationFrame(wheelAnimationRef.current)
      }
    }
  }, [])

  // Handle mouse wheel for horizontal scrolling
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Mark that user is scrolling
      isUserScrollingRef.current = true

      // Initialize refs if needed
      if (!scrollContainerRef.current) return
      
      if (currentScrollRef.current === 0) {
        currentScrollRef.current = scrollContainerRef.current.scrollLeft
        targetScrollRef.current = scrollContainerRef.current.scrollLeft
      }

      // Get scroll delta (works for both vertical and horizontal scroll)
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
      
      // Update target scroll position with momentum
      targetScrollRef.current += delta * 1.2

      // Clear previous timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }

      // Resume auto-scroll after user stops
      userScrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false
      }, 1000)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
    }
  }, [])

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    e.preventDefault()
    isDraggingRef.current = true
    isUserScrollingRef.current = true
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
    
    // Sync with smooth scroll refs
    currentScrollRef.current = scrollContainerRef.current.scrollLeft
    targetScrollRef.current = scrollContainerRef.current.scrollLeft
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grabbing'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return
    e.preventDefault()
    const scrollContainer = scrollContainerRef.current
    const x = e.pageX - scrollContainer.offsetLeft
    const walk = (x - startXRef.current) * 2 // Scroll speed multiplier
    const newScrollLeft = scrollLeftRef.current - walk
    
    scrollContainer.scrollLeft = newScrollLeft
    currentScrollRef.current = newScrollLeft
    targetScrollRef.current = newScrollLeft

    // Check boundaries and reset for seamless loop during drag
    const oneSetWidth = scrollContainer.scrollWidth / 3
    
    // If scrolled past the second set, reset to second set start
    if (scrollContainer.scrollLeft >= oneSetWidth * 2) {
      scrollLeftRef.current = scrollLeftRef.current - oneSetWidth
      scrollContainer.scrollLeft = oneSetWidth
      currentScrollRef.current = oneSetWidth
      targetScrollRef.current = oneSetWidth
    }
    // If scrolled before first set, wrap to second set
    else if (scrollContainer.scrollLeft < oneSetWidth * 0.5) {
      scrollLeftRef.current = scrollLeftRef.current + oneSetWidth
      const newPos = oneSetWidth + (scrollContainer.scrollLeft - oneSetWidth * 0.5)
      scrollContainer.scrollLeft = newPos
      currentScrollRef.current = newPos
      targetScrollRef.current = newPos
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
    }
    
    // Resume auto-scroll after drag
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current)
    }
    userScrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false
    }, 1000)
  }

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab'
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
      userScrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false
      }, 1000)
    }
  }

  return (
    <section id="ambassadors" className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-card/30 to-background">
      {/* Subtle background pattern with legal theme */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-primary/20">
          <Scale className="w-32 h-32" />
        </div>
        <div className="absolute bottom-10 right-10 text-primary/20">
          <Scale className="w-32 h-32" />
        </div>
        <div className="absolute top-1/2 left-1/4 text-primary/20">
          <Scale className="w-24 h-24" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Our Ambassadors</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Our<span className="text-primary"> Student</span> Ambassadors: Empowering Change Across  <span className="text-primary">Pakistan</span> 
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Campus Ambassador Program
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto mt-2">
            Join our network of passionate students making a difference in their communities. Become a bridge between
            legal expertise and student needs.
          </p>
        </div>
      </div>

      {/* Auto-scrolling Ambassador Cards */}
      <div 
        ref={containerRef}
        className="relative mb-16"
      >
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div 
          ref={scrollContainerRef}
          className="ambassador-scroll-container overflow-x-scroll scrollbar-hide flex gap-6 py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={(e) => {
            setIsPaused(false)
            handleMouseLeave()
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {duplicatedAmbassadors.map((ambassador, index) => (
            <div
              key={index}
              className="ambassador-card flex-shrink-0 w-[380px] group"
            >
                <div className="relative h-full bg-card rounded-2xl p-6 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 border border-border hover:border-primary/30">
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Profile Image */}
                    <div className="mb-4 flex justify-center">
                      <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-primary to-primary/60">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-card">
                          <Image
                            src={ambassador.image}
                            alt={ambassador.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                </div>
                  </div>
                </div>

                    {/* Name and Role */}
                    <div className="text-center mb-3">
                      <h3 className="text-xl font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                        {ambassador.name}
                      </h3>
                      <p className="text-sm font-medium text-primary">{ambassador.role}</p>
                    </div>

                    {/* University */}
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Scale className="w-4 h-4 text-primary" />
                        {ambassador.university}
                      </p>
                </div>

                    {/* Tagline */}
                    <div className="mb-6 min-h-[60px]">
                      <p className="text-sm text-muted-foreground italic text-center leading-relaxed">
                        "{ambassador.tagline}"
                      </p>
        </div>

                    {/* View Profile Button */}
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="group/btn border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                        asChild
                      >
                        <Link href={`/ambassadors/${ambassador.id}`}>
                        <span className="text-primary font-semibold">
                          View Profile
                        </span>
                        <ExternalLink className="w-4 h-4 ml-2 text-primary group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-card rounded-2xl p-8 text-center border border-border hover:border-primary/30 transition-all duration-300">
          <h3 className="text-3xl font-bold text-card-foreground mb-4">Ready to Make a Difference?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our ambassador program and become part of a movement that's transforming legal aid accessibility across
            Pakistani universities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="animate-pulse-green">
              <a
                href="https://forms.gle/whaTsGAPppdkLxRf8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Click to Register Yourself <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/30 hover:border-primary hover:bg-primary/10">
              <a
                href="https://www.linkedin.com/company/ayn-legal-aid-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Learn More <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ambassador-scroll-container {
          scroll-behavior: auto;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
        }

        .ambassador-scroll-container:active {
          cursor: grabbing;
        }

        .ambassador-card {
          user-select: none;
        }

        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Ensure no scrollbars appear on section */
        #ambassadors {
          overflow: hidden;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .ambassador-card {
            width: 320px !important;
          }
        }

        @media (max-width: 480px) {
          .ambassador-card {
            width: 280px !important;
          }
        }
      `}</style>
    </section>
  )
}
