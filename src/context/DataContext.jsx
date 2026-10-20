import React, { createContext, useContext, useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { storage } from '../lib/storageAdapter'
import { useAuth } from './AuthContext'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { currentUser, refreshUser } = useAuth()
  
  const [paths, setPaths] = useState([])
  const [gigs, setGigs] = useState([])
  const [applications, setApplications] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [completions, setCompletions] = useState([])
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch (e) {
      // Fallback gracefully if canvas is unavailable
    }
  }

  const reloadAllData = () => {
    setPaths(storage.getLearningPaths())
    setGigs(storage.getGigs())
    setApplications(storage.getApplications())
    setSubmissions(storage.getSubmissions())
    setPortfolio(storage.getPortfolio())
    if (currentUser) {
      setCompletions(storage.getCompletionsByUser(currentUser.id))
    }
  }

  useEffect(() => {
    reloadAllData()
  }, [currentUser])

  // Check if a gig is unlocked for the current user
  const isGigUnlocked = (gig) => {
    if (!currentUser) return false
    return storage.isGigUnlockedForUser(gig, currentUser.id)
  }

  // Complete a practical challenge
  const completeChallenge = async ({ challengeId, submissionText, projectUrl }) => {
    if (!currentUser) throw new Error('You must be logged in as a learner.')
    
    const result = storage.completeChallenge({
      userId: currentUser.id,
      challengeId,
      submissionText,
      projectUrl
    })

    triggerConfetti()
    showToast(`Skill Unlocked: "${result.skillAwarded}"! You can now apply to matching paid gigs.`, 'success')
    
    reloadAllData()
    refreshUser()
    return result
  }

  // Apply to a gig
  const applyToGig = async ({ gigId, pitch, relevantSkills }) => {
    if (!currentUser) throw new Error('You must be logged in to apply.')
    if (currentUser.role !== 'learner') {
      throw new Error('Only learner accounts can apply to gigs. Switch to learner mode.')
    }

    const application = storage.applyToGig({
      gigId,
      userId: currentUser.id,
      pitch,
      relevantSkills
    })

    showToast('Application submitted! Your prerequisite skill badge verified eligibility.', 'success')
    reloadAllData()
    return application
  }

  // Submit project work for a gig
  const submitWork = async ({ gigId, projectUrl, liveDemoUrl, notes }) => {
    if (!currentUser) throw new Error('Please log in.')
    
    const submission = storage.submitWork({
      gigId,
      userId: currentUser.id,
      projectUrl,
      liveDemoUrl,
      notes
    })

    showToast('Project deliverable submitted for reviewer evaluation!', 'info')
    reloadAllData()
    return submission
  }

  // Review a submission (Reviewer / Client role)
  const reviewSubmission = async ({ submissionId, action, feedback, rating }) => {
    if (!currentUser) throw new Error('Authentication required.')
    
    const reviewed = storage.reviewSubmission({
      submissionId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerRole: currentUser.role,
      action,
      feedback,
      rating
    })

    if (action === 'approved') {
      triggerConfetti()
      showToast(`Submission approved! Verified portfolio entry generated & \$${reviewed.reward} simulated payout released.`, 'success')
    } else if (action === 'revision_requested') {
      showToast('Revision request sent to the learner with feedback.', 'warning')
    } else {
      showToast('Submission marked as rejected.', 'error')
    }

    reloadAllData()
    refreshUser()
    return reviewed
  }

  // Create a new client gig
  const createGig = async (gigData) => {
    if (!currentUser) throw new Error('Authentication required.')
    
    const newGig = storage.createGig(gigData, currentUser.id)
    showToast(`New gig "${newGig.title}" posted to marketplace!`, 'success')
    reloadAllData()
    return newGig
  }

  // Reset demo data
  const resetDemo = () => {
    storage.resetAll()
    reloadAllData()
    refreshUser()
    showToast('Demo dataset successfully restored to original factory state.', 'info')
  }

  const value = {
    paths,
    gigs,
    applications,
    submissions,
    portfolio,
    completions,
    toasts,
    showToast,
    isGigUnlocked,
    completeChallenge,
    applyToGig,
    submitWork,
    reviewSubmission,
    createGig,
    resetDemo,
    reloadAllData
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
