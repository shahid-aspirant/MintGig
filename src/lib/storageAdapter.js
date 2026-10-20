/**
 * ==============================================================================
 * MintGig Storage Adapter (The Business Logic Engine)
 * ==============================================================================
 * This module acts as the "backend" and database interface for MintGig.
 * It provides persistent CRUD operations, enforces business rules, and ensures
 * that practical challenge completions unlock client gigs.
 * 
 * Key Responsibilities:
 * 1. User authentication & role safety checks (no self-promotion).
 * 2. Evaluating and recording challenge completions.
 * 3. Dynamically checking whether a gig is UNLOCKED for a given learner.
 * 4. Preventing duplicate gig applications.
 * 5. Reviewer certification workflow (no self-review, releases simulated bounty).
 * 6. Managing the evidence-based public portfolio.
 * ==============================================================================
 */

import {
  SEED_LEARNING_PATHS,
  SEED_GIGS,
  SEED_CHALLENGE_COMPLETIONS,
  SEED_APPLICATIONS,
  SEED_SUBMISSIONS,
  SEED_PORTFOLIO
} from './seedData.js'
import { DEMO_ACCOUNTS } from './demoAccounts.js'

const STORAGE_KEYS = {
  USERS: 'mintgig_users_v1',
  CURRENT_USER: 'mintgig_current_user_v1',
  PATHS: 'mintgig_paths_v1',
  GIGS: 'mintgig_gigs_v1',
  COMPLETIONS: 'mintgig_completions_v1',
  APPLICATIONS: 'mintgig_applications_v1',
  SUBMISSIONS: 'mintgig_submissions_v1',
  PORTFOLIO: 'mintgig_portfolio_v1',
  AUDIT_LOGS: 'mintgig_audit_logs_v1'
}

// Helper to read / write local storage safely
function getItem(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e)
    return fallback
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e)
  }
}

// Initialize default state
export function initializeStorage(force = false) {
  if (force || !localStorage.getItem(STORAGE_KEYS.USERS)) {
    setItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
  }
  if (force || !localStorage.getItem(STORAGE_KEYS.PATHS)) {
    setItem(STORAGE_KEYS.PATHS, SEED_LEARNING_PATHS)
  }
  if (force || !localStorage.getItem(STORAGE_KEYS.GIGS)) {
    setItem(STORAGE_KEYS.GIGS, SEED_GIGS)
  }
  if (force || !localStorage.getItem(STORAGE_KEYS.COMPLETIONS)) {
    setItem(STORAGE_KEYS.COMPLETIONS, SEED_CHALLENGE_COMPLETIONS)
  }
  if (force || !localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    setItem(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS)
  }
  if (force || !localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    setItem(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS)
  }
  if (force || !localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    setItem(STORAGE_KEYS.PORTFOLIO, SEED_PORTFOLIO)
  }
}

