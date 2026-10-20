export const SEED_LEARNING_PATHS = [
  {
    id: 'path_frontend',
    title: 'Modern Frontend Development',
    slug: 'frontend-dev',
    category: 'Engineering',
    icon: 'Code',
    badge: 'Popular',
    level: 'Beginner Friendly',
    estimatedHours: '8 hours',
    description: 'Learn modern responsive layouts, semantic markup, and component design patterns. Build clean interfaces that impress clients.',
    overview: 'This path equips you with practical frontend skills directly demanded by startup clients on MintGig. You will build mobile-first components and prove your mastery before unlocking paid frontend gigs.',
    skillsAwarded: ['Responsive Design', 'HTML5 & CSS3', 'JavaScript Interactivity'],
    lessons: [
      {
        id: 'les_fe_1',
        title: 'Modern Box Model & Flexbox Fundamentals',
        duration: '20 min',
        content: `### Understanding Modern Layouts

Modern client gigs demand pixel-perfect responsive layouts that adapt seamlessly from mobile devices (320px) to ultra-wide displays.

#### Key Principles:
1. **Mobile-First Thinking**: Start with the minimal container constraints. Use flex-col as the base and shift to flex-row at breakpoint thresholds (min-width: 768px).
2. **Predictable Spacing**: Rely on consistent 4px/8px multiples (Tailwind's p-4, gap-6, mb-8).
3. **Semantic Landmarks**: Always utilize proper \`<header>\`, \`<main>\`, \`<section>\`, and \`<button>\` tags instead of generic clickable divs.

#### Practical Tip:
When implementing pricing tiers or product cards, ensure equal height cards using \`flex flex-col justify-between\` so action buttons align across cards regardless of description length.`,
        completed: true
      },
      {
        id: 'les_fe_2',
        title: 'Component State & Accessible Interactivity',
        duration: '25 min',
        content: `### Accessible Interactivity

Clients on MintGig frequently look for interactive components such as FAQs, tab switchers, and filter panels.

#### What Makes a Great Component:
- **Keyboard Navigation**: Users should be able to tab through buttons and trigger with Space / Enter.
- **ARIA Attributes**: Use \`aria-expanded="true/false"\` on toggles.
- **State Hygiene**: Avoid redundant state variables; derive UI state when possible.`,
        completed: true
      },
      {
        id: 'les_fe_3',
        title: 'Responsive Card Grids & Micro-Interactions',
        duration: '30 min',
        content: `### Micro-Interactions That Wow Clients

Subtle hover effects and smooth transitions differentiate amateur work from professional engineering.

\`\`\`css
/* Smooth hover scale and border highlight */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-2px);
box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
\`\`\`

Always test with touch events on mobile screens to ensure hover states do not leave sticky artifacts.`,
        completed: false
      }
    ],
    challenges: [
      {
        id: 'ch_fe_1',
        title: 'Build a Responsive Pricing Card Component',
        difficulty: 'Beginner',
        points: 100,
        skillUnlocked: 'Responsive Design',
        unlockedGigCount: 2,
        timeEstimate: '30 mins',
        summary: 'Construct an interactive, responsive 3-tier pricing card system with toggleable billing (Monthly/Annually).',
        brief: `You have been contracted by a SaaS startup to build an accessible, responsive pricing component. 

### Requirements:
1. Must feature at least 2 or 3 distinct pricing plans (e.g. Starter, Pro, Enterprise).
2. Include a highlighted "Most Popular" or "Recommended" card with a visual badge.
3. Add a billing toggle (Monthly / Annual) with a 20% discount indicator.
4. Ensure full responsiveness: 1 column on mobile screens, 3 columns on desktop.
5. All buttons must have visible active/hover states.`,
        criteria: [
          'Responsive layout adapts across screen sizes (mobile to desktop)',
          'Clear visual hierarchy with prominent "Pro" recommendation',
          'Interactive toggle for Monthly vs Annual pricing with dynamic price calculations',
          'Clean, semantic markup with accessible button labels',
          'Submission contains live demo URL or fully functional code snippet'
        ],
        starterCode: `// Starter Code Template: Pricing Card Component
function PricingCards() {
  const [annual, setAnnual] = React.useState(false);

  const plans = [
    { name: "Starter", monthly: 15, annual: 12, features: ["5 Projects", "Community Support", "Basic Analytics"] },
    { name: "Pro", monthly: 39, annual: 29, popular: true, features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Domain"] },
    { name: "Enterprise", monthly: 99, annual: 79, features: ["Dedicated Account Mgr", "SLA Guarantee", "Custom Integrations", "Audit Logs"] }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Build your pricing component here */}
    </div>
  );
}`
      },
      {
        id: 'ch_fe_2',
        title: 'Interactive FAQ Accordion with Keyboard Support',
        difficulty: 'Intermediate',
        points: 150,
        skillUnlocked: 'JavaScript Interactivity',
        unlockedGigCount: 2,
        timeEstimate: '45 mins',
        summary: 'Build an expandable accordion that supports smooth animations and keyboard accessibility.',
        brief: `A fintech client requires an interactive Frequently Asked Questions component with single-expand or multi-expand functionality.

### Requirements:
1. Render 4 realistic questions with structured answers.
2. Clicking an accordion item smoothly reveals its answer while rotating the chevron icon.
3. Keyboard accessibility: user can focus via Tab and expand with Enter/Space.
4. Add a search input that filters FAQ questions in real time.`,
        criteria: [
          'Smooth chevron rotation and expand/collapse animation',
          'Real-time filter search bar working as user types',
          'Accessible aria attributes (aria-expanded, aria-controls)',
          'Clean responsive typography and border styling'
        ],
        starterCode: `// Starter FAQ Accordion Template
function FaqAccordion() {
  const faqs = [
    { q: "How are gig payouts processed?", a: "Payouts are released immediately to your wallet upon reviewer approval." },
    { q: "Can I apply to multiple gigs simultaneously?", a: "Yes, you can apply to any gig for which you have unlocked the required skill badge." },
    { q: "What happens if my submission needs revisions?", a: "The reviewer will leave specific feedback and you can re-submit within 48 hours." }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Complete implementation */}
    </div>
  );
}`
      }
    ]
  },
  {
    id: 'path_design',
    title: 'Graphic & UI Design Essentials',
    slug: 'graphic-design',
    category: 'Design',
    icon: 'Palette',
    badge: 'High Demand',
    level: 'Beginner',
    estimatedHours: '6 hours',
    description: 'Master color harmony, typography pairing, whitespace discipline, and UI asset preparation for real startups.',
    overview: 'Design clients on MintGig need crisp marketing graphics, social hero images, and Figma design tokens. This path gives you the practical visual foundations.',
    skillsAwarded: ['Visual Hierarchy', 'Brand Identity', 'UI Layout'],
    lessons: [
      {
        id: 'les_des_1',
        title: 'Color Contrast & Accessible Palettes',
        duration: '15 min',
        content: `### Color Theory for Digital Products

Accessible design isn't just a best practice—it is an absolute requirement for client satisfaction.

- Maintain at least a 4.5:1 contrast ratio for normal body copy against backgrounds.
- Reserve your high-chroma brand primary (such as MintGig Blue #2563eb) for primary calls to action.
- Use warm slates (#475569) for secondary text rather than low-contrast washed-out grays.`,
        completed: true
      },
      {
        id: 'les_des_2',
        title: 'Typography Hierarchies That Convert',
        duration: '20 min',
        content: `### Establishing Hierarchy in UI

Every layout should answer: "Where should the user's eye travel first?"
1. **Headline (H1)**: Bold, tight letter-spacing (-0.025em), commanding attention.
2. **Subheadline**: Readable slate tone, 1.25x body size, answering the 'so what?'.
3. **Body & Microcopy**: Generous line-height (1.6) for optimal scanning.`,
        completed: false
      }
    ],
    challenges: [
      {
        id: 'ch_design_1',
        title: 'SaaS Landing Page Hero Design System',
        difficulty: 'Beginner',
        points: 100,
        skillUnlocked: 'Visual Hierarchy',
        unlockedGigCount: 2,
        timeEstimate: '40 mins',
        summary: 'Design a clean, conversion-focused hero layout with headline, social proof badge, and CTA buttons.',
        brief: `Design a high-converting hero section for a modern developer tool or SaaS startup. Provide a Figma link, Dribbble shot, or interactive HTML/CSS implementation.

### Deliverable:
- Hero banner with headline, subcopy, 2 CTA buttons (Primary & Ghost).
- Trust badges (e.g. "Loved by 10,000+ engineers at Stripe, Vercel, Figma").
- Consistent 8pt grid alignment.`,
        criteria: [
          'High visual contrast with accessible text hierarchy',
          'Professional color palette with defined primary/accent tokens',
          'Responsive desktop and mobile preview or mockups provided'
        ],
        starterCode: `/* Design Tokens Specification */
--primary-brand: #2563eb;
--primary-hover: #1d4ed8;
--surface-bg: #ffffff;
--surface-muted: #f8fafc;
--text-heading: #0f172a;
--text-body: #475569;`
      },
      {
        id: 'ch_design_2',
        title: 'Social Brand Style Guide & Color Tokens',
        difficulty: 'Beginner',
        points: 120,
        skillUnlocked: 'Brand Identity',
        unlockedGigCount: 1,
        timeEstimate: '35 mins',
        summary: 'Create a mini brand guide containing logo placement guidelines, 5 color tokens with hex values, and typography scale.',
        brief: `Create a concise, 1-page Brand Style Guide for a hypothetical climate-tech or fintech brand.`,
        criteria: [
          'Includes Primary, Secondary, Background, and Accent color swatches with Hex/RGB',
          'Font scale specification (H1, H2, H3, Body, Caption)',
          'Clear usage examples of dos and don’ts'
        ],
        starterCode: `// Brand Token Checklist
// 1. Primary Hue
// 2. Secondary Neutral
// 3. Highlight Accent
// 4. Contrast ratios verified for WCAG AA`
      }
    ]
  },
  {
    id: 'path_content',
    title: 'Social Media & Growth Content',
    slug: 'social-media',
    category: 'Content',
    icon: 'Share2',
    badge: 'Quick Wins',
    level: 'Beginner',
    estimatedHours: '5 hours',
    description: 'Write engaging launch tweets, viral LinkedIn hooks, and punchy product marketing blurbs.',
    overview: 'Tech startups constantly need concise, compelling copy for product announcements, feature drops, and customer engagement.',
    skillsAwarded: ['Content Copywriting', 'Growth Marketing'],
    lessons: [
      {
        id: 'les_con_1',
        title: 'The Architecture of a High-Engagement Hook',
        duration: '15 min',
        content: `### The First 3 Seconds

On social feeds, 80% of readers never make it past the first line. 
- Avoid: "We are thrilled to announce..." (Boring company-centric)
- Use: "Most junior developers make this 1 mistake when applying to freelance gigs. Here is how to fix it in 5 minutes:" (High value, curiosity)`,
        completed: false
      }
    ],
    challenges: [
      {
        id: 'ch_content_1',
        title: 'Product Launch Multi-Slide Carousel Script',
        difficulty: 'Beginner',
        points: 80,
        skillUnlocked: 'Content Copywriting',
        unlockedGigCount: 1,
        timeEstimate: '25 mins',
        summary: 'Draft a 5-slide educational carousel script explaining how to prepare for your first freelance contract.',
        brief: `Write a compelling 5-slide social carousel designed for LinkedIn or Instagram targeting beginner freelancers.`,
        criteria: [
          'Slide 1: High-impact hook',
          'Slides 2-4: Actionable, concise advice (under 40 words per slide)',
          'Slide 5: Clear Call to Action inviting comments or saves'
        ],
        starterCode: `Slide 1 (Hook): [Your bold statement here]
Slide 2: [Point 1 - The Mistake]
Slide 3: [Point 2 - The Framework]
Slide 4: [Point 3 - The Proof]
Slide 5 (CTA): [Closing question & save prompt]`
      }
    ]
  }
]

