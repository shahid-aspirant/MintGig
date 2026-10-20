// Comprehensive Automated Tests for MintGig Core Business Logic
import test from 'node:test'
import assert from 'node:assert/strict'

// Create in-memory mock for localStorage
const memoryStore = {}
global.localStorage = {
  getItem: (key) => memoryStore[key] || null,
  setItem: (key, val) => { memoryStore[key] = String(val) },
  removeItem: (key) => { delete memoryStore[key] },
  clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]) }
}

// Dynamically import storage adapter
const { storage, initializeStorage } = await import('../src/lib/storageAdapter.js')

test('MINTGIG CORE WORKFLOW TEST SUITE', async (t) => {
  // Setup fresh state
  global.localStorage.clear()
  initializeStorage(true)

  await t.test('1. Learner cannot apply to a gig without completing the prerequisite challenge', () => {
    // usr_learner_101 has not completed ch_fe_2 (Interactive FAQ Accordion -> JavaScript Interactivity)
    const gig102 = storage.getGig('gig_102') // requires JavaScript Interactivity & Responsive Design
    assert.ok(gig102, 'Gig 102 must exist')

    const isUnlockedBefore = storage.isGigUnlockedForUser(gig102, 'usr_learner_101')
    assert.equal(isUnlockedBefore, false, 'Gig 102 should be locked before challenge completion')

    assert.throws(
      () => {
        storage.applyToGig({
          gigId: 'gig_102',
          userId: 'usr_learner_101',
          pitch: 'I want to try this gig'
        })
      },
      /prerequisite challenge/,
      'Applying to locked gig must throw prerequisite error'
    )
  })

  await t.test('2. Completing practical challenge unlocks the skill and the matching gig', () => {
    // Alex completes ch_fe_2
    const completion = storage.completeChallenge({
      userId: 'usr_learner_101',
      challengeId: 'ch_fe_2',
      submissionText: 'Implemented full interactive accordion with keyboard accessibility and ARIA tags.',
      projectUrl: 'https://github.com/alexrivera/faq-accordion'
    })

    assert.equal(completion.status, 'passed', 'Completion status should be passed')
    assert.equal(completion.skillAwarded, 'JavaScript Interactivity')

    // Verify user profile now has the new skill
    const user = storage.getUserById('usr_learner_101')
    assert.ok(user.skills.includes('JavaScript Interactivity'), 'User profile must have acquired new skill')

    // Now Gig 102 should be UNLOCKED!
    const gig102 = storage.getGig('gig_102')
    const isUnlockedAfter = storage.isGigUnlockedForUser(gig102, 'usr_learner_101')
    assert.equal(isUnlockedAfter, true, 'Gig 102 must now be unlocked!')
  })

  await t.test('3. Learner can apply once, and duplicate application is prevented', () => {
    // First application succeeds
    const app = storage.applyToGig({
      gigId: 'gig_102',
      userId: 'usr_learner_101',
      pitch: 'I have verified proficiency in JavaScript Interactivity.'
    })
    assert.ok(app.id, 'Application must be created')

    // Second application must throw duplicate error
    assert.throws(
      () => {
        storage.applyToGig({
          gigId: 'gig_102',
          userId: 'usr_learner_101',
          pitch: 'Applying again'
        })
      },
      /already applied/,
      'Duplicate application must be rejected'
    )
  })

  await t.test('4. Learner submits work deliverable with project URL', () => {
    const submission = storage.submitWork({
      gigId: 'gig_102',
      userId: 'usr_learner_101',
      projectUrl: 'https://github.com/alexrivera/pricing-matrix-react',
      liveDemoUrl: 'https://pricing-matrix.vercel.app',
      notes: 'Built accessible tabbed matrix with 20% discount toggles.'
    })

    assert.equal(submission.status, 'submitted')
    assert.equal(submission.reward, 150)
  })

  await t.test('5. Security Check: Learner CANNOT review or approve their own submission', () => {
    const subs = storage.getSubmissions({ gigId: 'gig_102', userId: 'usr_learner_101' })
    const targetSub = subs[0]
    assert.ok(targetSub, 'Submission must exist')

    // Learner attempts to approve themselves
    assert.throws(
      () => {
        storage.reviewSubmission({
          submissionId: targetSub.id,
          reviewerId: 'usr_learner_101', // same as learner!
          reviewerName: 'Alex Rivera',
          reviewerRole: 'learner',
          action: 'approved',
          feedback: 'Approving my own work',
          rating: 5
        })
      },
      /Security Violation/,
      'Self-approval must be blocked'
    )
  })

  await t.test('6. Reviewer approves submission: releases simulated bounty and generates evidence portfolio item', () => {
    const subs = storage.getSubmissions({ gigId: 'gig_102', userId: 'usr_learner_101' })
    const targetSub = subs[0]

    const initialBalance = storage.getUserById('usr_learner_101').walletBalance || 0

    // Authorized reviewer Marcus reviews and approves
    const reviewed = storage.reviewSubmission({
      submissionId: targetSub.id,
      reviewerId: 'usr_reviewer_303',
      reviewerName: 'Marcus Vance',
      reviewerRole: 'reviewer',
      action: 'approved',
      feedback: 'Excellent interactive state management and accessible tab controls.',
      rating: 5
    })

    assert.equal(reviewed.status, 'approved')

    // Check simulated wallet balance increased by $150
    const updatedUser = storage.getUserById('usr_learner_101')
    assert.equal(updatedUser.walletBalance, initialBalance + 150, 'Wallet balance must reflect bounty payout')

    // Check portfolio entry was created
    const portfolio = storage.getPortfolio('usr_learner_101')
    const portfolioItem = portfolio.find(p => p.submissionId === targetSub.id)
    assert.ok(portfolioItem, 'Verified evidence item must appear in portfolio')
    assert.equal(portfolioItem.earnings, 150)
    assert.equal(portfolioItem.isVerified, true)
  })

  await t.test('7. Privilege Escalation Prevention: User cannot update their role via profile edit', () => {
    const updated = storage.updateUserProfile('usr_learner_101', {
      name: 'Alex Rivera (Staff)',
      role: 'admin' // Attempting escalation
    })

    assert.equal(updated.role, 'learner', 'Role must remain learner; role escalation is blocked')
  })
})
