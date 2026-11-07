/**
 * What the AI guide knows, derived from the same data the site renders.
 *  - guideTopics: curated quick answers that run in the browser (no network, no AI).
 *  - buildAiFacts(): verified app facts appended to the server-side system prompt.
 */
import { SITE, absoluteUrl } from '../config/site.js'
import { APPS, appPaths, purchaseState } from '../data/apps.js'
import projects from '../data/projects.js'

const statusSentence = (app) => {
  const s = purchaseState(app)
  const price = s.price ? ` Price: ${s.price.text}${s.price.region ? ` (${s.price.region})` : ''}; Apple shows the local price.` : ''
  return `${s.label}.${price}`
}

export const guideTopics = [
  {
    id: 'apps',
    label: 'Show me your apps',
    answer() {
      const list = APPS.map((a) => `${a.name} (${a.platform}): ${a.benefit} ${statusSentence(a)}`)
      return {
        text: [`Tali builds small, focused apps. ${APPS.length === 1 ? 'The first one is' : 'Here they are:'}`],
        bullets: list,
        links: [
          { label: 'Open the Apps showroom', href: '/apps' },
          ...APPS.map((a) => ({ label: `See ${a.name}`, href: appPaths(a).page })),
        ],
      }
    },
  },
  {
    id: 'picplace',
    label: 'What does PicPlace do?',
    answer() {
      const app = APPS.find((a) => a.slug === 'picplace') ?? APPS[0]
      const paths = appPaths(app)
      return {
        text: [`${app.tagline} ${app.description}`, statusSentence(app)],
        bullets: app.features.slice(0, 4).map((f) => `${f.title}: ${f.detail}`),
        links: [
          { label: `${app.name} product page`, href: paths.page },
          { label: 'Privacy Policy', href: paths.privacy },
          { label: 'Support', href: paths.support },
        ],
      }
    },
  },
  {
    id: 'project',
    label: 'Tell me about this project',
    answer() {
      return {
        text: [
          'This site is Tali’s workshop: his portfolio plus a showroom for the apps he builds. It runs on React, Vite, and Tailwind CSS, served by a small Express server.',
          `I’m a stylized AI guide based on Tali’s public portfolio, not Tali in real time. These quick topics are written ahead of time and run in your browser. Questions you type go through the site’s server to ${SITE.chatProvider} to generate a reply, and the site doesn’t save transcripts.`,
        ],
        links: [
          { label: 'Browse projects', href: '/#projects' },
          { label: 'Tali on GitHub', href: SITE.social.github },
        ],
      }
    },
  },
  {
    id: 'built',
    label: 'What has Tali built?',
    answer() {
      return {
        text: ['A mix of AI, biomedical hardware, and fintech:'],
        bullets: projects.map((p) => `${p.title}: ${p.highlights.join(', ')}`),
        links: [
          { label: 'See all projects', href: '/#projects' },
          { label: 'Experience', href: '/#experience' },
        ],
      }
    },
  },
  {
    id: 'contact',
    label: 'How can I reach Tali?',
    answer() {
      return {
        text: ['Email works best. You can also find Tali on LinkedIn and GitHub.'],
        links: [
          { label: SITE.contactEmail, href: `mailto:${SITE.contactEmail}` },
          { label: 'LinkedIn', href: SITE.social.linkedin },
          { label: 'GitHub', href: SITE.social.github },
        ],
      }
    },
  },
]

/** Plain text for narration and for sending curated turns as chat history. */
export function answerToText(answer) {
  return [...answer.text, ...(answer.bullets ?? []).map((b) => `• ${b}`)].join('\n')
}

/** Verified app facts for the server-side system prompt. */
export function buildAiFacts() {
  const lines = [
    'VERIFIED APP FACTS (from the site’s app catalog — the only source of truth for apps):',
  ]
  for (const app of APPS) {
    const s = purchaseState(app)
    const paths = appPaths(app)
    lines.push(
      '',
      `${app.name} — "${app.tagline}"`,
      `- Platform: ${app.platform}. ${app.requirements ?? ''}`.trim(),
      `- Status: ${s.label}.${s.storeUrl ? ` App Store: ${s.storeUrl}` : ' No App Store link yet.'}`,
      `- Price: ${s.price ? `${s.price.text}${s.price.region ? ` in the ${s.price.region}` : ''}; Apple shows the local price.` : 'not announced. Do not state or guess a price.'}`,
      '- Launch date: not announced. Do not state or guess a date.',
      `- What it does: ${app.description}`,
      ...app.features.map((f) => `- ${f.title}: ${f.detail}`),
      ...(app.copy.details?.goodToKnow ?? []).map((t) => `- Note: ${t}`),
      `- Product page: ${absoluteUrl(paths.page)} | Privacy Policy: ${absoluteUrl(paths.privacy)} | Support: ${absoluteUrl(paths.support)} (email ${app.support.email})`,
    )
  }
  lines.push(
    '',
    'If asked about an app feature, price, platform, or date not listed above, say it isn’t announced and point to the product or support page. Never invent one.',
  )
  return lines.join('\n')
}
