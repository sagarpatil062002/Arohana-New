export interface Milestone {
  period: string;
  locations: string;
  title: string;
  subtitle: string;
  narrative: string;
  takeaways: string[];
}

export interface TeamMember {
  prefix: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  image: string;
  competencies: string[];
}

export const aboutData = {
  hero: {
    eyebrow: "ABOUT ĀROHANA",
    headline: "THE ROAD TO ĀROHANA WAS ANYTHING BUT STRAIGHT.",
    leadParagraph:
      "I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.",
    extendedCopy:
      "Today, Ārohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building.",
    image: "/images/about/madhura-portrait.jpg",
    mountainImage: "/assets/about-mountain.png"
  },
  philosophy: {
    title: "Philosophy",
    statement:
      "We believe that communication and commercial strategy are inseparable. Effective design and digital positioning should stem directly from operations and margin realities.",
    subtext:
      "We reject the agency echo chamber where vanity design wins awards while business owners struggle with unit economics and operational leakages."
  },
  milestones: [
    {
      period: "2016 — 2019",
      locations: "Muscat · Goa · Kolhapur",
      title: "Hospitality Foundations & Taj Training",
      subtitle: "Learning operational discipline where small mistakes compound immediately.",
      narrative:
        "My foundational years were forged directly inside luxury hospitality. I studied Hospitality Management in Muscat before completing my formal degree in Goa. During my university years, I was selected as a Top 13 finalist for Femina Miss India (West Zone) — an intense detour that taught poise and calm under extreme public scrutiny. Shortly after graduating, I qualified as one of just 16 trainees nationwide for the prestigious Taj Management Training Programme. Returning to Kolhapur, I founded Mother India Cafe from scratch, learning real unit economics, kitchen margins, and daily operational ledger realities.",
      takeaways: [
        "Studied Hospitality Management in Muscat & Goa",
        "Top 13 Finalist — Femina Miss India (West Zone)",
        "Qualified for Taj Management Training Programme (1 of 16 pan-India)",
        "Founder & Operator of Mother India Cafe (Kolhapur)"
      ]
    },
    {
      period: "2019 — 2021",
      locations: "Goa · Mumbai · Pune",
      title: "High-Pace Operations & The Strategic Pivot",
      subtitle: "Navigating high-turnover dining, craft beverage distribution, and commercial pivots.",
      narrative:
        "Venturing across Goa's hyper-competitive dining sector and regional distribution networks, I led on-ground operations and sales strategy for craft breweries and specialty F&B concepts. Working alongside leading hospitality operators including Passcode Hospitality, I saw firsthand that great food concepts frequently falter not on culinary craft, but because marketing promises and floor operations pull in opposite directions.",
      takeaways: [
        "Led regional on-ground sales for craft brewery ventures",
        "Floor operations and brand consulting with Passcode Hospitality",
        "Discovered the critical operational disconnect between agency marketing and kitchen realities"
      ]
    },
    {
      period: "2021 — 2024",
      locations: "Ladakh · Northern Frontier Theatres",
      title: "Demanding Theatres & High-Altitude Operations",
      subtitle: "Extreme field execution at 14,000+ feet in sub-zero Himalayan conditions.",
      narrative:
        "In Ladakh, I directed high-altitude logistics and community documentation for the Indian Army under Operation Sadbhavana, including conceptualizing and executing project SHE across 8 remote border villages. Concurrently, I partnered with PictureTime to manage communications for mobile inflatable digital cinemas operating at 11,500+ feet in sub-zero winter temperatures.",
      takeaways: [
        "Field logistics and documentary production at 14,000+ ft for Indian Army",
        "Conceptualized and executed project SHE across 8 border communities",
        "Strategic communications for PictureTime inflatable cinema networks in Ladakh & IFFI Goa"
      ]
    },
    {
      period: "2024 — Present",
      locations: "Pan-India Advisory",
      title: "Ārohana Today: Strategy Meets Execution",
      subtitle: "Bridging the gap between creative ambition and bottom-line commercial performance.",
      narrative:
        "Ārohana was founded to provide the partner I always wished I had when running businesses: a consultancy that thinks like an owner, executes with creative finesse, and stays on the ground until systems actually produce verified results.",
      takeaways: [
        "Retainer partnerships spanning real estate, hospitality, defence, and healthcare",
        "Zero vanity metrics — all engagements tied to commercial sustainability",
        "End-to-end capabilities across digital growth, operations, and documentary cinema"
      ]
    }
  ],
  team: [
    {
      prefix: "Ms.",
      name: "Madhura Hawal",
      role: "Founder & Principal Consultant",
      focus: "Commercial Strategy & Executive Advisory",
      bio: "With credentials spanning luxury hospitality management in Muscat and Goa, Taj Management training, standalone cafe ownership, craft brewery distribution, and direct field logistics for Indian Army campaigns in Ladakh, Madhura leads every engagement with rigorous commercial discipline.",
      image: "/images/about/team-ops-director.jpg",
      competencies: ["Commercial Strategy", "Hospitality Operations", "Military & Special Projects"]
    },
    {
      prefix: "Mr.",
      name: "Aditya Kulkarni",
      role: "Creative Director & Brand Architect",
      focus: "Brand Systems & Visual Direction",
      bio: "Aditya directs identity systems, spatial design, and typography architecture across luxury, retail, and corporate sectors. His approach ensures that brand identity functions as an operational business asset that establishes distinct market authority.",
      image: "/images/about/team-creative-director.jpg",
      competencies: ["Brand Architecture", "Spatial Experience", "Typography Systems"]
    },
    {
      prefix: "Ms.",
      name: "Tanvi Deshmukh",
      role: "Head of Strategic Communications",
      focus: "Positioning & Editorial Narrative",
      bio: "Tanvi oversees brand narrative, institutional positioning, and corporate communications. Specializing in high-stakes briefs and legacy enterprise repositioning, she crafts clear, compelling brand messaging rooted in verified proof.",
      image: "/images/about/team-strategy-lead.jpg",
      competencies: ["Brand Positioning", "Editorial Architecture", "Executive Communication"]
    },
    {
      prefix: "Mr.",
      name: "Arjun Patel",
      role: "Lead Cinematographer & Film Director",
      focus: "Film, Sound & Documentary Media",
      bio: "Arjun directs documentary, film, and multimedia production for commercial campaigns and specialized institutional briefs. Having filmed extensively at 14,000+ feet in high-altitude Himalayan sectors under strict protocols, he brings cinematic precision to demanding environments.",
      image: "/images/about/team-film-director.jpg",
      competencies: ["Cinematography", "Field Direction", "Post-Production Grading"]
    }
  ]
};
