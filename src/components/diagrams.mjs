/* Process diagrams for case studies.
 *
 * Built from semantic HTML rather than SVG so the text stays selectable,
 * searchable and screen-reader friendly, and so each flow can reflow from a
 * horizontal row on desktop to a vertical stack on a phone. Connectors are
 * drawn in CSS, marked aria-hidden, and carry no meaning of their own.
 */
import { icon } from "../lib/icons.mjs";

function step(s, i) {
  const glyph = s.icon ? `<span class="flow-glyph" aria-hidden="true">${icon(s.icon)}</span>` : "";
  return `<li class="flow-step">
    <span class="flow-index" aria-hidden="true">${i + 1}</span>
    <span class="flow-body"><span class="flow-title">${glyph}${s.title}</span><span class="flow-note">${s.note}</span></span>
  </li>`;
}

function flow({ id, caption, steps, className = "" }) {
  const items = steps.map(step).join("");
  return `<figure class="diagram ${className}">
  <ol class="flow">${items}</ol>
  <figcaption class="diagram-caption">${caption}</figcaption>
</figure>`;
}

export const diagrams = {
  /* SeedlingLabs: the repeating operating loop behind the growth numbers. */
  growthLoop: () => `<figure class="diagram">
  <ol class="flow">${[
    { title: "Research", note: "Competitor and market work sets positioning per product" },
    { title: "Publish as a system", note: "Themed multi-channel campaigns, not a posting calendar" },
    { title: "Segment the CRM", note: "Clean records so leads can actually be routed" },
    { title: "Review dashboards", note: "Weekly read on leads, conversions, engagement, ROI" },
  ].map(step).join("")}</ol>
  <p class="flow-return" aria-hidden="true">${icon("arrow-up")} Each week's read sets the next week's plan</p>
  <figcaption class="diagram-caption">The operating loop: research feeds publishing, publishing feeds the CRM, and the weekly dashboard review decides what gets repeated. Sales collateral is produced from whatever the loop proves works.</figcaption>
</figure>`,

  /* Harvester: the physical path biomass takes, and what powers it. */
  harvesterFlow: () => `<figure class="diagram">
  <div class="rail rail-top"><span class="rail-label"><span class="rail-item">${icon("sun")} Solar power budget, shared by every subsystem</span></span></div>
  <ol class="flow">${[
    { icon: "wrench", title: "Cut", note: "Blade assembly severs weeds at the waterline" },
    { icon: "trending-up", title: "Lift", note: "Spiked conveyor carries cut biomass aboard" },
    { icon: "layers", title: "Compress", note: "Packs the hold to extend time between unloads" },
    { icon: "activity", title: "Drain", note: "Sheds water so the platform carries no dead weight" },
  ].map(step).join("")}</ol>
  <div class="rail rail-bottom"><span class="rail-label"><span class="rail-item">${icon("cpu")} Arduino control</span><span class="rail-item">${icon("compass")} LiDAR navigation</span><span class="rail-item">${icon("user")} No operator aboard</span></span></div>
  <figcaption class="diagram-caption">Biomass moves through four stages in one continuous cycle. Power sits above every stage as the binding constraint; control and navigation run underneath the whole platform.</figcaption>
</figure>`,

  /* Geiger counter: three iterations with a board revision in between. */
  geigerSteps: () =>
    flow({
      id: "geiger-steps",
      className: "diagram-steps",
      caption:
        "Each stage was allowed to fail cheaply. Testing on iteration two, not speculation, is what defined the single PCB revision.",
      steps: [
        { title: "Scope", note: "What it must do, what it costs, what the team can fabricate in-house" },
        { title: "Iteration 1", note: "First enclosure and board layout to prove the detection circuit" },
        { title: "Iteration 2", note: "Fusion 360 redesign with design-for-manufacturing changes" },
        { title: "PCB revision", note: "Corrects what testing surfaced, tightens layout for the final housing" },
        { title: "Iteration 3", note: "Revised board inside the final printed housing: working prototype" },
      ],
    }),
};
