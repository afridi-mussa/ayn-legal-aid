import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getAmbassadorById, getAllAmbassadorIds } from "@/lib/ambassadors-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AmbassadorProfileClient } from "./profile-client"

// Generate static params for all ambassadors
export function generateStaticParams() {
  const ids = getAllAmbassadorIds()
  return ids.map((id) => ({
    id: id,
  }))
}

export default function AmbassadorProfilePage({ params }: { params: { id: string } }) {
  const ambassador = getAmbassadorById(params.id)

  if (!ambassador) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-3xl font-bold mb-4">Ambassador Not Found</h1>
          <p className="text-muted-foreground mb-8">The ambassador profile you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/ambassadors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ambassadors
            </Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  // Build social links array with just the data (icons will be added in client component)
  const socialLinks = [
    { iconName: "linkedin" as const, url: ambassador.social?.linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { iconName: "email" as const, url: ambassador.social?.email, label: "Email", color: "hover:text-primary" },
  ].filter(link => link.url)

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <AmbassadorProfileClient ambassador={ambassador} socialLinks={socialLinks} />

      <Footer />
    </main>
  )
}
