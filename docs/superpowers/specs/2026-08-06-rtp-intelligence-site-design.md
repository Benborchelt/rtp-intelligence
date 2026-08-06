# RTP Intelligence — Marketing Site Design

Date: 2026-08-06
Status: approved by Ben (brainstorm session)

## Purpose

Public web presence for RTP Intelligence LLC — hybrid AI venture studio + services firm.
Two jobs: (1) credible landing target for outreach links, (2) lead capture via contact form.

## Decisions (locked)

- **Stack/host**: static HTML/CSS/JS, GitHub Pages (`Benborchelt/rtp-intelligence`, Pages from main).
- **Domain**: bought later. Build domain-agnostic; add CNAME + canonical when ready.
- **Contact**: form → `formsubmit.co/bendborchelt@gmail.com` (zero-signup; first submit triggers
  activation email). Swap to domain email later.
- **Portfolio**: Slotted (links slottedgolf.org, live), Argus (in-house AI orchestration
  platform), MenuSafe (allergy-safe dining platform). No Plutus v1.
- **Positioning**: hybrid — "we build AI products" + "hire us for applied AI / outreach systems".
- **Tone**: confident/minimal. Short declarative lines.
- **Direction**: dark monolith — whole site near-black like logo, gold accents, cream display type.

## Visual system

- Colors from logo: bg `#0D0C0A`, surface `#14120F`, gold ramp `#8A6D2F → #E0A93E → #EFBF5B`,
  cream `#F2EDE4`.
- Type: display serif + grotesque body pair; letterspaced gold eyebrow labels echoing the
  INTELLIGENCE lockup.
- Motifs: pyramid/triangle hairline geometry, 1px gold borders on dark cards, subtle scroll
  reveals. Logo PNG background matches site background — sits seamless.

## Pages

```
index.html       hero + pillars + featured work + CTA band
portfolio.html   case cards (Slotted / Argus / MenuSafe)
contact.html     split: pitch + form
assets/css/style.css, assets/js/main.js
assets/img/      logo-full.png, mark crop, favicons, og-image
```

1. **index** — sticky nav (mark + wordmark; Portfolio, Contact; gold "Work with us" button).
   Hero: "Applied AI. Built in the Triangle." + hybrid subline, two CTAs. Three pillars:
   AI products (studio) / Applied-AI consulting / Intelligent outreach systems. Featured work
   3-up linking portfolio. Contact CTA band. Footer.
2. **portfolio** — intro line + one card per project: name, one-liner, description, tags,
   status/link. Styled monogram tiles, no screenshots v1.
3. **contact** — fields: name, email, company (optional), inquiry type (Consulting /
   Partnership / Product / Other), message. POST formsubmit.co; `_next` redirect back with
   `?sent=1` thank-you state; honeypot `_honey`.

## SEO / meta

Per-page title + description, OG image 1200×630 (dark, logo), favicon set from pyramid mark,
sitemap.xml, robots.txt. Canonical placeholder until domain.

## Verification

Local HTTP server + Playwright screenshots (1440 desktop, 375 mobile, all pages), form wiring
check, contrast/alt audit. Post-build multi-agent design/accessibility/copy review.

## Out of scope v1

Blog, analytics, CMS, screenshots in portfolio cards, Plutus card, custom domain email.
