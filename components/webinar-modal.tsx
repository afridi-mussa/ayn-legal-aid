"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export function WebinarModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // FOR TESTING: Always show modal (remove session check temporarily)
    // Comment out these lines once you confirm it's working:
    
    // Show modal after 1.5 seconds delay
    const timer = setTimeout(() => {
      setIsOpen(true)
      setTimeout(() => setIsVisible(true), 50) // Trigger fade-in animation
    }, 1500)

    return () => clearTimeout(timer)
    
    // Original code with session storage (uncomment to re-enable):
    // const hasSeenModal = sessionStorage.getItem("hasSeenWebinarModal")
    // if (!hasSeenModal) {
    //   const timer = setTimeout(() => {
    //     setIsOpen(true)
    //     setTimeout(() => setIsVisible(true), 50)
    //   }, 1500)
    //   return () => clearTimeout(timer)
    // }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsOpen(false)
      // FOR TESTING: Comment out session storage temporarily
      // sessionStorage.setItem("hasSeenWebinarModal", "true")
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
          className={`relative bg-transparent max-w-md w-full pointer-events-auto transform transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close X Icon - Top Right */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-2.5 shadow-2xl transition-all duration-200 z-[9999] border-2 border-white"
            aria-label="Close modal"
            style={{ position: 'absolute', top: '8px', right: '8px' }}
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>

          {/* Modal Content */}
          <div className="relative">
            {/* Poster Image with border */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <Image
                src="/webinar.jpg"
                alt="Webinar Announcement"
                width={500}
                height={700}
                className="object-contain w-full h-auto max-h-[75vh]"
                priority
              />
            </div>

            {/* Register Now Button Only */}
            <div className="mt-3">
              <a
                href="https://forms.gle/whaTsGAPppdkLxRf8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

