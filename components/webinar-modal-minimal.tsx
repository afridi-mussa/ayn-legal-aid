"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

/**
 * WebinarModal - Minimal Version
 * Simple version without CTA buttons, just the image and close button
 */
export function WebinarModalMinimal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem("hasSeenWebinarModal")
    
    if (!hasSeenModal) {
      // Show modal after 1.5 seconds delay
      const timer = setTimeout(() => {
        setIsOpen(true)
        setTimeout(() => setIsVisible(true), 50)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsOpen(false)
      sessionStorage.setItem("hasSeenWebinarModal", "true")
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`relative max-w-3xl w-full transform transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-2xl hover:bg-gray-100 transition-all duration-200 z-10 group hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
          </button>

          {/* Poster Image - Full Screen Style */}
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/webinar.jpg"
              alt="Webinar Announcement"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}

