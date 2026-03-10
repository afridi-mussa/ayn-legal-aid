"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

/**
 * WebinarModal - Instant Version (No Delay)
 * Shows immediately when page loads
 */
export function WebinarModalInstant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem("hasSeenWebinarModal")
    
    if (!hasSeenModal) {
      // Show modal immediately
      setIsOpen(true)
      setTimeout(() => setIsVisible(true), 50) // Trigger fade-in animation
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsOpen(false)
      // Remember that user has closed the modal for this session
      sessionStorage.setItem("hasSeenWebinarModal", "true")
    }, 300) // Wait for fade-out animation
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full pointer-events-auto transform transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200 z-10 group"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
          </button>

          {/* Modal Content */}
          <div className="p-4 sm:p-6">
            {/* Poster Image */}
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/webinar.jpg"
                alt="Webinar Announcement"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Optional: Call to Action Button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://forms.gle/whaTsGAPppdkLxRf8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Register Now
              </a>
              <button
                onClick={handleClose}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

