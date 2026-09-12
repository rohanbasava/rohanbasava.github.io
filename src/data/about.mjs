/* About-page content: story, skills, education and honors. */

export const storyParagraphs = [
  "I grew up in Bangalore, India, and finished the IB Diploma at 10X International School in 2025. High school was where the two threads of my work first showed up side by side. On the engineering side, I built an automated waste disposal system for the World Robot Olympiad that ranked 5th regionally and 38th nationally, designed a tendon-driven 4-DOF robotic arm, and interned at Maekers.com, where I programmed Arduino controls and integrated proximity and light sensors into a smart lighting product. On the business side, I placed 8th in the Asia-Pacific region at the World Economics Cup, earned All India Rank 144 at the International Economics Olympiad, and ranked in the Top 500 globally in the GIDE.AI entrepreneurship accelerator.",
  "At Purdue I chose Integrated Business &amp; Engineering because it refuses to make me pick a side. My first summer I joined SeedlingLabs, an AI-native product design and development company, as a marketing and operations intern and was promoted to Marketing Strategy &amp; Operations Consultant. I own content strategy for three AI products, run CRM segmentation, and build the sales collateral the team carries into client conversations. In one month that work produced a 54% increase in organic audience growth and an 84.9% lift in average LinkedIn post views, with no paid spend.",
  "Outside of work I lead the technical side of Purdue's Sustainable Energy Club as Chief Technology Engineer, directing a 100-member build team across five concurrent initiatives. I serve as Director of Events for We Are Saath, a student organization focused on South Asian mental health awareness, sit on Purdue's Student Fee Advisory Board, direct the Sustainability Committee for Purdue Student Government, and help run tournaments as a board member of the Cricket and Social Outreach Club.",
  "I also write. I've published a full-length novel and a short story adapted from it, an experience that taught me how to carry a long project from first draft through editing to release. In my spare time I'm working on a math research paper and neuroscience research on career prediction.",
];

export const quickFacts = [
  { icon: "map-pin", text: "West Lafayette, Indiana" },
  { icon: "graduation-cap", text: "B.S. Integrated Business &amp; Engineering, Minor in Finance, Class of 2029" },
  { icon: "award", text: "Dean's List and Semester Honors, Fall 2025" },
];

export const skillGroups = [
  {
    icon: "users",
    title: "Leadership",
    items: [
      "Cross-functional team leadership",
      "Project scoping &amp; prioritization",
      "Resource allocation",
      "Stakeholder management",
      "Vendor sourcing",
    ],
  },
  {
    icon: "bar-chart",
    title: "Analytics &amp; business",
    items: [
      "Dashboard reporting",
      "CRM segmentation",
      "Market &amp; competitive analysis",
      "Content analytics",
      "Go-to-market strategy",
    ],
  },
  {
    icon: "wrench",
    title: "Engineering",
    items: [
      "Fusion 360",
      "PCB design",
      "Design for Manufacturing (DFM)",
      "Rapid prototyping",
      "3D printing",
      "Electronics &amp; sensor integration",
    ],
  },
  {
    icon: "code",
    title: "Programming &amp; tools",
    items: ["Python", "C++", "Arduino (C/C++)", "HTML", "Canva", "DaVinci Resolve", "CapCut"],
  },
];

export const credentials = [
  {
    icon: "graduation-cap",
    title: "Purdue University",
    html: `<p><strong>B.S. Integrated Business &amp; Engineering</strong>, Minor in Finance. Class of 2029. Dean's List and Semester Honors (Fall 2025).</p><p class="muted">Coursework: Business Analytics, Engineering Design &amp; Systems Thinking, Financial Accounting, Statistics.</p>`,
  },
  {
    icon: "check-circle",
    title: "Certifications",
    html: `<ul><li>Oracle Cloud Infrastructure Foundations Associate</li><li>AWS Knowledge: Cloud Essentials</li></ul>`,
  },
  {
    icon: "award",
    title: "Honors &amp; awards",
    html: `<ul><li>World Economics Cup 2024: 8th in Asia-Pacific, individual Bronze certificate</li><li>International Economics Olympiad 2024: All India Rank 144</li><li>World Robot Olympiad 2024: 5th regionally, 38th nationally</li><li>GIDE.AI accelerator: Top 500 globally</li></ul>`,
  },
];

/* Homepage competency cards. */
export const competencies = [
  { icon: "message-square", title: "Client communication", body: "Translating complex technical concepts into clear, persuasive messages for business leaders." },
  { icon: "users", title: "Cross-functional leadership", body: "Aligning engineering, business, and operations stakeholders around shared priorities." },
  { icon: "search", title: "Research &amp; analysis", body: "Market sizing, competitive landscaping, and quantitative analysis to support decision-making." },
  { icon: "target", title: "Structured problem-solving", body: "Scoping ambiguous problems, deconstructing them into workstreams, and delivering outcomes." },
  { icon: "cpu", title: "Technical fluency", body: "An engineering and product background that grounds strategy in what is actually buildable." },
  { icon: "bar-chart", title: "Analytics &amp; reporting", body: "Dashboard reporting, CRM segmentation, and content analytics that turn campaign data into decisions." },
];

/* Homepage headline statistics. Counters animate from zero on first view. */
export const headlineStats = [
  { value: "54%", countTo: 54, suffix: "%", label: "Organic audience growth in one month at SeedlingLabs, with no paid spend" },
  { value: "8", countTo: 8, label: "Sales-qualified leads sourced, three converted to demo stage" },
  { value: "100+", countTo: 100, suffix: "+", label: "Member build team directed at Purdue's Sustainable Energy Club" },
  { value: "5", countTo: 5, label: "Concurrent sustainable energy initiatives with owned technical planning" },
];
