export type AmbassadorField = "law" | "technology" | "arts" | "media" | "education" | "business" | "healthcare" | "social-justice"

export interface Ambassador {
  id: string
  name: string
  role: string
  university: string
  tagline: string
  image: string
  bio: string
  field: AmbassadorField
  specialization?: string
  joinDate?: string
  location?: string
  email?: string
  highlights?: string[]
  social?: {
    linkedin?: string
    email?: string
  }
}

// Field-based color themes
export const fieldColors = {
  law: {
    primary: "#2563eb", // Blue
    light: "#dbeafe",
    gradient: "from-blue-500 to-blue-600",
    badge: "bg-blue-100 text-blue-700 border-blue-300"
  },
  technology: {
    primary: "#10b981", // Green
    light: "#d1fae5",
    gradient: "from-green-500 to-green-600",
    badge: "bg-green-100 text-green-700 border-green-300"
  },
  arts: {
    primary: "#ec4899", // Pink
    light: "#fce7f3",
    gradient: "from-pink-500 to-pink-600",
    badge: "bg-pink-100 text-pink-700 border-pink-300"
  },
  media: {
    primary: "#ef4444", // Red
    light: "#fee2e2",
    gradient: "from-red-500 to-red-600",
    badge: "bg-red-100 text-red-700 border-red-300"
  },
  education: {
    primary: "#8b5cf6", // Purple
    light: "#ede9fe",
    gradient: "from-purple-500 to-purple-600",
    badge: "bg-purple-100 text-purple-700 border-purple-300"
  },
  business: {
    primary: "#f59e0b", // Amber
    light: "#fef3c7",
    gradient: "from-amber-500 to-amber-600",
    badge: "bg-amber-100 text-amber-700 border-amber-300"
  },
  healthcare: {
    primary: "#06b6d4", // Cyan
    light: "#cffafe",
    gradient: "from-cyan-500 to-cyan-600",
    badge: "bg-cyan-100 text-cyan-700 border-cyan-300"
  },
  "social-justice": {
    primary: "#d946ef", // Fuchsia
    light: "#fae8ff",
    gradient: "from-fuchsia-500 to-fuchsia-600",
    badge: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300"
  }
}

export const fieldLabels: Record<AmbassadorField, string> = {
  law: "Legal Ambassador",
  technology: "Tech Innovator",
  arts: "Arts & Culture Ambassador",
  media: "Media Ambassador",
  education: "Education Ambassador",
  business: "Business Ambassador",
  healthcare: "Healthcare Ambassador",
  "social-justice": "Social Justice Advocate"
}