export const SEED_GIGS = [
  {
    id: 'gig_101',
    title: 'Build a Responsive Newsletter Subscription Box',
    clientId: 'usr_client_202',
    clientName: 'TechBloom Studios',
    clientCompany: 'TechBloom Studios',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Frontend',
    requiredSkills: ['Responsive Design'],
    unlockedByChallengeId: 'ch_fe_1',
    reward: 75,
    rewardCurrency: 'USD',
    difficulty: 'Beginner',
    deadline: '3 days',
    daysLeft: 3,
    status: 'open',
    tags: ['Tailwind CSS', 'HTML5', 'Responsive', 'Frontend'],
    applicantsCount: 3,
    description: `We need a clean, responsive newsletter signup box component for our tech blog. It will be embedded at the bottom of 50+ blog articles.

### Specifications:
- Desktop: Horizontal layout with email input, submit button, and privacy reassurance note.
- Mobile: Vertical stacked layout.
- Include client-side email format validation with helpful error state.
- Include a simulated success state when "Subscribe" is clicked.
- Style should be clean, modern slate-900 typography with emerald or blue CTA.`,
    deliverables: 'Provide a GitHub repository link or CodeSandbox/StackBlitz demo link with live preview.'
  },
  {
    id: 'gig_102',
    title: 'Interactive Tabbed Pricing & Feature Matrix',
    clientId: 'usr_client_202',
    clientName: 'TechBloom Studios',
    clientCompany: 'TechBloom Studios',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Frontend',
    requiredSkills: ['JavaScript Interactivity', 'Responsive Design'],
    unlockedByChallengeId: 'ch_fe_2',
    reward: 150,
    rewardCurrency: 'USD',
    difficulty: 'Intermediate',
    deadline: '5 days',
    daysLeft: 5,
    status: 'open',
    tags: ['React', 'JavaScript', 'Tailwind', 'Interactive'],
    applicantsCount: 1,
    description: `We are redesigning our SaaS pricing page and require a dynamic tab switcher that compares features across Free, Team, and Enterprise plans.

### Specifications:
- Toggle between Monthly and Annual billing with 20% badge.
- Interactive tooltip explanations when hovering over complex feature names.
- Clean collapsible feature categories (Security, Analytics, Support).
- Fully accessible via keyboard.`,
    deliverables: 'GitHub repository URL or deployed Vercel demo link with clean React source code.'
  },
  {
    id: 'gig_103',
    title: 'Design 3 Social Media Hero Cards for Product Hunt Launch',
    clientId: 'usr_client_202',
    clientName: 'TechBloom Studios',
    clientCompany: 'TechBloom Studios',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    requiredSkills: ['Visual Hierarchy'],
    unlockedByChallengeId: 'ch_design_1',
    reward: 80,
    rewardCurrency: 'USD',
    difficulty: 'Beginner',
    deadline: '2 days',
    daysLeft: 2,
    status: 'open',
    tags: ['Figma', 'Social Media', 'Visual Design', 'Branding'],
    applicantsCount: 2,
    description: `We are launching our AI productivity widget next Tuesday on Product Hunt and Twitter! We need 3 crisp 1200x630px social banner graphics that highlight our core features.

### Requirements:
- Banner 1: Hero announcement ("Introducing NextGen AI Notes")
- Banner 2: 3 key features grid with clean icons
- Banner 3: Launch discount promo card (50% Off First Month)`,
    deliverables: 'Shareable Figma file link with view/comment permissions, plus exported PNG preview files.'
  },
  {
    id: 'gig_104',
    title: 'Brand Guidelines Palette & Typography Sheet',
    clientId: 'usr_client_202',
    clientName: 'TechBloom Studios',
    clientCompany: 'TechBloom Studios',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    requiredSkills: ['Brand Identity'],
    unlockedByChallengeId: 'ch_design_2',
    reward: 95,
    rewardCurrency: 'USD',
    difficulty: 'Beginner',
    deadline: '4 days',
    daysLeft: 4,
    status: 'open',
    tags: ['Brand Identity', 'Typography', 'Figma', 'Colors'],
    applicantsCount: 0,
    description: `Create a clean 1-page visual brand cheat-sheet for our developers. It should define our color tokens (Hex/RGB/HSL), typography scale with line-heights, and spacing standards.`,
    deliverables: 'PDF export or Figma community file link.'
  },
  {
    id: 'gig_105',
    title: 'Write 5 High-Converting Launch Tweets & Thread',
    clientId: 'usr_client_202',
    clientName: 'TechBloom Studios',
    clientCompany: 'TechBloom Studios',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Content',
    requiredSkills: ['Content Copywriting'],
    unlockedByChallengeId: 'ch_content_1',
    reward: 60,
    rewardCurrency: 'USD',
    difficulty: 'Beginner',
    deadline: '2 days',
    daysLeft: 2,
    status: 'open',
    tags: ['Copywriting', 'Growth', 'Twitter', 'Content'],
    applicantsCount: 4,
    description: `We need a persuasive 6-tweet launch thread announcing our new developer productivity toolkit. Must follow hook → problem → demo screenshot placeholder → solution → CTA format.`,
    deliverables: 'Google Docs / Notion link or markdown text submission.'
  }
]

