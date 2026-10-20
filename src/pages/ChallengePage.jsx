import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Code, 
  Play, 
  Sparkles, 
  Unlock, 
  ExternalLink, 
  AlertCircle,
  FileCode,
  Check,
  Briefcase
} from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

export default function ChallengePage() {
  const { challengeId } = useParams()
  const { paths, gigs, completions, completeChallenge } = useData()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  // Find challenge
  let challenge = null
  let parentPath = null
  for (const p of paths) {
    const found = p.challenges.find((c) => c.id === challengeId)
    if (found) {
      challenge = found
      parentPath = p
      break
    }
  }

  // Check if user has already passed
  const existingCompletion = completions.find(
    (c) => c.userId === currentUser?.id && c.challengeId === challengeId && c.status === 'passed'
  )

  const [submissionText, setSubmissionText] = useState(
    existingCompletion?.submissionText || challenge?.starterCode || ''
  )
  const [projectUrl, setProjectUrl] = useState(existingCompletion?.projectUrl || '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successResult, setSuccessResult] = useState(existingCompletion || null)

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Challenge not found.</p>
          <Link to="/paths" className="text-brand-600 font-semibold underline">
            Return to Learning Paths
          </Link>
        </div>
      </div>
    )
  }

  // Find gigs that unlock when this challenge is passed
  const unlockedGigs = gigs.filter(
    (g) => g.unlockedByChallengeId === challenge.id || g.requiredSkills.includes(challenge.skillUnlocked)
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!submissionText || submissionText.trim().length < 20) {
      setError('Please provide your complete solution code or design explanation (at least 20 characters).')
      return
    }

    setSubmitting(true)
    try {
      const res = await completeChallenge({
        challengeId: challenge.id,
        submissionText,
        projectUrl
      })
      setSuccessResult(res)
    } catch (err) {
      setError(err.message || 'Challenge verification failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/paths/${parentPath?.id || ''}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {parentPath?.title || 'Learning Path'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Prerequisite for:</span>
            <span className="text-xs font-bold text-brand-600">{unlockedGigs.length} Client Gigs</span>
          </div>
        </div>

        {/* Challenge Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                  {challenge.difficulty} Challenge
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Estimated: {challenge.timeEstimate}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  +{challenge.points} Points
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{challenge.title}</h1>
              <p className="text-slate-600 text-sm mt-2 max-w-3xl leading-relaxed">{challenge.summary}</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 min-w-[260px]">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                Demonstrated Proof
              </div>
              <div className="text-sm font-semibold text-emerald-950 mb-2">
                Unlocks Skill Badge:
              </div>
              <SkillBadge skill={challenge.skillUnlocked} isVerified={Boolean(successResult)} />
            </div>
          </div>
        </div>

        {/* Success Banner if Completed */}
        {successResult && (
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg animate-in fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Challenge Verified & Passed (Score: {successResult.score}%)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Skill Unlocked: {challenge.skillUnlocked}!
                </h3>
                <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  {successResult.feedback}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/gigs"
                  className="px-5 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <span>Browse Unlocked Gigs</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Two-Column Editor Layout: Instructions on Left, Interactive Workspace on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instructions & Evaluation Criteria */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-brand-600" />
                <span>Challenge Brief & Requirements</span>
              </h2>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-6 font-sans">
                {challenge.brief}
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
                  Passing Evaluation Criteria
                </h3>
                <div className="space-y-2">
                  {challenge.criteria.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gigs Unlocked by this Challenge */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Unlock className="w-4 h-4 text-brand-600" />
                <span>Matching Micro-Gigs Waiting for You</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Prove this skill to immediately qualify for these real client gigs:
              </p>

              <div className="space-y-3">
                {unlockedGigs.map((g) => (
                  <div
                    key={g.id}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{g.title}</div>
                      <div className="text-[11px] text-slate-500">{g.clientCompany} • {g.difficulty}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">${g.reward}</div>
                      <span className="text-[10px] text-slate-400">Simulated</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Workspace & Submission Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Code className="w-5 h-5 text-brand-600" />
                  <span>Your Solution Workspace</span>
                </h2>
                <span className="text-xs text-slate-400 font-medium">Code / Markdown / Text</span>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Implementation Code or Proof Deliverable
                  </label>
                  <textarea
                    rows={12}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="// Write your code or component implementation here..."
                    className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-900 text-slate-100 leading-relaxed"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">
                    Tip: You can modify the starter template or paste your completed component.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Live Demo or GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    placeholder="https://github.com/your-username/pricing-card"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>
                      {submitting
                        ? 'Evaluating Submission...'
                        : successResult
                        ? 'Update & Re-verify Solution'
                        : 'Submit Challenge & Unlock Skill'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