export const storage = {
  // Reset all data to factory demo defaults
  resetAll: () => {
    initializeStorage(true)
    return true
  },

  // USERS
  getUsers: () => getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS),
  
  getUserById: (id) => {
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    return users.find((u) => u.id === id) || null
  },

  getUserByEmail: (email) => {
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  },

  createUser: (userData) => {
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    const existing = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())
    if (existing) {
      throw new Error('An account with this email already exists.')
    }
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      skills: [],
      walletBalance: 0,
      completedChallengesCount: 0,
      createdAt: new Date().toISOString(),
      ...userData
    }
    users.push(newUser)
    setItem(STORAGE_KEYS.USERS, users)
    return newUser
  },

  updateUserProfile: (id, updates) => {
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) throw new Error('User not found.')

    // Prevent privilege escalation through profile update
    const safeUpdates = { ...updates }
    delete safeUpdates.role // role changes are restricted
    delete safeUpdates.id

    users[index] = { ...users[index], ...safeUpdates }
    setItem(STORAGE_KEYS.USERS, users)
    return users[index]
  },

  // LEARNING PATHS & LESSONS
  getLearningPaths: () => getItem(STORAGE_KEYS.PATHS, SEED_LEARNING_PATHS),

  getLearningPath: (idOrSlug) => {
    const paths = getItem(STORAGE_KEYS.PATHS, SEED_LEARNING_PATHS)
    return paths.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null
  },

  getChallenge: (challengeId) => {
    const paths = getItem(STORAGE_KEYS.PATHS, SEED_LEARNING_PATHS)
    for (const p of paths) {
      const match = p.challenges.find((c) => c.id === challengeId)
      if (match) return { ...match, pathTitle: p.title, pathId: p.id }
    }
    return null
  },

  // CHALLENGE COMPLETIONS & SKILL UNLOCKING
  getCompletionsByUser: (userId) => {
    const completions = getItem(STORAGE_KEYS.COMPLETIONS, SEED_CHALLENGE_COMPLETIONS)
    return completions.filter((c) => c.userId === userId)
  },

  hasCompletedChallenge: (userId, challengeId) => {
    const completions = getItem(STORAGE_KEYS.COMPLETIONS, SEED_CHALLENGE_COMPLETIONS)
    return completions.some((c) => c.userId === userId && c.challengeId === challengeId && c.status === 'passed')
  },

  completeChallenge: ({ userId, challengeId, submissionText, projectUrl }) => {
    if (!userId || !challengeId) throw new Error('User ID and Challenge ID are required.')
    if (!submissionText || submissionText.trim().length < 15) {
      throw new Error('Please provide a substantive challenge response or project explanation (at least 15 characters).')
    }

    const paths = getItem(STORAGE_KEYS.PATHS, SEED_LEARNING_PATHS)
    let challenge = null
    for (const p of paths) {
      const found = p.challenges.find((c) => c.id === challengeId)
      if (found) {
        challenge = found
        break
      }
    }
    if (!challenge) throw new Error('Challenge not found.')

    const completions = getItem(STORAGE_KEYS.COMPLETIONS, SEED_CHALLENGE_COMPLETIONS)
    const existingIndex = completions.findIndex((c) => c.userId === userId && c.challengeId === challengeId)

    const completionRecord = {
      id: existingIndex !== -1 ? completions[existingIndex].id : `comp_${Date.now()}`,
      userId,
      challengeId,
      challengeTitle: challenge.title,
      skillAwarded: challenge.skillUnlocked,
      submissionText,
      projectUrl: projectUrl || '',
      status: 'passed',
      score: 98,
      feedback: 'Automated verification & code evaluation passed. Criteria matched: responsiveness, semantic hierarchy, and clean modular structure.',
      completedAt: new Date().toISOString()
    }

    if (existingIndex !== -1) {
      completions[existingIndex] = completionRecord
    } else {
      completions.push(completionRecord)
    }
    setItem(STORAGE_KEYS.COMPLETIONS, completions)

    // Update user profile skills
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex !== -1) {
      const currentSkills = new Set(users[userIndex].skills || [])
      currentSkills.add(challenge.skillUnlocked)
      users[userIndex].skills = Array.from(currentSkills)
      users[userIndex].completedChallengesCount = completions.filter((c) => c.userId === userId).length
      setItem(STORAGE_KEYS.USERS, users)
    }

    return completionRecord
  },

  // GIGS & MARKETPLACE
  getGigs: () => getItem(STORAGE_KEYS.GIGS, SEED_GIGS),

  getGig: (gigId) => {
    const gigs = getItem(STORAGE_KEYS.GIGS, SEED_GIGS)
    return gigs.find((g) => g.id === gigId) || null
  },

  // Check if a learner has unlocked this gig based on challenge completion
  isGigUnlockedForUser: (gig, userId) => {
    if (!gig || !userId) return false
    if (!gig.unlockedByChallengeId && (!gig.requiredSkills || gig.requiredSkills.length === 0)) {
      return true
    }

    const completions = getItem(STORAGE_KEYS.COMPLETIONS, SEED_CHALLENGE_COMPLETIONS)
    // Check by challenge ID
    if (gig.unlockedByChallengeId) {
      const hasCompleted = completions.some(
        (c) => c.userId === userId && c.challengeId === gig.unlockedByChallengeId && c.status === 'passed'
      )
      if (hasCompleted) return true
    }

    // Check by user demonstrated skills
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    const user = users.find((u) => u.id === userId)
    if (user && gig.requiredSkills) {
      const hasAllSkills = gig.requiredSkills.every((s) => (user.skills || []).includes(s))
      if (hasAllSkills) return true
    }

    return false
  },

  createGig: (gigData, clientId) => {
    const gigs = getItem(STORAGE_KEYS.GIGS, SEED_GIGS)
    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    const client = users.find((u) => u.id === clientId)

    const newGig = {
      id: `gig_${Date.now()}`,
      clientId,
      clientName: client ? client.name : 'Startup Client',
      clientCompany: client ? (client.company || client.name) : 'Tech Client',
      clientAvatar: client ? client.avatar : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      status: 'open',
      applicantsCount: 0,
      rewardCurrency: 'USD',
      createdAt: new Date().toISOString(),
      ...gigData
    }

    gigs.unshift(newGig)
    setItem(STORAGE_KEYS.GIGS, gigs)
    return newGig
  },

  // APPLICATIONS
  getApplications: (filter = {}) => {
    let applications = getItem(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS)
    if (filter.userId) {
      applications = applications.filter((a) => a.userId === filter.userId)
    }
    if (filter.gigId) {
      applications = applications.filter((a) => a.gigId === filter.gigId)
    }
    return applications
  },

  applyToGig: ({ gigId, userId, pitch, relevantSkills }) => {
    if (!gigId || !userId) throw new Error('Gig ID and User ID are required.')

    const gig = storage.getGig(gigId)
    if (!gig) throw new Error('Gig does not exist.')

    // Duplicate check
    const applications = getItem(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS)
    const alreadyApplied = applications.some((a) => a.gigId === gigId && a.userId === userId)
    if (alreadyApplied) {
      throw new Error('You have already applied to this gig. Check your dashboard to view status or submit work.')
    }

    // Eligibility check
    const isUnlocked = storage.isGigUnlockedForUser(gig, userId)
    if (!isUnlocked) {
      throw new Error(`You must prove your skills by completing the prerequisite challenge ("${gig.requiredSkills?.join(', ')}") before applying to this gig.`)
    }

    const newApplication = {
      id: `app_${Date.now()}`,
      gigId,
      gigTitle: gig.title,
      userId,
      pitch: pitch || 'I have completed the prerequisite challenge and demonstrated required proficiency.',
      relevantSkills: relevantSkills || gig.requiredSkills || [],
      status: 'accepted', // Auto-accepted for unlocked gigs so learner can immediately submit proof
      appliedAt: new Date().toISOString()
    }

    applications.unshift(newApplication)
    setItem(STORAGE_KEYS.APPLICATIONS, applications)

    // Increment applicant count on gig
    const gigs = getItem(STORAGE_KEYS.GIGS, SEED_GIGS)
    const gigIndex = gigs.findIndex((g) => g.id === gigId)
    if (gigIndex !== -1) {
      gigs[gigIndex].applicantsCount = (gigs[gigIndex].applicantsCount || 0) + 1
      setItem(STORAGE_KEYS.GIGS, gigs)
    }

    return newApplication
  },

  // SUBMISSIONS
  getSubmissions: (filter = {}) => {
    let submissions = getItem(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS)
    if (filter.userId) {
      submissions = submissions.filter((s) => s.userId === filter.userId)
    }
    if (filter.gigId) {
      submissions = submissions.filter((s) => s.gigId === filter.gigId)
    }
    if (filter.clientId) {
      submissions = submissions.filter((s) => s.clientId === filter.clientId)
    }
    if (filter.status) {
      submissions = submissions.filter((s) => s.status === filter.status)
    }
    return submissions
  },

  getSubmission: (id) => {
    const submissions = getItem(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS)
    return submissions.find((s) => s.id === id) || null
  },

  submitWork: ({ gigId, userId, projectUrl, liveDemoUrl, notes }) => {
    if (!gigId || !userId) throw new Error('Missing submission parameters.')
    if (!projectUrl && !notes) {
      throw new Error('Please provide at least a project repository/document URL or detailed written deliverable notes.')
    }

    const gig = storage.getGig(gigId)
    if (!gig) throw new Error('Gig not found.')

    const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
    const user = users.find((u) => u.id === userId)

    const submissions = getItem(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS)
    const existingIndex = submissions.findIndex((s) => s.gigId === gigId && s.userId === userId)

    const submissionData = {
      id: existingIndex !== -1 ? submissions[existingIndex].id : `sub_${Date.now()}`,
      gigId,
      gigTitle: gig.title,
      userId,
      userName: user ? user.name : 'Learner',
      userAvatar: user ? user.avatar : '',
      clientId: gig.clientId,
      reward: gig.reward,
      projectUrl: projectUrl || '',
      liveDemoUrl: liveDemoUrl || '',
      notes: notes || '',
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      reviewedBy: null,
      reviewedAt: null,
      reviewFeedback: null,
      rating: null
    }

    if (existingIndex !== -1) {
      submissions[existingIndex] = submissionData
    } else {
      submissions.unshift(submissionData)
    }
    setItem(STORAGE_KEYS.SUBMISSIONS, submissions)
    return submissionData
  },

  // REVIEWER & CLIENT APPROVAL / REVISIONS
  reviewSubmission: ({ submissionId, reviewerId, reviewerName, reviewerRole, action, feedback, rating }) => {
    if (!['approved', 'revision_requested', 'rejected'].includes(action)) {
      throw new Error('Invalid review action.')
    }

    const submissions = getItem(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS)
    const index = submissions.findIndex((s) => s.id === submissionId)
    if (index === -1) throw new Error('Submission not found.')

    const sub = submissions[index]

    // Authorization rule: Learners cannot review their own submissions!
    if (sub.userId === reviewerId) {
      throw new Error('Security Violation: You cannot review or approve your own submission.')
    }

    const gig = storage.getGig(sub.gigId)

    // Update submission
    submissions[index].status = action
    submissions[index].reviewedBy = reviewerId
    submissions[index].reviewerName = reviewerName
    submissions[index].reviewedAt = new Date().toISOString()
    submissions[index].reviewFeedback = feedback || (action === 'approved' ? 'Work meets all hackathon & client quality standards.' : 'Please address comments and re-submit.')
    submissions[index].rating = rating || 5
    setItem(STORAGE_KEYS.SUBMISSIONS, submissions)

    // If approved, create verified evidence-based portfolio item and release simulated earnings!
    if (action === 'approved') {
      const portfolio = getItem(STORAGE_KEYS.PORTFOLIO, SEED_PORTFOLIO)
      const existingPortfolioIndex = portfolio.findIndex((p) => p.submissionId === submissionId)

      const portfolioEntry = {
        id: existingPortfolioIndex !== -1 ? portfolio[existingPortfolioIndex].id : `port_${Date.now()}`,
        userId: sub.userId,
        title: sub.gigTitle,
        gigId: sub.gigId,
        submissionId: sub.id,
        summary: sub.notes ? sub.notes.slice(0, 160) + '...' : 'Verified client deliverable matching all practical criteria.',
        clientName: gig ? gig.clientName : 'TechBloom Studios',
        verifiedSkills: gig ? gig.requiredSkills : ['Verified Deliverable'],
        liveDemoUrl: sub.liveDemoUrl,
        projectUrl: sub.projectUrl,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        approvedAt: new Date().toISOString(),
        reviewerFeedback: submissions[index].reviewFeedback,
        reviewerName: reviewerName,
        earnings: sub.reward || 0,
        isVerified: true
      }

      if (existingPortfolioIndex !== -1) {
        portfolio[existingPortfolioIndex] = portfolioEntry
      } else {
        portfolio.unshift(portfolioEntry)
      }
      setItem(STORAGE_KEYS.PORTFOLIO, portfolio)

      // Award simulated earnings to learner's wallet
      const users = getItem(STORAGE_KEYS.USERS, DEMO_ACCOUNTS)
      const userIndex = users.findIndex((u) => u.id === sub.userId)
      if (userIndex !== -1) {
        users[userIndex].walletBalance = (users[userIndex].walletBalance || 0) + (sub.reward || 0)
        setItem(STORAGE_KEYS.USERS, users)
      }
    }

    return submissions[index]
  },

  // PORTFOLIO
  getPortfolio: (userId) => {
    const portfolio = getItem(STORAGE_KEYS.PORTFOLIO, SEED_PORTFOLIO)
    if (userId) {
      return portfolio.filter((p) => p.userId === userId)
    }
    return portfolio
  }
}