export const SEED_CHALLENGE_COMPLETIONS = [
  {
    id: 'comp_1',
    userId: 'usr_learner_101',
    challengeId: 'ch_fe_1',
    completedAt: '2026-10-18T14:20:00Z',
    status: 'passed',
    skillAwarded: 'Responsive Design',
    submissionText: 'Created a fully responsive 3-tier card system using CSS Grid and Flexbox with live pricing toggle.',
    projectUrl: 'https://github.com/alexrivera/responsive-pricing-card',
    score: 95,
    feedback: 'Excellent semantic structure and smooth flexbox wrapping on mobile breakpoints!'
  }
]

export const SEED_APPLICATIONS = [
  {
    id: 'app_1',
    gigId: 'gig_101',
    userId: 'usr_learner_101',
    appliedAt: '2026-10-19T09:15:00Z',
    status: 'accepted', // applied, accepted, rejected, completed
    pitch: 'Hi Sarah! I recently completed the MintGig Responsive Design challenge with a 95% score and built a custom responsive newsletter component with real-time regex validation.',
    relevantSkills: ['Responsive Design', 'HTML5 & CSS3']
  }
]

export const SEED_SUBMISSIONS = [
  {
    id: 'sub_1',
    gigId: 'gig_101',
    gigTitle: 'Build a Responsive Newsletter Subscription Box',
    userId: 'usr_learner_101',
    userName: 'Alex Rivera',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    submittedAt: '2026-10-19T16:30:00Z',
    projectUrl: 'https://github.com/alexrivera/techbloom-newsletter-box',
    liveDemoUrl: 'https://techbloom-newsletter.vercel.app',
    notes: 'Implemented the horizontal desktop and stacked mobile layouts with full keyboard focus rings and toast notification for success state.',
    status: 'approved', // submitted, under_review, revision_requested, approved, rejected
    reward: 75,
    clientId: 'usr_client_202',
    reviewedBy: 'usr_reviewer_303',
    reviewerName: 'Marcus Vance',
    reviewedAt: '2026-10-19T18:45:00Z',
    reviewFeedback: 'Outstanding work Alex! Clean code, accessible form labels, and the mobile breakpoint transition is butter smooth. Approved for full simulated payout and added to verified portfolio.',
    rating: 5,
    portfolioEntryId: 'port_1'
  }
]

export const SEED_PORTFOLIO = [
  {
    id: 'port_1',
    userId: 'usr_learner_101',
    title: 'TechBloom Responsive Newsletter Subscription Box',
    gigId: 'gig_101',
    submissionId: 'sub_1',
    summary: 'A lightweight, zero-dependency responsive newsletter component with client-side validation and accessible ARIA attributes.',
    clientName: 'TechBloom Studios',
    verifiedSkills: ['Responsive Design', 'HTML5 & CSS3', 'UI Polish'],
    liveDemoUrl: 'https://techbloom-newsletter.vercel.app',
    projectUrl: 'https://github.com/alexrivera/techbloom-newsletter-box',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    approvedAt: '2026-10-19T18:45:00Z',
    reviewerFeedback: 'Outstanding work Alex! Clean code, accessible form labels, and smooth mobile breakpoint transition.',
    reviewerName: 'Marcus Vance',
    earnings: 75,
    isVerified: true
  }
]
