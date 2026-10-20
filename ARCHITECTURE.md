# 📖 MintGig Codebase Architecture & Plain-English Guide

This document explains **how the MintGig codebase is structured**, how data flows through the app, and how each key feature is implemented in simple, beginner-friendly terms.

---

## 🗺️ 1. Project Directory Structure

Here is how the project files are organized and what each one does:

```text
MintGig/
├── index.html                 # Main HTML entry point with fonts & meta tags
├── package.json               # Dependencies and scripts (dev, build, test)
├── tailwind.config.js         # Custom colors (MintGig blue, mint green)
├── vite.config.js             # Vite development server configuration
├── vercel.json                # Single-Page Application routing rewrite rules
│
├── tests/
│   └── businessLogic.test.js  # Automated tests checking critical rules
│
├── supabase/
│   ├── schema.sql             # PostgreSQL database tables & security policies
│   └── seed.sql               # Starter database rows for production
│
└── src/
    ├── main.jsx               # Mounts React to the DOM & wraps Context providers
    ├── App.jsx                # Declares all page routes (React Router)
    │
    ├── styles/
    │   └── index.css          # Tailwind directives, scrollbar & card utilities
    │
    ├── lib/                   # 🧠 CORE LOGIC & DATA
    │   ├── supabase.js        # Connects to Supabase when credentials exist
    │   ├── demoAccounts.js    # Seeded demo profiles (Alex, Sarah, Marcus)
    │   ├── seedData.js        # Starter paths, lessons, challenges, and gigs
    │   └── storageAdapter.js  # The "Brain": handles all reads, writes, & rules
    │
    ├── context/               # 🔄 REACT STATE MANAGEMENT
    │   ├── AuthContext.jsx    # Handles login, active user, and role switching
    │   └── DataContext.jsx    # Exposes gigs, challenges, applications & actions
    │
    ├── components/            # 🧩 REUSABLE UI PIECES
    │   ├── DemoSwitcherBanner.jsx # Top bar to quickly switch personas
    │   ├── Navbar.jsx         # Header with navigation & simulated wallet
    │   ├── Footer.jsx         # Footer with links & hackathon disclaimers
    │   ├── NotificationToast.jsx # Pop-up success/error messages
    │   ├── RoleBadge.jsx      # Colored pill indicating user role
    │   └── SkillBadge.jsx     # Displays proven vs locked skills
    │
    └── pages/                 # 📄 FULL APPLICATION SCREENS
        ├── LandingPage.jsx          # Public homepage with workflow diagrams
        ├── LoginPage.jsx            # Sign in & 1-click demo logins
        ├── SignUpPage.jsx           # Role-aware registration (Learner/Client/Reviewer)
        ├── LearnerDashboard.jsx     # Learner's home: skills, earnings, submissions
        ├── LearningPathsPage.jsx    # Catalog of learning tracks
        ├── PathDetailPage.jsx       # Reads micro-lessons & lists challenges
        ├── ChallengePage.jsx        # Interactive code editor to prove skills
        ├── GigMarketplacePage.jsx   # Search & filter gigs (Locked vs Unlocked)
        ├── GigDetailPage.jsx        # Gig brief, requirements & application form
        ├── WorkSubmissionPage.jsx   # Form to submit repo URLs & project notes
        ├── SubmissionDetailPage.jsx # Reviewer inspection, feedback & approval
        ├── PortfolioPage.jsx        # Public showcase of verified proof-of-work
        ├── ClientDashboard.jsx      # Client portal to post gigs & view applicants
        ├── ReviewerDashboard.jsx    # Staff reviewer queue for moderation & QA
        ├── ProfileSettingsPage.jsx  # Edit profile & system diagnostics
        └── NotFoundPage.jsx         # Clean 404 page for broken routes
```

---

## 🔄 2. How Data Flows (The 3 Layers)

MintGig is split into three clean layers that talk to each other:

```
┌────────────────────────────────────────────────────────┐
│  1. PRESENTATION LAYER (React Components & Pages)      │
│  User clicks buttons, types in forms, sees badges      │
└──────────────────────────┬─────────────────────────────┘
                           │ calls functions (e.g. completeChallenge)
┌──────────────────────────▼─────────────────────────────┐
│  2. STATE LAYER (AuthContext.jsx & DataContext.jsx)     │
│  Provides live reactive state, toasts, & confetti      │
└──────────────────────────┬─────────────────────────────┘
                           │ saves & retrieves
┌──────────────────────────▼─────────────────────────────┐
│  3. DATA LAYER (storageAdapter.js / Supabase)          │
│  Validates rules, checks eligibility, updates storage  │
└────────────────────────────────────────────────────────┘
```

