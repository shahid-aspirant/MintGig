# MintGig — Learn. Prove. Earn.

> **A 24-Hour Hackathon Prototype**  
> MintGig bridges practical skills education with beginner-friendly micro-work opportunities. Completing a practical skill challenge unlocks matching client gigs, and approved deliverables create an indisputable, evidence-backed public portfolio.

---

## 🚀 Key Differentiator: The 6-Step Evidence Loop

Traditional freelance platforms rely on unverified self-proclaimed resumes or bidding wars that disadvantage beginners. MintGig enforces an **Evidence-First** pipeline:

```
[ 1. Learn Skill ] ➔ [ 2. Prove Mastery (Challenge) ] ➔ [ 3. Unlock Client Gigs ]
                                                                  │
[ 6. Certified Portfolio + Payout ] 🠔 [ 5. Staff Review & QA ] 🠔 [ 4. Submit Deliverable ]
```

1. **Learn**: Follow structured tracks in Frontend Development, UI Design, or Social Media Content.
2. **Prove**: Pass hands-on practical challenges (e.g., responsive layouts, stateful components) evaluated against strict criteria.
3. **Unlock**: The platform certifies the skill badge, instantly granting eligibility to applied micro-gigs.
4. **Submit**: Learners provide code repository URLs, live deployed preview links, and implementation notes.
5. **Review**: Authorized reviewers evaluate code quality, provide actionable feedback, or request revisions. Learners cannot approve their own submissions.
6. **Earn & Showcase**: Simulated bounty released to learner wallet, and approved deliverables automatically generate verified public portfolio items with evaluator endorsements.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite (JavaScript, clean ES modules)
- **Styling**: Tailwind CSS with custom SaaS brand palette & glassmorphism
- **Routing**: React Router DOM (v6) with SPA redirects configuration
- **Icons**: Lucide React
- **Animations/Confetti**: Canvas-Confetti on skill unlock & payout certification
- **Backend / Database**:
  - **Production Mode**: Supabase PostgreSQL, Authentication, and Row Level Security (RLS) policies.
  - **Hackathon Demo Mode**: Robust LocalStorage dual-adapter ensuring full zero-dependency persistence, immediate evaluation, and offline resilience.

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js `v18.0.0` or higher (verified on `v20.20.0`)
- npm `v9.0.0` or higher (verified on `v10.8.2`)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Run Automated Core Logic Tests
```bash
npm test
```
Runs 8 automated unit & security checks including prerequisite locking, duplicate application prevention, self-review blocking, and role-escalation prevention.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, minified production bundle in `dist/`.

---

## 👥 Demo Accounts (1-Click Switcher)

You can toggle between roles instantaneously using the **top banner switcher** or sign in manually with these accounts:

| Persona | Name | Role | Email | Password |
|---|---|---|---|---|
| **Learner** | Alex Rivera | `learner` | `learner@mintgig.dev` | `password123` |
| **Client** | Sarah Chen (TechBloom Studios) | `client` | `client@mintgig.dev` | `password123` |
| **Staff Reviewer** | Marcus Vance | `reviewer` | `reviewer@mintgig.dev` | `password123` |

*Note: All earnings and financial balances are explicitly labeled simulated for hackathon demo purposes.*

---

## 🧪 Step-by-Step Hackathon Evaluation Walkthrough

Follow this 3-minute sequence to test the entire platform workflow end-to-end:

### Step 1: Check Pre-existing State as Alex (Learner)
1. Open the app as **Alex Rivera (Learner)**.
2. Go to **Gig Marketplace** (`/gigs`).
3. Notice that **"Build a Responsive Newsletter Subscription Box"** is **Unlocked** (because Alex previously proved Responsive Design).
4. Notice that **"Interactive Tabbed Pricing & Feature Matrix"** is **Locked** (requires *JavaScript Interactivity*).

### Step 2: Prove Mastery & Unlock the Locked Gig
1. Click **"Unlock Prereq"** or navigate to **Learning Paths** (`/paths/path_frontend`).
2. Open the **"Interactive FAQ Accordion with Keyboard Support"** challenge (`/challenges/ch_fe_2`).
3. Review the evaluation criteria, enter your solution in the interactive editor, and click **"Submit Challenge & Unlock Skill"**.
4. 🎉 Confetti triggers! The *"JavaScript Interactivity"* badge is awarded to your profile.

### Step 3: Apply & Submit Work
1. Return to the **Gig Marketplace** (`/gigs`).
2. Notice that the **Interactive Tabbed Pricing** gig is now **Unlocked**!
3. Click into the gig, enter a short pitch, and submit your application.
4. Click **"Submit Work Deliverable"** (`/gigs/gig_102/submit`).
5. Enter a demo URL (e.g. `https://github.com/alexrivera/pricing-matrix-react`), add notes, and click **"Submit Work for Review"**.

### Step 4: Evaluate as Marcus (Reviewer)
1. In the top banner, switch to **Marcus (Reviewer)**.
2. Navigate to **Reviewer Console** (`/reviewer`).
3. Alex's deliverable appears in the review queue.
4. Click **"Evaluate & Certify"**, select 5 stars, write feedback, and click **"Approve & Release Bounty"**.

### Step 5: Verify Earnings & Portfolio
1. Switch back to **Alex (Learner)**.
2. Observe Alex's **Simulated Wallet** balance increase by **$150**.
3. Navigate to **Verified Portfolios** (`/portfolio`) or **Learner Dashboard** (`/dashboard`).
4. The approved deliverable is now permanently featured as a verified evidence portfolio entry with Marcus's endorsement!

---

## 🛡️ Database & Security Architecture

The complete Supabase PostgreSQL schema and Row Level Security policies are located in:
- `supabase/schema.sql`: Full tables (`profiles`, `learning_paths`, `lessons`, `challenges`, `challenge_completions`, `gigs`, `gig_applications`, `work_submissions`, `portfolio_projects`), indexes, and RLS policies.
- `supabase/seed.sql`: Realistic seed data for paths, challenges, and sample gigs.

### Security Guarantees:
- **No Self-Review**: `work_submissions` RLS policy and local storage adapter prevent users from approving their own deliverables (`auth.uid() != user_id`).
- **No Privilege Escalation**: Role fields are protected against client-side profile tampering.
- **Duplicate Prevention**: Unique constraints on `(gig_id, user_id)` prevent spam or duplicate gig applications.
- **Prerequisite Validation**: Applications require verified challenge completion.
- **Client Ownership**: Clients can only manage and post gigs under their authorized ID.
- **Zero Secrets in Frontend**: Supabase publishable keys are safe for client-side queries; service role keys are never bundled.

---

## 🌐 Supabase Configuration

If connecting your hosted Supabase instance:
1. Log into your [Supabase Dashboard](https://supabase.com).
2. Open the **SQL Editor** and execute the contents of `supabase/schema.sql`.
3. Optionally execute `supabase/seed.sql` to populate sample records.
4. Copy your project URL and publishable anon key into `.env`:
   ```env
   VITE_SUPABASE_URL=https://sjwzlfwxdajgxjrbvjtc.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_rbI3VXtfRYjL53cgvN2PaQ_fAwMMacU
   ```
5. If Supabase is unreachable or offline, the platform automatically engages its **Local Persistent Storage Adapter** without crashing.

---

## 🚢 Deployment to Vercel

MintGig is pre-configured with `vercel.json` for seamless client-side SPA routing.

### Deploying via Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploying via GitHub:
1. Push repository to GitHub.
2. Import project into Vercel.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## 📄 License
MIT License. Built with passion for hackathon judging criteria.
