/* Case studies and projects.
 *
 * Each case study carries the same spine so the set reads as one portfolio:
 * context, problem, role, approach, key decisions, outcome, and lessons.
 * `sections` entries are rendered in order by the case-study page template.
 * A section body may reference a diagram by key (see components/diagrams.mjs).
 */

export const caseStudies = [
  {
    slug: "seedlinglabs-organic-growth",
    icon: "trending-up",
    kicker: "Case study &middot; Marketing strategy",
    kickerIcon: "trending-up",
    title: "Growing organic reach and pipeline for three AI products",
    cardTitle: "Growing organic reach for three AI products",
    tags: ["Marketing strategy", "CRM", "Analytics"],
    cardSummary:
      "A content and pipeline system at SeedlingLabs that delivered a 54% jump in organic audience growth and sourced eight sales-qualified leads.",
    homeSummary:
      "How a content and pipeline system at SeedlingLabs delivered a 54% jump in organic audience growth and an 84.9% lift in LinkedIn post views in a single month.",
    seoTitle: "SeedlingLabs Case Study: Organic Growth for Three AI Products",
    seoDescription:
      "How Rohan Basava built a content, CRM, and dashboard system at SeedlingLabs that lifted organic audience growth 54% with no paid spend.",
    lead:
      "SeedlingLabs is an AI-native product design and development company that helps organizations discover, govern, build, and scale production-ready AI. I joined as a marketing and operations intern in May 2026 and was promoted to Marketing Strategy &amp; Operations Consultant.",
    meta: [
      { icon: "briefcase", label: "Role", value: "Marketing Strategy &amp; Ops Consultant" },
      { icon: "calendar", label: "Timeline", value: "May 2026 to present" },
      { icon: "layers", label: "Scope", value: "Three AI products" },
      { icon: "bar-chart", label: "Paid spend", value: "None" },
    ],
    sections: [
      {
        id: "challenge",
        icon: "flag",
        title: "The challenge",
        body: `
<p>SeedlingLabs had strong products (including its flagship offerings, Orchard and Sprout) but a small team and no paid media budget. Awareness had to come from organic channels, and every marketing hour also had to feed the sales pipeline. When I joined, campaign performance lived in scattered exports, CRM records were inconsistently segmented, and content was produced ad hoc rather than as a system.</p>
<p>The brief I set for myself: build a repeatable engine that grows the audience, keeps the CRM clean enough to act on, and hands sales collateral it can actually use in live conversations.</p>`,
      },
      {
        id: "role",
        icon: "compass",
        title: "My role",
        body: `
<p>I owned content strategy for three AI products end to end, ran CRM segmentation, coordinated cross-functional pre-sales logistics, and produced the sales collateral carried into client meetings. I also handled logistics for trade shows and roundtables and documented internal workflows so the process could outlive any one person.</p>`,
      },
      {
        id: "approach",
        icon: "lightbulb",
        title: "Approach",
        diagram: "growthLoop",
        body: `
<p>Rather than a posting calendar, I built a loop where each stage feeds the next and the dashboards decide what gets repeated.</p>
<ul class="check-list">
  <li>[[check]]<span><strong>Research before publishing.</strong> Competitor and market research shaped positioning for each product so content spoke to a specific buyer rather than a generic "AI" audience.</span></li>
  <li>[[check]]<span><strong>A content system, not a calendar.</strong> Multi-channel campaigns across LinkedIn, Instagram, and email were planned around product themes, with automation sequences keeping engagement consistent across the funnel.</span></li>
  <li>[[check]]<span><strong>Clean data first.</strong> I re-segmented the CRM and enforced data hygiene so that leads could be routed and followed up on with confidence.</span></li>
  <li>[[check]]<span><strong>Dashboards that drive decisions.</strong> I built performance dashboards tracking lead generation, conversions, engagement, and ROI, then used them in weekly reviews to double down on what worked.</span></li>
  <li>[[check]]<span><strong>Marketing in service of sales.</strong> I worked with sales, design, and product on campaign planning and built the collateral the team used in demos and events.</span></li>
</ul>`,
      },
      {
        id: "decisions",
        icon: "target",
        title: "Key decisions",
        body: `
<ul class="decision-list">
  <li><span class="decision-choice">Organic-only, by constraint</span><span class="decision-why">With no paid budget, distribution had to be earned. That pushed effort into positioning and consistency instead of reach buying, and made the CRM the place where compounding actually showed up.</span></li>
  <li><span class="decision-choice">Fix the data before scaling the content</span><span class="decision-why">Publishing faster on top of an inconsistent CRM would have produced leads nobody could route. Segmentation came first, which is why the eight qualified leads could be followed up on at all.</span></li>
  <li><span class="decision-choice">Weekly review as the steering wheel</span><span class="decision-why">Dashboards only matter if something changes because of them. Tying them to a weekly plan turned reporting from an artifact into the mechanism that concentrated effort on what was working.</span></li>
</ul>`,
      },
      {
        id: "results",
        icon: "bar-chart",
        title: "Results",
        body: `
<div class="results">
  <div class="stat"><div class="stat-value" data-count-to="54" data-count-suffix="%">54%</div><div class="stat-label">Increase in organic audience growth in a single month</div></div>
  <div class="stat"><div class="stat-value" data-count-to="84.9" data-count-suffix="%" data-count-decimals="1">84.9%</div><div class="stat-label">Lift in average LinkedIn post views</div></div>
  <div class="stat"><div class="stat-value" data-count-to="25" data-count-suffix="%">25%</div><div class="stat-label">Rise in Instagram followers in the same month</div></div>
</div>
<p>All of this came with no paid spend. On the pipeline side, the work sourced <strong>eight sales-qualified leads</strong> and converted <strong>three to demo stage</strong>. The internal workflow documentation reduced process friction across the team and made it possible to hand parts of the system to teammates.</p>
<div class="callout"><p><strong>Why it mattered:</strong> the promotion from intern to consultant came directly from this work. The team now has a measurable content engine and a CRM it can trust, rather than a collection of one-off posts.</p></div>`,
      },
      {
        id: "learned",
        icon: "book-open",
        title: "What I learned",
        body: `
<p>Organic growth is an operations problem as much as a creative one. The biggest gains came from consistency, clean data, and tight feedback loops between dashboards and the next week's plan, not from any single post. I also learned to treat marketing output as a product for the sales team, with their live conversations as the real test of whether the collateral works.</p>`,
      },
    ],
  },

  {
    slug: "solar-aquatic-weed-harvester",
    icon: "sun",
    kicker: "Case study &middot; Robotics and systems design",
    kickerIcon: "sun",
    title: "Solar-powered autonomous aquatic weed harvester",
    cardTitle: "Solar-powered aquatic weed harvester",
    tags: ["Robotics", "Arduino", "Systems design"],
    cardSummary:
      "An autonomous harvester integrating LiDAR navigation, blade cutting, biomass compression, spiked conveyor transport, and drainage.",
    homeSummary:
      "Leading the design and build of an autonomous harvester that integrates LiDAR navigation, blade cutting, biomass compression, and conveyor transport.",
    seoTitle: "Case Study: Solar-Powered Autonomous Aquatic Weed Harvester",
    seoDescription:
      "How Rohan Basava led the build of a solar-powered aquatic weed harvester with LiDAR navigation, conveyor transport, and biomass compression.",
    lead:
      "Invasive aquatic weeds choke waterways, block sunlight, and are expensive to clear by hand. I led the design and build of a solar-powered harvester that could navigate, cut, collect, and compress weeds autonomously.",
    meta: [
      { icon: "briefcase", label: "Role", value: "Project lead, design and build" },
      { icon: "cpu", label: "Control", value: "Arduino" },
      { icon: "compass", label: "Navigation", value: "LiDAR" },
      { icon: "sun", label: "Power", value: "Solar" },
    ],
    sections: [
      {
        id: "problem",
        icon: "flag",
        title: "The problem",
        body: `
<p>Manual weed removal is slow and labour-intensive, and fuel-powered harvesters bring their own emissions and operating costs to the water they are meant to protect. The goal was a self-contained platform that could run on solar power, move through a water body on its own, and handle the entire cycle from cutting to collection without an operator on board.</p>`,
      },
      {
        id: "role",
        icon: "compass",
        title: "My role",
        body: `
<p>I led the project: scoping the platform, splitting it into subsystem workstreams, owning the design and build alongside the team, and keeping integration on schedule.</p>`,
      },
      {
        id: "architecture",
        icon: "layers",
        title: "System architecture",
        diagram: "harvesterFlow",
        body: `
<p>I broke the harvester into subsystems so that each could be designed, tested, and iterated independently before integration:</p>
<ul class="check-list">
  <li>[[check]]<span><strong>Control.</strong> An Arduino-based controller coordinates navigation, cutting, and transport, chosen for its low power draw and how quickly the team could iterate on firmware.</span></li>
  <li>[[check]]<span><strong>Navigation.</strong> LiDAR sensing gives the platform obstacle awareness and lets it hold a course across open water without an operator.</span></li>
  <li>[[check]]<span><strong>Cutting.</strong> A blade assembly at the front severs weeds at the waterline as the harvester moves forward.</span></li>
  <li>[[check]]<span><strong>Transport.</strong> A spiked conveyor lifts cut biomass out of the water and carries it into the hold, so nothing has to be scooped manually.</span></li>
  <li>[[check]]<span><strong>Compression and drainage.</strong> Collected biomass is compressed to make the most of limited onboard capacity, and a drainage path sheds water so the platform is not hauling dead weight.</span></li>
  <li>[[check]]<span><strong>Power.</strong> Solar panels feed the electronics and drive systems, keeping the harvester emission-free on the water.</span></li>
</ul>`,
      },
      {
        id: "decisions",
        icon: "target",
        title: "Design decisions and trade-offs",
        body: `
<p>The hardest constraint was energy. Every subsystem competed for the same solar budget, so I prioritised low-draw components and sequenced operations rather than running everything at once. Compression and drainage were added specifically because onboard capacity, not cutting speed, turned out to be the real limit on how long the harvester could work between unloads. The spiked conveyor replaced an earlier idea of a scoop because it handled tangled, wet material far more reliably.</p>
<ul class="decision-list">
  <li><span class="decision-choice">Sequence subsystems instead of running them in parallel</span><span class="decision-why">A shared solar budget meant peak draw, not average draw, set the component sizing. Sequencing kept the platform within budget without a larger array.</span></li>
  <li><span class="decision-choice">Spiked conveyor over a scoop</span><span class="decision-why">Tangled, wet biomass defeated the scoop concept. The conveyor handled the same material reliably and removed the need for any manual collection step.</span></li>
  <li><span class="decision-choice">Add compression and drainage late</span><span class="decision-why">Testing showed hold capacity, not cutting speed, capped the working session. Compressing the biomass and shedding water addressed the binding constraint rather than the obvious one.</span></li>
</ul>
<div class="callout"><p><strong>Leadership on the project:</strong> beyond the engineering, I owned the scoping, split the work into subsystem workstreams, and kept integration on schedule, which is the same structure I now use for team projects at Purdue.</p></div>`,
      },
      {
        id: "outcome",
        icon: "bar-chart",
        title: "Outcome",
        body: `
<div class="results">
  <div class="stat"><div class="stat-value" data-count-to="6">6</div><div class="stat-label">Subsystems designed, tested, and integrated into one platform</div></div>
  <div class="stat"><div class="stat-value">0</div><div class="stat-label">Onboard operators and no fuel: solar powers the full cycle</div></div>
  <div class="stat"><div class="stat-value">1</div><div class="stat-label">Continuous cycle from cutting through to compressed storage</div></div>
</div>
<p>The harvester came together as a single solar-powered platform that cuts at the waterline, lifts biomass aboard by conveyor, compresses it, and sheds the water it carries, navigating under LiDAR rather than an operator. Getting there meant each subsystem earned its place on a fixed energy budget before it was allowed into the integration.</p>`,
      },
      {
        id: "learned",
        icon: "book-open",
        title: "What I learned",
        body: `
<p>Integration is where projects live or die. Each subsystem worked alone long before they worked together, and the schedule had to leave real time for that. I also learned to design around the binding constraint (here, energy and hold capacity) instead of optimising the parts that were already good enough.</p>`,
      },
    ],
  },

  {
    slug: "geiger-counter-prototype",
    icon: "radio",
    kicker: "Case study &middot; Hardware prototyping",
    kickerIcon: "radio",
    title: "Geiger counter: from concept to a working 3D-printed prototype",
    cardTitle: "Geiger counter, concept to working prototype",
    tags: ["PCB design", "3D printing", "Prototyping"],
    cardSummary:
      "Three design iterations and a PCB revision took a radiation detector from idea to a functioning 3D-printed prototype.",
    homeSummary:
      "Three design iterations and a PCB revision took a radiation detector from idea to a functioning 3D-printed prototype for Purdue's Sustainable Energy Club.",
    seoTitle: "Case Study: Geiger Counter From Concept to 3D-Printed Prototype",
    seoDescription:
      "How Rohan Basava took a Geiger counter from concept to a working 3D-printed prototype at Purdue's Sustainable Energy Club in three iterations.",
    lead:
      "As Chief Technology Engineer of the Sustainable Energy Club of Purdue, I drove a Geiger counter from an idea on a whiteboard to a functioning, 3D-printed prototype.",
    meta: [
      { icon: "briefcase", label: "Role", value: "Chief Technology Engineer" },
      { icon: "users", label: "Organization", value: "Sustainable Energy Club of Purdue" },
      { icon: "settings", label: "Iterations", value: "3 designs, 1 PCB revision" },
      { icon: "wrench", label: "Tools", value: "Fusion 360, PCB design, 3D printing" },
    ],
    sections: [
      {
        id: "context",
        icon: "flag",
        title: "Context",
        body: `
<p>The Sustainable Energy Club is a student-run engineering club of around 100 members that designs and prototypes sustainable energy solutions. I sit on the leadership board as the senior technical lead, reporting to the club head and directing the Assembly &amp; Build Team across all technical operations, including five concurrent initiatives spanning hydroelectric, wind, solar, an incubation center, and Purdue's Farmers Market.</p>
<p>The Geiger counter was one of the first projects I owned end to end. A radiation detector is a useful instrument for an energy club, and it was also a good vehicle for building the club's capability in PCB design, enclosure design, and rapid prototyping.</p>`,
      },
      {
        id: "process",
        icon: "compass",
        title: "Process",
        diagram: "geigerSteps",
        body: `
<ul class="check-list">
  <li>[[check]]<span><strong>Concept and scoping.</strong> Defined what the device needed to do, what it would cost, and which parts the team could realistically fabricate in-house.</span></li>
  <li>[[check]]<span><strong>Iteration one.</strong> A first enclosure and board layout to prove the core detection circuit and identify what did not fit.</span></li>
  <li>[[check]]<span><strong>Iteration two.</strong> A redesigned enclosure in Fusion 360, with design-for-manufacturing changes so the housing printed cleanly and assembled without rework.</span></li>
  <li>[[check]]<span><strong>PCB revision.</strong> A revised board that corrected the issues surfaced in testing and tightened the layout for the final enclosure.</span></li>
  <li>[[check]]<span><strong>Iteration three.</strong> The integrated, working prototype: revised PCB inside the final 3D-printed housing.</span></li>
</ul>`,
      },
      {
        id: "decisions",
        icon: "target",
        title: "Key decisions",
        body: `
<ul class="decision-list">
  <li><span class="decision-choice">Scope to what the team could fabricate in-house</span><span class="decision-why">Scoping against the club's own printers and assembly capability kept iteration cycles short, which matters more than part quality on a volunteer team.</span></li>
  <li><span class="decision-choice">Design the enclosure for the printer, not just the part</span><span class="decision-why">Building design-for-manufacturing changes into iteration two is why it printed cleanly and assembled without rework, and why it moved faster than iteration one.</span></li>
  <li><span class="decision-choice">Let testing trigger the board revision</span><span class="decision-why">Holding the PCB revision until testing had surfaced real issues meant one revision did the work of several speculative ones.</span></li>
</ul>`,
      },
      {
        id: "outcome",
        icon: "bar-chart",
        title: "Outcome",
        body: `
<div class="results">
  <div class="stat"><div class="stat-value" data-count-to="3">3</div><div class="stat-label">Design iterations from concept to prototype</div></div>
  <div class="stat"><div class="stat-value" data-count-to="1">1</div><div class="stat-label">PCB revision informed by testing</div></div>
  <div class="stat"><div class="stat-value" data-count-to="100" data-count-suffix="+">100+</div><div class="stat-label">Members on the build team the process now supports</div></div>
</div>
<p>The result is a working 3D-printed Geiger counter and, just as importantly, a documented design and build loop the club can reuse on its other initiatives.</p>
<div class="callout"><p><strong>Beyond the device:</strong> this project became the template for how I run technical planning across the club's five initiatives: scope tightly, prototype early, and let testing drive the next revision.</p></div>`,
      },
      {
        id: "learned",
        icon: "book-open",
        title: "What I learned",
        body: `
<p>Design for manufacturing is not a finishing step. The second iteration went faster than the first because the enclosure was designed around how it would actually be printed and assembled. And on a volunteer team, a clear iteration plan does more for momentum than any single clever design choice.</p>`,
      },
    ],
  },
];