---

## 💡 3. Plain-English Explanation of Core Features

### Feature A: How Challenges Unlock Matching Gigs
1. In `src/lib/seedData.js`, each gig specifies what skill it needs:
   ```javascript
   // Example: Gig 102 requires "JavaScript Interactivity"
   requiredSkills: ['JavaScript Interactivity', 'Responsive Design'],
   unlockedByChallengeId: 'ch_fe_2'
   ```
2. When the user visits `/gigs`, `storageAdapter.isGigUnlockedForUser(gig, userId)` runs:
   - Checks if the user has completed `ch_fe_2`.
   - If **NO**: The gig shows a 🔒 **"Prerequisite Required"** badge and button says **"Unlock Prereq"**.
   - If **YES**: The gig shows an 🔓 **"Unlocked"** badge and button says **"Apply Now"**.
3. When the user solves the challenge in `ChallengePage.jsx`:
   - It calls `completeChallenge()`.
   - The user's profile gains the new skill (`'JavaScript Interactivity'`).
   - Confetti bursts on screen!
   - Gigs requiring that skill automatically unlock immediately across the app.

---

### Feature B: Duplicate Application Prevention
In `src/lib/storageAdapter.js`:
```javascript
// Checks if the user already applied to this gig
const alreadyApplied = applications.some(a => a.gigId === gigId && a.userId === userId);
if (alreadyApplied) {
  throw new Error("You have already applied to this gig.");
}
```
If a user tries to apply twice, an informative alert is shown, and the UI shifts to **"Submit Work Deliverable"**.

---

### Feature C: Security Check (No Self-Reviews)
Learners must never be able to approve their own work. In `src/lib/storageAdapter.js`:
```javascript
// Authorization rule:
if (submission.userId === reviewerId) {
  throw new Error("Security Violation: You cannot review or approve your own submission.");
}
```
Only a designated reviewer (like **Marcus Vance**) or the hiring client (like **Sarah Chen**) can approve work.

---

### Feature D: Review Approval ➔ Verified Portfolio + Simulated Payout
When a reviewer clicks **"Approve & Release Bounty"**:
1. Submission status changes to `'approved'`.
2. A new record is added to `mintgig_portfolio_v1` with the project URL, reviewer feedback, and verified skill badges.
3. The learner's simulated wallet balance increases by the gig's bounty amount (e.g. `+$150`).
4. The project immediately appears on `/portfolio` with a **"Verified Deliverable"** shield badge.

---

## 🛠️ 4. How to Easily Add New Content

### How to add a new Learning Path or Challenge:
Open `src/lib/seedData.js` and add an object to `SEED_LEARNING_PATHS`:
```javascript
{
  id: 'path_ai',
  title: 'AI Prompt Engineering',
  category: 'AI',
  challenges: [
    {
      id: 'ch_ai_1',
      title: 'Write a Structured Few-Shot Prompt',
      skillUnlocked: 'Prompt Engineering',
      // ...
    }
  ]
}
```

### How to add a new Client Gig:
Open `src/lib/seedData.js` and add an object to `SEED_GIGS`:
```javascript
{
  id: 'gig_ai_101',
  title: 'Build Customer Support Prompt Templates',
  requiredSkills: ['Prompt Engineering'],
  unlockedByChallengeId: 'ch_ai_1',
  reward: 90,
  difficulty: 'Beginner'
}
```

---

## 🧪 5. How Automated Testing Works

The test file `tests/businessLogic.test.js` tests all business rules using Node.js's built-in test runner:
```bash
npm test
```
It tests 8 core rules in 60 milliseconds:
1. Locked gigs block applications.
2. Passing challenges awards skills and unlocks gigs.
3. Duplicate applications are blocked.
4. Deliverables can be submitted with links.
5. Learners cannot approve their own submissions.
6. Approvals increase wallet balance and populate the portfolio.
7. Role escalation via profile edits is forbidden.
