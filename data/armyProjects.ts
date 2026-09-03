export interface ArmyProject {
  id: string;
  index: string;
  command: string;
  title: string;
  theatre: string;
  elevation: string;
  scope: string;
  summary: string;
  image: string;
  protocols: string[];
}

export const armyProjectsData: ArmyProject[] = [
  {
    id: "western-command",
    index: "01",
    command: "Western Command Headquarters",
    title: "Command History & Institutional Documentation",
    theatre: "Chandimandir & Operational Formations",
    elevation: "Field Formations",
    scope: "Institutional Archival & Official Media",
    summary:
      "Specialized visual documentation, commemorative print collaterals, and high-impact retrospective media produced for Western Command, capturing institutional heritage and operational readiness.",
    image: "/images/army/western-command-1.jpg",
    protocols: [
      "Official Military Clearance Guidelines",
      "Historical Accuracy Verification",
      "Archival-Grade Print Production"
    ]
  },
  {
    id: "14-corps",
    index: "02",
    command: "14 Corps — Fire & Fury",
    title: "High-Altitude Operational & Logistics Documentation",
    theatre: "Ladakh & Northern Glacial Frontiers",
    elevation: "11,500 to 18,380 FT",
    scope: "Field Filming, Logistics & High-Altitude Operations",
    summary:
      "Comprehensive on-ground cinematography and documentary coverage documenting logistics lines, engineering battalions, and frontline deployments operating under extreme winter conditions in Ladakh.",
    image: "/images/army/14corps-2.jpg",
    protocols: [
      "Sub-Zero Equipment Protocols (-25°C)",
      "Specialized High-Altitude Acclimatization",
      "Strict Operational Security (OPSEC)"
    ]
  },
  {
    id: "69-armoured",
    index: "03",
    command: "69 Armoured Regiment",
    title: "Armoured Cavalry & Battle Traditions",
    theatre: "Western Border & Desert Sectors",
    elevation: "Tactical Maneuver Zones",
    scope: "Regimental Heritage, Crest Architecture & Video",
    summary:
      "Visual architecture and documentary coverage chronicling the armoured tradition, tank maneuvers, and battlefield honours of the 69 Armoured Regiment.",
    image: "/images/army/69armoured-1.jpg",
    protocols: [
      "Regimental Archive Concurrence",
      "Combat Vehicle Filming Clearances",
      "Official Service Distribution"
    ]
  },
  {
    id: "rezang-la",
    index: "04",
    command: "Rezang La Memorial Documentation",
    title: "Battlefield Memorial & Legacy Preservation",
    theatre: "Chushul Sector, Eastern Ladakh",
    elevation: "16,404 FT",
    scope: "Memorial Film, Historical Exhibits & Ceremonials",
    summary:
      "Documenting the historic battlefield memorial of Rezang La, paying tribute to the legendary stand of 13 Kumaon with verified historical records, veteran testimonies, and aerial topography.",
    image: "/images/army/rezang-la-1.jpg",
    protocols: [
      "High-Altitude Aerial Approvals",
      "Memorial Protocol Clearances",
      "Ceremonial Archival Standards"
    ]
  },
  {
    id: "sampark",
    index: "05",
    command: "Project Sampark — Border Roads Organisation",
    title: "Strategic Highway Engineering & Mountain Passes",
    theatre: "Jammu & Kashmir / Ladakh Border Infrastructure",
    elevation: "Mountain Pass Passes",
    scope: "Infrastructure Engineering Documentation",
    summary:
      "Documenting the tireless engineering efforts of BRO Project Sampark in carving and maintaining lifeline mountain passes, blast tunnels, and all-weather connectivity roads through treacherous terrain.",
    image: "/images/army/sampark-1.jpg",
    protocols: [
      "Geological Hazard Safety Protocols",
      "Heavy Machinery Filming Approvals",
      "Engineering Verification Sign-offs"
    ]
  }
];

export const armyStats = [
  { value: "14K+", label: "FT Elevation Theatres" },
  { value: "100%", label: "Protocol Compliance" },
  { value: "5+", label: "Military Commands" },
  { value: "0", label: "OPSEC Violations" }
];