/* Projects shown as cards on the work index but without a dedicated page. */
export const otherProjects = [
  {
    icon: "settings",
    tags: ["World Robot Olympiad", "Mechanical design"],
    title: "Automated waste disposal system",
    body: "Designed and built a mechanical waste-handling prototype focused on efficiency, containment, and scalable deployment. Ranked 5th regionally and 38th nationally at the 2024 World Robot Olympiad.",
  },
  {
    icon: "wrench",
    tags: ["Fusion 360", "Arduino", "Servo control"],
    title: "4-DOF tendon-driven robotic arm",
    body: "Designed and built a four-degree-of-freedom arm in Fusion 360 using Arduino, servo motors, and timing belts, with motors pulling polymer wires to drive finger actuation.",
  },
  {
    icon: "lightbulb",
    tags: ["IoT", "Sensors", "Product development"],
    title: "WiFi-connected smart lighting",
    body: "As a product development intern at Maekers.com, programmed and tested Arduino controls, integrated proximity and light sensors, and compared IR options on cost and performance to move the product beyond timer-only operation.",
  },
  {
    icon: "zap",
    tags: ["Leadership", "Sustainable energy"],
    title: "Sustainable Energy Club technical operations",
    body: "As Chief Technology Engineer, own technical planning for five concurrent initiatives spanning hydroelectric, wind, solar, an incubation center, and Purdue's Farmers Market, directing a 100-member build team.",
  },
  {
    icon: "mic",
    tags: ["Founder", "Coaching"],
    title: "Debate club, founded from scratch",
    body: "Founded and led 10X International School's debate club, growing it to 20+ active members and designing workshops on argumentation, rebuttal, and public speaking.",
  },
  {
    icon: "pen-line",
    tags: ["Writing", "Long-form projects"],
    title: "Published novel and short story",
    body: "Wrote a full-length novel and published a short story adapted from it, carrying a long-form creative project from first draft through editing to release.",
  },
];
