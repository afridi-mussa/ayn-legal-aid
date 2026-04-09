import { Card, CardContent } from "@/components/ui/card"
import { Scale, Heart, Users, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">About Ayn Legal Aid & Club</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We are a unique organization that combines professional legal services, non-profit advocacy, and a vibrant
            university club network across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-card-foreground mb-6">Our Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At Ayn Legal Aid & Club, we believe that justice should be accessible to everyone, regardless of their
              economic status. Our mission is to bridge the gap between legal expertise and community needs through
              innovative approaches to legal aid.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We operate as a professional law firm, a non-profit organization, and a university club network, creating
              a comprehensive ecosystem that serves communities while nurturing the next generation of legal
              professionals.
            </p>
          </div>
          <div className="relative">
            <img src="/our-mission.jpeg" alt="Legal professionals at work" className="rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-card-foreground mb-2">Legal Firm</h4>
              <p className="text-muted-foreground text-sm">Professional legal services with experienced attorneys</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-card-foreground mb-2">Non-Profit</h4>
              <p className="text-muted-foreground text-sm">Community advocacy and free legal aid for those in need</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-card-foreground mb-2">University Club</h4>
              <p className="text-muted-foreground text-sm">Student network across Pakistani universities</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-card-foreground mb-2">Ambassador Program</h4>
              <p className="text-muted-foreground text-sm">Leadership opportunities for passionate students</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Core Team */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Our Core Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals working behind the mission.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-0">
            {/* First Row - 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Team Member 1 */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all overflow-hidden flex-shrink-0">
                      <img
                        src="/ahzam.jpeg"
                        alt="Ahzam Zahid Chishti"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-2 min-h-[3.5rem] flex items-center justify-center">
                      Ahzam Zahid Chishti
                    </h3>
                    <p className="text-primary font-semibold mb-3 text-sm md:text-base min-h-[2.5rem] flex items-center justify-center">
                      Director of People & Operations
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem]">
                      Oversees team operations, coordination, and organizational processes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Team Member 2 */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all overflow-hidden flex-shrink-0">
                      <img
                        src="/shahzaib-1.jpeg"
                        alt="Syed Shahzaib Bukhari"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-2 min-h-[3.5rem] flex items-center justify-center">
                      Syed Shahzaib Bukhari
                    </h3>
                    <p className="text-primary font-semibold mb-3 text-sm md:text-base min-h-[2.5rem] flex items-center justify-center">
                      Chairman
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem]">
                      Visionary leader overseeing strategic direction and legal advocacy initiatives.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Team Member 3 */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all overflow-hidden flex-shrink-0">
                      <img
                        src="/saif.jpeg"
                        alt="Saif ur Rehman"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-2 min-h-[3.5rem] flex items-center justify-center">
                      Saif ur Rehman
                    </h3>
                    <p className="text-primary font-semibold mb-3 text-sm md:text-base min-h-[2.5rem] flex items-center justify-center">
                      Cyber Abuse & Digital Investigations Analyst
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[3rem]">
                      Handles cybercrime analysis, digital evidence, and online abuse cases.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>




            {/* Second Row - 2 Cards CENTERED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 max-w-4xl mx-auto">
              {/* Team Member 4 - Alishba */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 overflow-hidden">
                      <img src="/lishba-3.jpeg" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Alishba Iqbal</h3>
                    <p className="text-primary font-semibold mb-2">Web & Content Coordinator</p>
                    <p className="text-muted-foreground text-sm">
                      Manages digital presence and content.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Team Member 5 - Mussa */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 overflow-hidden">
                      <img src="/syed-mussa12.jpeg" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Syed Mussa Ali</h3>
                    <p className="text-primary font-semibold mb-2">Full Stack  Developer</p>
                    <p className="text-muted-foreground text-sm">
                      Builds and maintains complete web applications, scalable systems, and modern digital solutions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Third Row - 2 Cards CENTERED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 max-w-4xl mx-auto">
              {/* Rabeea */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 overflow-hidden">
                      <img src="/rabeea.jpg" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Rabeea</h3>
                    <p className="text-primary font-semibold mb-2">Social Media Coordinator</p>
                    <p className="text-muted-foreground text-sm">
                      Drives awareness campaigns.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Irsa */}
              <div className="group w-full max-w-sm mx-auto">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6 px-4 text-center">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 ring-2 ring-primary/20 group-hover:ring-primary/40 overflow-hidden">
                      <img src="/irsa.jpeg" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Irsa Bukhari</h3>
                    <p className="text-primary font-semibold mb-2">Media Secretary</p>
                    <p className="text-muted-foreground text-sm">
                      Handles media & public campaigns.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}