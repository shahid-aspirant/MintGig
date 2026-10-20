-- ==============================================================================
-- MintGig Supabase Seed Data
-- ==============================================================================

-- Seed Learning Paths
INSERT INTO public.learning_paths (id, title, slug, category, icon, badge, level, estimated_hours, description, overview, skills_awarded)
VALUES
(
  'path_frontend',
  'Modern Frontend Development',
  'frontend-dev',
  'Engineering',
  'Code',
  'Popular',
  'Beginner Friendly',
  '8 hours',
  'Learn modern responsive layouts, semantic markup, and component design patterns. Build clean interfaces that impress clients.',
  'This path equips you with practical frontend skills directly demanded by startup clients on MintGig. You will build mobile-first components and prove your mastery before unlocking paid frontend gigs.',
  ARRAY['Responsive Design', 'HTML5 & CSS3', 'JavaScript Interactivity']
),
(
  'path_design',
  'Graphic & UI Design Essentials',
  'graphic-design',
  'Design',
  'Palette',
  'High Demand',
  'Beginner',
  '6 hours',
  'Master color harmony, typography pairing, whitespace discipline, and UI asset preparation for real startups.',
  'Design clients on MintGig need crisp marketing graphics, social hero images, and Figma design tokens. This path gives you the practical visual foundations.',
  ARRAY['Visual Hierarchy', 'Brand Identity', 'UI Layout']
),
(
  'path_content',
  'Social Media & Growth Content',
  'social-media',
  'Content',
  'Share2',
  'Quick Wins',
  'Beginner',
  '5 hours',
  'Write engaging launch tweets, viral LinkedIn hooks, and punchy product marketing blurbs.',
  'Tech startups constantly need concise, compelling copy for product announcements, feature drops, and customer engagement.',
  ARRAY['Content Copywriting', 'Growth Marketing']
)
ON CONFLICT (id) DO NOTHING;

-- Seed Challenges
INSERT INTO public.challenges (id, path_id, title, difficulty, points, skill_unlocked, time_estimate, summary, brief, criteria)
VALUES
(
  'ch_fe_1',
  'path_frontend',
  'Build a Responsive Pricing Card Component',
  'Beginner',
  100,
  'Responsive Design',
  '30 mins',
  'Construct an interactive, responsive 3-tier pricing card system with toggleable billing (Monthly/Annually).',
  'You have been contracted by a SaaS startup to build an accessible, responsive pricing component with monthly/annual toggle.',
  '["Responsive layout adapts across screen sizes", "Clear visual hierarchy with recommended badge", "Interactive toggle calculates dynamic pricing", "Semantic accessible markup"]'::jsonb
),
(
  'ch_fe_2',
  'path_frontend',
  'Interactive FAQ Accordion with Keyboard Support',
  'Intermediate',
  150,
  'JavaScript Interactivity',
  '45 mins',
  'Build an expandable accordion that supports smooth animations and keyboard accessibility.',
  'A fintech client requires an interactive Frequently Asked Questions component with single or multi-expand functionality.',
  '["Smooth chevron rotation animation", "Real-time search filtering", "Accessible aria-expanded attributes", "Clean typography"]'::jsonb
),
(
  'ch_design_1',
  'path_design',
  'SaaS Landing Page Hero Design System',
  'Beginner',
  100,
  'Visual Hierarchy',
  '40 mins',
  'Design a clean, conversion-focused hero layout with headline, social proof badge, and CTA buttons.',
  'Design a high-converting hero section for a modern developer tool or SaaS startup with Figma or code tokens.',
  '["High visual contrast with accessible text hierarchy", "Defined color tokens", "Responsive mobile/desktop preview"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