export const ambassadorsData: Ambassador[] = [
  {
    id: "maryam-asif",
    name: "Maryam M.Asif",
    role: "Campus Ambassador",
    university: "University of Punjab, Gujranwala Campus",
    tagline: "Justice delayed is justice denied - let's bridge the gap together",
    image: "/a-1.jpg",
    location: "Gujranwala, Punjab",
    field: "law",
    bio: "Maryam is a dedicated law student passionate about making legal services accessible to everyone. She actively works to bridge the gap between legal expertise and community needs, believing that timely justice is a fundamental right for all. Through her role as a campus ambassador, she has helped numerous students understand their legal rights and navigate complex legal situations.",
    specialization: "Civil Rights & Advocacy",
      joinDate: "October 2025",
    highlights: [
      "100+ Students Assisted",
      "Legal Awareness Workshops",
      "Community Outreach Leader",
      "Pro Bono Advocacy"
    ],
    social: {
      linkedin: "https://linkedin.com/in/maryam-asif",
      email: "maryam.asif@aynlegal.com"
    }
  },
  {
    id: "muhammad-umer-hayat",
    name: "Muhammad Umer Hayat",
    role: "Campus Ambassador",
    university: "University of Punjab, Gujranwala Campus",
    tagline: "Empowering students through accessible legal knowledge",
    image: "/a-2.jpg",
    location: "Gujranwala, Punjab",
    field: "law",
    bio: "Muhammad Umer Hayat Student of Punjab University Gujranwala campus Currently enrolled in 4th semester in Punjab University Gujranwala campus Parallel working in Other organizations like PLSA and PJ&RI Member of Moot society of PUGC University ",
    specialization: "Constitutional Rights & Governance",
    joinDate: "October 2025",
    highlights: [
      "Legal Education Workshops",
      "Student Rights Advocate",
      "Constitutional Law Expert",
      "Campus Legal Advisor"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/rana-umer-73b218227?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "ranahayat4703@gmail.com"
    }
  },
  {
    id: "syed-lucky-ali",
    name: "Syed Lucky Ali",
    role: "Campus Ambassador",
    university: "Institute of Law, University of Sindh",
    tagline: "Every voice deserves to be heard in the halls of justice",
    image: "/a-3.jpg",
    location: "Jamshoro, Sindh",
    field: "social-justice",
    bio: "Syed Lucky Ali believes in amplifying the voices of the marginalized and ensuring that everyone has access to justice. As an ambassador, he works tirelessly to create awareness about legal rights and provides guidance to students facing legal challenges. His passion for social justice and his commitment to the community have made him a respected figure among his peers.",
    specialization: "Human Rights Advocacy",
    joinDate: "October 2025",
    highlights: [
      "Human Rights Advocate",
      "Community Justice Leader",
      "Legal Aid Volunteer",
      "Social Impact Pioneer"
    ],
    social: {
      linkedin: "https://linkedin.com/in/lucky-ali",
      email: "lucky.ali@aynlegal.com"
    }
  },
  {
    id: "manahil-abbasi",
    name: "Manahil Abbasi",
    role: "Campus Ambassador",
    university: "Federal Urdu University Islamabad",
    tagline: "Building bridges between law and community service",
    image: "/a-4.jpg",
    location: "Islamabad",
    field: "social-justice",
    bio: "Manahil Abbasi is passionate about connecting legal expertise with community needs. She believes that law should serve the people, and through her work as a campus ambassador, she has successfully organized multiple legal awareness campaigns and community service initiatives. Her innovative approach to legal education has inspired many students to take active roles in social justice.",
    specialization: "Community Advocacy & Legal Awareness",
    joinDate: "October 2025",
    highlights: [
      "Community Service Leader",
      "Legal Awareness Campaigns",
      "Student Advocacy Programs",
      "Social Justice Initiatives"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/manahil-abbasi-1bab07324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "manahilabbasi303@gmail.com"
    }
  },
  {
    id: "abdullah-rauf",
    name: "Abdullah Rauf",
    role: "Campus Ambassador",
    university: "NUML, Islamabad",
    tagline: "Law is the foundation of a just society",
    image: "/a-5.jpg",
    location: "Islamabad",
    field: "business",
    bio: "Abdullah Rauf views law as the cornerstone of societal progress and justice. With a strong academic background and practical experience, he helps students understand complex legal concepts in simple terms. His dedication to promoting legal literacy has made him a trusted advisor for students seeking guidance on various legal matters.",
    specialization: "Corporate & Business Affairs",
    joinDate: "October 2025",
    highlights: [
      "Corporate Law Specialist",
      "Business Legal Advisor",
      "Student Mentor",
      "Legal Literacy Advocate"
    ],
    social: {
      linkedin: "https://linkedin.com/in/abdullah-rauf",
      email: "abdullah.rauf@aynlegal.com"
    }
  },
  {
    id: "muhammad-waqar",
    name: "Muhammad Waqar",
    role: "Campus Ambassador",
    university: "University of Punjab, Gujranwala Campus",
    tagline: "Making legal aid accessible to every student",
    image: "/a-6.jpg",
    location: "Gujranwala, Punjab",
    field: "education",
    bio: "Muhammad Waqar is dedicated to ensuring that no student faces legal challenges alone. Through his work, he has helped establish support systems and resource networks that make legal aid accessible to all students regardless of their background. His compassionate approach and thorough understanding of student needs have made him an essential part of the ambassador program.",
    specialization: "Student Rights & Advocacy",
    joinDate: "October 2025",
    highlights: [
      "Student Rights Expert",
      "Legal Aid Network Builder",
      "Campus Support Systems",
      "Accessibility Advocate"
    ],
    social: {
      linkedin: "https://linkedin.com/in/muhammad-waqar",
      email: "muhammad.waqar@aynlegal.com"
    }
  },
  {
    id: "fakhara-riaz-ahmad",
    name: "Fakhara Riaz Ahmad",
    role: "Campus Ambassador",
    university: "IUB, Bahawalnagar Campus",
    tagline: "Knowledge is power, legal knowledge is empowerment",
    image: "/a-7.jpg",
    location: "Bahawalnagar, Punjab",
    field: "social-justice",
    bio: "Fakhara Riaz Ahmad believes that legal knowledge is the key to personal and social empowerment. She works to educate students about their rights and how to exercise them effectively. Her workshops and seminars have empowered countless students to take control of their legal situations and advocate for themselves and others.",
    specialization: "Women's Rights & Empowerment",
    joinDate: "October 2025",
    highlights: [
      "Women's Rights Champion",
      "Empowerment Workshops",
      "Legal Education Pioneer",
      "Community Advocate"
    ],
    social: {
      linkedin: "https://linkedin.com/in/fakhara-ahmad",
      email: "fakharariazahmadhotiana@gmail.com"
    }
  },
  {
    id: "ahsan-ali",
    name: "Ahsan Ali",
    role: "Campus Ambassador",
    university: "University of Punjab, Gujranwala Campus",
    tagline: "Stand for justice, speak for the voiceless",
    image: "/a-8.jpg",
    location: "Gujranwala, Punjab",
    field: "law",
    bio: "I'm Ahsan Ali, and I am currently studying in LLB 4th semester at University of the Punjab, Gujranwala Campus. I have already worked as Campus Ambassador for many organizations like Pakistan Justice and Rights Initiative (PJ&RI). I am passionate about leadership, teamwork, and creating meaningful connections within the student community. Being an active learner and communicator, I always seek opportunities to engage with initiatives that promote growth, innovation, and collaboration. Joining Ayn Legal Aid & Club as a Campus Ambassador is a great opportunity for me to bridge the gap between students and professional platforms. I am excited to represent the organization on campus, organize awareness activities, and encourage my peers to participate in impactful programs. Through this role, I aim to enhance my leadership and communication skills while contributing to the organization’s mission. I look forward to making a positive impact and being part of a community that inspires learning and development.",
    specialization: "Criminal Justice & Reform",
    joinDate: "October 2025",
    highlights: [
      "Criminal Law Specialist",
      "Marginalized Communities Advocate",
      "Justice Accessibility Champion",
      "Campus Social Justice Leader"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/ahsan-ali-777687345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "chahsanali6220527@gmail.com"
    }
  },
  {
    id: "babar-ali",
    name: "Babar Ali",
    role: "Campus Ambassador",
    university: "Sandal Bar Law College, Faisalabad",
    tagline: "Equal access to justice is a fundamental right",
    image: "/a-9.jpg",
    location: "Faisalabad, Punjab",
    field: "law",
    bio: "Babar Ali champions the principle that justice should be available to everyone, regardless of their socioeconomic status. He works to remove barriers that prevent people from accessing legal services and has been instrumental in creating awareness about free legal aid programs. His commitment to equality has inspired many to join the cause.",
    specialization: "Property Law",
    joinDate: "October 2025",
    highlights: [
      "Property Law Expert",
      "Legal Aid Awareness",
      "Equality Champion",
      "Access to Justice Advocate"
    ],
    social: {
      linkedin: "https://linkedin.com/in/babar-ali",
      email: "babar.ali@aynlegal.com"
    }
  },
  {
    id: "ali-nouman-nasir",
    name: "Ali Nouman Nasir",
    role: "Campus Ambassador",
    university: "Rawalpindi Law College, Civil Lines",
    tagline: "Transforming legal awareness one campus at a time",
    image: "/a-10.png",
    location: "Rawalpindi, Punjab",
    field: "education",
    bio: "Ali Nouman Nasir Campus Ambassador – Rawalpindi Law College, Civil Lines Ali Nouman Nasir is a final-year LL.B student at Rawalpindi Law College and currently serves as a Legal Assistant at Hirely Consultants (UK/Pakistan). His work focuses on asylum, immigration, and human rights law, where he supports UK solicitors through legal drafting, research, and case preparation.As a campus ambassador for AYNع Legal Aid & Club, he aims to promote legal awareness, bridge academic learning with practical exposure, and encourage students to engage with issues of justice and digital rights.",
    specialization: "Contract Law",
    joinDate: "October 2025",
    highlights: [
      "Contract Law Specialist",
      "Innovative Campaign Designer",
      "Multi-Campus Outreach",
      "Legal Education Transformer"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/alinoumannasir",
      email: "alinoumannasir9@gmail.com"
    }
  },
  {
    id: "uzair-shah",
    name: "Uzair Shah",
    role: "Campus Ambassador",
    university: "Islamia College University, Peshawar",
    tagline: "In the pursuit of justice, we find our purpose",
    image: "/a-11.jpg",
    location: "Peshawar, KPK",
    field: "law",
    bio: "Uzair Shah believes that the pursuit of justice gives meaning and purpose to life. His philosophical approach to law and his dedication to serving others have made him a respected figure in the legal community. He mentors students, guides them through complex legal issues, and inspires them to make a difference in the world.",
    specialization: "Family Law",
    joinDate: "October 2025",
    highlights: [
      "Family Law Specialist",
      "Student Mentor",
      "Legal Philosophy Expert",
      "Community Service Leader"
    ],
    social: {
      linkedin: "https://linkedin.com/in/uzair-shah",
      email: "uzair.shah@aynlegal.com"
    }
  },
  {
    id: "nadeem-akhtar",
    name: "Nadeem Akhtar",
    role: "Campus Ambassador",
    university: "IUB, Bahawalnagar Campus",
    tagline: "Law empowers, education enlightens",
    image: "/a-12.jpg",
    location: "Bahawalnagar, Punjab",
    field: "education",
    bio: "My name is Nadeem Akhtar. I am a 5th semester law student at Islamia University Bahawalpur Bahawalnagar Campus. I have completed two semesters in BS English Literature. Now I have frozen the English semester. I am the joint secretary of the students' society in Bahawalnagar Campus, the secretary of the character building society. Whenever there is a function in the campus, I play my full role. I also give speeches. Apart from this, I am active on social media. I also go to the lower court. I also help people. I am playing a very good role legally. Alhamdulillah, I will do a lot of groove in the university in the future.",
    specialization: "Educational Law",
    joinDate: "October  2025",
    highlights: [
      "Educational Law Expert",
      "Legal Literacy Programs",
      "Community Empowerment",
      "Innovative Teaching Methods"
    ],
    social: {
      linkedin: "https://linkedin.com/in/nadeem-akhtar",
      email: "nadeemvitk238123@gmail.com"
    }
  },
  {
    id: "ghulam-mustafa-indher",
    name: "Ghulam Mustafa Indher",
    role: "Campus Ambassador",
    university: "International Islamic University, Islamabad",
    tagline: "Justice begins with awareness and action",
    image: "/a-13.jpg",
    location: "Islamabad",
    field: "law",
    bio: "My name is Ghulam Mustafa Indher, a dedicated law student at the International Islamic University, Islamabad, currently in my third semester. I am deeply passionate about justice, legal development, and civic engagement. My goal is to become a judge, contributing to a fair and transparent judicial system in Pakistan. Alongside my academic journey, I proudly serve as a Cabinet Member of the Youth Parliament Pakistan and as a member of the Young Lawyers Association. These roles have strengthened my leadership, teamwork, and advocacy skills while allowing me to engage in policy dialogue and youth representation. I strongly believe in ethical practice, equality before the law, and empowering young people to create positive social change. I am committed to pursuing excellence, personal integrity, and service to my nation through the rule of law.",
    specialization: "Islamic Jurisprudence",
    joinDate: "October 2025",
    highlights: [
      "Cabinet Member - Youth Parliament Pakistan",
      "Young Lawyers Association Member",
      "Future Judge Aspirant",
      "Youth Empowerment Advocate"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/ghulam-mustafa-ab349b365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_appr",
      email: "ghulammustafaindher2003@gmail.com"
    }
  },
  {
    id: "sanaullah-chopan",
    name: "Sanaullah Chopan",
    role: "Campus Ambassador",
    university: "Institute of Law, Hyderabad",
    tagline: "Building a culture of legal literacy",
    image: "/a-14.jpg",
    location: "Hyderabad, Sindh",
    field: "education",
    bio: "Sanaullah Chopan is dedicated to creating a culture where legal literacy is the norm rather than the exception. Through systematic education programs and community engagement, he has helped transform how students in his region view and interact with the legal system. His work has had a lasting impact on legal awareness in Hyderabad.",
    specialization: "Administrative Law",
    joinDate: "October 2025",
    highlights: [
      "Legal Literacy Pioneer",
      "Community Engagement Leader",
      "Systematic Education Programs",
      "Regional Impact Maker"
    ],
    social: {
      linkedin: "https://linkedin.com/in/sanaullah-chopan",
      email: "sanaullah.chopan@aynlegal.com"
    }
  },
  {
    id: "umair-ashraf",
    name: "Umair Ashraf",
    role: "Campus Ambassador",
    university: "University of Punjab",
    tagline: "Rights are not given, they are claimed through knowledge",
    image: "/a-15.jpg",
    location: "Lahore, Punjab",
    field: "law",
    bio: "I am Umair Ashraf, a dedicated Law student from District Bahawalnagar. Alongside my studies, I am actively practicing in the District Courts Bahawalnagar, gaining practical experience in legal proceedings and advocacy. I am passionate about justice, legal research, and developing my professional skills to become a competent and responsible lawyer in the future.",
    specialization: "Civil Rights & Advocacy",
    joinDate: "October 2025",
    highlights: [
      "Civil Rights Expert",
      "Student Empowerment Leader",
      "Confident Advocacy Builder",
      "Legal Education Specialist"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/umair-ashraf-b6a0a2192",
      email: "Umairjoyia76@gmail.com"
    }
  },
  {
    id: "muhammad-ajmal",
    name: "Muhammad Ajmal",
    role: "Campus Ambassador",
    university: "University of Balochistan, Sub Campus Pishin",
    tagline: "Every student deserves legal protection and guidance",
    image: "/ajmal.jpg",
    location: "Pishin, Balochistan",
    field: "education",
    bio: "My name is Muhammad Ajmal, a law student at the University of Balochistan, Sub-Campus Pishin, and a passionate human rights advocate, blogger, and traditional embroidery artist. I actively work on issues related to gender equality, refugee rights, and social justice, using media and storytelling to create awareness and empower communities in Balochistan",
    specialization: "Student Advocacy",
    joinDate: "October 2025",
    highlights: [
      "Regional Equity Champion",
      "Legal Support Networks",
      "Underserved Areas Advocate",
      "Access to Justice Pioneer"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/muhammad-ajmal-6b1622269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "syedajmalkhanchishti@gmail.com"
    }
  },
  {
    id: "haya-rahman",
    name: "Haya Rahman",
    role: "Campus Ambassador",
    university: "University of Peshawar",
    tagline: "Legal aid is not a privilege, it's a right",
    image: "/a-17.jpg",
    location: "Peshawar, KPK",
    field: "social-justice",
    bio: "This is Haya Rahman. I'm a passionate Sociology graduate from the University of Peshawar, where I earned a CGPA of 3.36. I've always been driven to make a real difference in my community through volunteer work and hands-on research, and I'm excited to channel my critical thinking and curiosity about social dynamics into a career as a Sociologist. I'd love to specialize in areas like education, culture, or social inequality to help uncover and improve the structures that shape our world. With experience in video editing, project management, and digital empowerment initiatives, plus skills in communication, problem-solving, and tools like Adobe Premiere Pro and MS Excel, I'm ready to dive in",
    specialization: "Public Interest Law",
    joinDate: "October 2025",
    highlights: [
      "Public Interest Law Advocate",
      "Universal Access Champion",
      "Resource Connection Expert",
      "Community Impact Leader"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/haya-r-b9b63a260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "haya.uop.2020@gmail.com"
    }
  },
  {
    id: "sajid-mehmood",
    name: "Sajid Mehmood",
    role: "Campus Ambassador",
    university: "The Islamia University of Bahawalpur",
    tagline: "Art meets law in the pursuit of justice",
    image: "/a-18.jpg",
    location: "Bahawalpur, Punjab",
    field: "arts",
    bio: "Sajid Mehmood brings a unique perspective to legal advocacy by combining artistic expression with legal education. His creative approach to teaching legal concepts has made law more accessible and engaging for students. Through art, drama, and creative media, he has successfully communicated complex legal ideas to diverse audiences.",
    specialization: "Intellectual Property Law",
    joinDate: "October 2025",
    highlights: [
      "Intellectual Property Expert",
      "Creative Legal Education",
      "Art & Law Integration",
      "Innovative Teaching Methods"
    ],
    social: {
      linkedin: "https://linkedin.com/in/sajid-mehmood",
      email: "sajid.mehmood@aynlegal.com"
    }
  },
  {
    id: "deena-hamid",
    name: "Deena Hamid",
    role: "Campus Ambassador",
    university: "University of Swabi",
    tagline: "Empowering women through legal awareness",
    image: "/a-19.jpg",
    location: "Swabi, KPK",
    field: "social-justice",
    bio: "I’m Deena Hamid, a dedicated law student at the university of Swabi with a deep interest in law subject, legal research and taxation. I actively participate in seminars, webinars and academic discussions on law and social issues. I am also a member of different societies and organization in which i always actively participate. Along with my studies I’m a painting artist and I create canvas and glass painting.",
    specialization: "Women's Rights & Empowerment",
    joinDate: "October 2025",
    highlights: [
      "Women's Rights Advocate",
      "Safe Space Creator",
      "Empowerment Workshops",
      "Transformative Education"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/deena-hamid-b7a493354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "deenahamid01@gmail.com"
    }
  },
  {
    id: "ayesha-shaukat",
    name: "Ayesha Shaukat",
    role: "Campus Ambassador",
    university: "NUML, Islamabad",
    tagline: "Justice is the constant and perpetual will to render every person their due",
    image: "/a-20.jpg",
    location: "Islamabad",
    field: "law",
    bio: "Ayesha Shaukat embodies the classical principle that justice means giving everyone their due. With a deep understanding of legal philosophy and practical application, she helps students navigate complex legal situations while maintaining ethical standards. Her wisdom and guidance have helped shape the next generation of legal professionals.",
    specialization: "Legal Philosophy",
    joinDate: "October 2025",
    highlights: [
      "Legal Philosophy Scholar",
      "Ethical Standards Champion",
      "Next-Gen Professional Mentor",
      "Classical Justice Principles"
    ],
    social: {
      linkedin: "https://linkedin.com/in/ayesha-shaukat",
      email: "ayesha.shaukat@aynlegal.com"
    }
  },
  {
    id: "zain-fatima",
    name: "Zain Fatima",
    role: "Campus Ambassador",
    university: "Nishtar Medical University, Multan",
    tagline: "Bringing justice to the doorstep of every community",
    image: "/a-25.jpg",
    location: "Multan, Punjab",
    field: "healthcare",
    bio: " Zain Fatima 4th year MBBS student of Nishtar Medical University Multan Work Experience: - organized forensic seminar on anti-rape crisis cell ARCC and legal actions in my university - participated as passionate organizing member for 2024 elections in my halqa - working on many research projects as the leading author - organized microbiology conference in association with pathology department in my university I have great sense of responsibility and time management. I believe that every successful event requires an effective leadership and active communication with the team members.Aim for becoming an ambassador: medical profession is deeply rooted with law and justice. The delicate balance between the two should be maintained otherwise it could result in chaos and destruction of the society. By the help of this prestigious organization I would be able to preach law and justice at the student level and also convey our message to the higher authorities.Regards!",
    specialization: "Healthcare Law",
    joinDate: "October 2025",
    highlights: [
      "Healthcare Law Expert",
      "Patient Rights Advocate",
      "Interdisciplinary Innovator",
      "Grassroots Legal Access"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/zain-fatima-87a812226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "zainfatima526@gmail.com"
    }
  },
  {
    id: "iman-afzal",
    name: "Iman Afzal",
    role: "Campus Ambassador",
    university: "Pakistan College of Law",
    tagline: "Technology and law united for social justice",
    image: "/a-22.jpg",
    location: "Lahore, Punjab",
    field: "technology",
    bio: "As a proactive 3rd-year LL.B. student at Pakistan College of Law (Punjab University), I am dedicated to a career in advocacy and public speaking. My academic drive is reflected in my 420 marks from the first year and a 7.0 band on the IELTS. I have successfully applied my research and analytical skills through internships at the Advocate General Office and Awamistan. On campus, I lead by example as a Campus Ambassador, and I actively hone my advocacy skills as a key member of the PCL Debating Society and the PJ&RI Mooting and Gender Justice & Rights Initiative.",
    specialization: "Technology Law",
    joinDate: "October 2025",
    highlights: [
      "Technology Law Pioneer",
      "Digital Justice Solutions",
      "Legal Tech Innovation",
      "Access Democratization"
    ],
    social: {
      linkedin: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile#:~:text=www.linkedin.com,Vanity%20URL%20name",
      email: "imanafzal0440@gmail.com"
    }
  },
  {
    id: "muhammad-hanzlah-raja",
    name: "Muhammad Hanzlah Raja",
    role: "Campus Ambassador",
    university: "Al-Mizan Institute of Legal Studies",
    tagline: "Empowering the next generation through legal awareness",
    image: "/a-27.jpg",
    location: "Islamabad",
    field: "education",
    bio: " I am Muhammad Hanzlah Raja . I am currently pursuing my LL.B at Al-Mizan Institue of Legal Student. I have a deep interest in constitutional and criminal law. I am particularly drawn to the questions of how justice is promised and how it is practiced. I am serving as GS at our institute's Literary and Debating Society. I prefer substance over show whether in arguments or in actions. I look forward to active learning and excelling in legal profession and serving the noble cause of justice..",
    specialization: "Legal Education",
        joinDate: "October 2025",
    highlights: [
      "Next-Gen Mentor",
      "Legal Awareness Champion",
      "Youth Leadership Builder",
      "Future Professional Developer"
    ],
    social: {
      linkedin: "https://linkedin.com/in/hanzlah-raja",
      email: "hanzlahm210@gmail.com"
    }
  },
  {
    id: "rabeea-hussain",
    name: "Rabeea Hussain",
    role: "Campus Ambassador",
    university: "Virtual University, Islamabad",
    tagline: "Championing justice through education and advocacy",
    image: "/rabeea.jpg",
    location: "Islamabad",
    field: "technology",
    bio: "I’m Rabeea Hussain, a passionate BBA student at Virtual University with hands-on experience in Human Resources, recruitment, and team leadership. Over the past two years, I’ve worked with organizations like Ai DataYard, GAO Tek Inc., and Aqua Coders, where I developed strong skills in communication, project coordination, and people management. My professional journey has taught me the importance of collaboration, ethics, and inclusivity values that align closely with Ayn Legal Club’s mission.As an Ambassador, I aim to represent the club with integrity and enthusiasm, fostering connections between students and legal professionals. I believe in empowering youth through knowledge and opportunities, and I’m eager to contribute by promoting Ayn Legal Club’s initiatives, events, and vision across campuses and communities.",
    specialization: "Digital Rights",
    joinDate: "October 2025",
    highlights: [
      "Digital Rights Champion",
      "Online Education Advocate",
      "Geographical Barrier Breaker",
      "Virtual Learning Expert"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/rabeea-hussain/",
      email: "rabeea.hussain.19@gmail.com"
    }
  },
  {
    id: "dua-batool",
    name: "Dua Batool",
    role: "Campus Ambassador",
    university: "Hamdard University, Karachi",
    tagline: "Inspiring awareness, advocacy, and action",
    image: "/dua-batool.jpg",
    location: "Karachi, Sindh",
    field: "social-justice",
    bio: "Passionate 3rd-year law student with a growing interest in the field and the gaps between law, policy, and justice. An official ambassador intern of International Mun.  Currently enrolled in aspire cohort 5 program by Harvard university and forward learning program by McKinsey & company alongside enrolled in dynamic law association 4 months virtual internship.",
    specialization: "Social Justice",
    joinDate: "October 2025",
    highlights: [
      "Triple-A Advocate (Awareness, Advocacy, Action)",
      "Student Mobilization Expert",
      "Dynamic Campaign Leader",
      "Justice Participation Champion"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/dua-batool-ab9498267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
      email: "duabatool201@gmail.com"
    }
  },

  {
    id: "hassan-raja",
    name: "Hassan Raja",
    role: "Campus Ambassador",
    university: "Quaid e Azam University",
    tagline: "Inspiring awareness, advocacy, and action",
    image: "/hassan-raja.jpg",
    location: "Karachi, Sindh",
    field: "social-justice",
    bio: "Muhammad Hassan Raja here from Quaid-i-Azam University (QAU) I'm currently in my 7th semester pursuing a Bachelor's in Computer Science. I have gained hands-on experience in software development, data analysis, and project management, working on several academic and freelance projects. I've also participated in tech events and hackathons representing QAU, where I got the chance to collaborate with talented individuals and strengthen my problem-solving and leadership skills.Along with my technical background, I have a keen interest in marketing, content creation, and designing, which allows me to blend creativity with technology. I'm passionate about learning, growing, and contributing to impactful projects that make a difference.",
    specialization: "Social Justice",
    joinDate: "October 2025",
    highlights: [
      "Triple-A Advocate (Awareness, Advocacy, Action)",
      "Student Mobilization Expert",
      "Dynamic Campaign Leader",
      "Justice Participation Champion"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/hassan-raja-5159b6292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app ",
      email: "Hassanrajanadeemjavaid@gmail.com"
    }
  }
]

// Helper function to get ambassador by ID
export function getAmbassadorById(id: string): Ambassador | undefined {
  return ambassadorsData.find(ambassador => ambassador.id === id)
}

// Helper function to get all ambassador IDs (useful for static generation)
export function getAllAmbassadorIds(): string[] {
  return ambassadorsData.map(ambassador => ambassador.id)
}

