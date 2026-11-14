<<<<<<< HEAD
# Sailaja Punyamanthula, portfolio

A dark, futuristic personal portfolio built with React, TypeScript, Tailwind CSS and Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then writes the site to dist/
npm run preview    # serves the production build locally
```

Requires Node 18 or newer.

## Fill in your details (the checklist)

Everything personal lives in two places. Anything left empty shows on the page as a dashed, clearly marked placeholder, so nothing is made up.

| What | Where |
| --- | --- |
| Email, phone, location, LinkedIn, GitHub, profile photo, closing line | `src/config/site.ts` |
| Employment dates and extra responsibilities | `src/data/experience.ts` |
| Technologies used, workflow details, links per project | `src/data/projects.ts` |
| Issuer, date, credential ID, verification link, certificate image | `src/data/certifications.ts` |
| Start year and graduation year, earlier education | `src/data/education.ts` |
| Achievements | `src/data/achievements.ts` |
| Skills | `src/data/skills.ts` |

### Resume

Put your PDF at `public/resume/Sailaja_Punyamanthula_Resume.pdf`. Both **Download resume** buttons then download it. Until the file exists, the button shows a message saying so instead of downloading anything. To use another file name, change `resume` in `src/config/site.ts`.

### Profile photo

Copy your photo to `public/images/` (for example `sailaja.jpg`, about 720 x 900 px) and set `profileImage: '/images/sailaja.jpg'` in `src/config/site.ts`.

### Certificate images

Copy images to `public/certs/` and set `image: '/certs/python.png'` on the certification, along with `verifyUrl` and `credentialId` once you have them.

## Make the contact form send email

The form validates input in the browser and only reports success when an email service confirms delivery. With no service configured, the Send button is disabled and a notice explains why (and offers an "Open in my email app" link once your email is set).

Pick one option and put it in a `.env` file (see `.env.example`):

1. **Web3Forms** (free, no server): create an access key at https://web3forms.com using your email, then set `VITE_WEB3FORMS_KEY=your-key`.
2. **Formspree or any JSON endpoint**: create a form at https://formspree.io, then set `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx`.

When you deploy (Vercel, Netlify and similar), add the same variables in the host's environment settings, then redeploy. Vite reads them at build time.

## Before you share the link

- Set `VITE_SITE_URL` (for example `https://your-site.vercel.app`) and rebuild. Social-preview image URLs must be absolute, so link previews on LinkedIn and WhatsApp only work once this is set.
- Replace the LinkedIn placeholder in `src/config/site.ts`.
- Add your resume PDF.

## Structure

```
src/
  config/site.ts          personal details and contact-form settings
  data/                   typed content for every section
  components/
    sections/             Navbar, Hero, About, Skills, Experience, Projects, ...
    ui/                   Button, GlassCard, Modal, Reveal, Timeline, Toaster, ...
    visual/               NeuralOrb (canvas), Background (particles), ProjectArt (SVG)
  hooks/                  scroll progress, active section, reduced motion
  lib/                    contact submission, resume download, smooth scroll
public/                   favicon, social image, resume folder
design/og-image.svg       source for public/og-image.png
```

To regenerate the social image after editing `design/og-image.svg`:
`rsvg-convert -w 1200 -h 630 design/og-image.svg -o public/og-image.png`

## Accessibility and performance

- Skip link, visible focus rings, full keyboard navigation, focus-trapped project dialog (Esc closes).
- `prefers-reduced-motion` stops the particles, orb rotation and reveal animations.
- Canvas animations pause when off-screen or when the tab is hidden.
- About 74 KB of JavaScript (gzipped). Fonts load from Google Fonts with a system-font fallback.

