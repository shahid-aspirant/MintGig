import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowLeft, 
  Briefcase, 
  Unlock, 
  Lock, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  AlertCircle,
  FileCheck,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

export default function GigDetailPage() {
  const { gigId } = useParams()
  const { gigs, applications, submissions, isGigUnlocked, applyToGig } = useData()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const gig = gigs.find((g) => g.id === gigId)
  const [pitch, setPitch] = useState('')
  const [applying, setApplying] = useState(false)
  const [error, setError] = useState('')

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Gig not found.</p>
      </div>
    )
  }

  const unlocked = isGigUnlocked(gig)
  const existingApp = applications.find((a) => a.gigId === gig.id && a.userId === currentUser?.id)
  const existingSub = submissions.find((s) => s.gigId === gig.id && s.userId === currentUser?.id)

  const handleApply = async (e) => {
    e.preventDefault()
    setError('')
    setApplying(true)

    try {
      await applyToGig({
        gigId: gig.id,
        pitch: pitch || 'I have completed the prerequisite challenge and demonstrated required proficiency.'
      })
      navigate(`/gigs/${gig.id}/submit`)
    } catch (err) {
      setError(err.message || 'Application failed')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          to="/gigs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gig Marketplace</span>
        </Link>

        {/* Gig Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={gig.clientAvatar}
                alt={gig.clientName}
                className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-900">{gig.clientCompany}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{gig.difficulty} Level</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{gig.deadline} turn-around</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{gig.title}</h1>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {gig.requiredSkills.map((s) => (
                    <SkillBadge key={s} skill={s} isVerified={unlocked} isLocked={!unlocked} />
                  ))}
                </div>
              </div>
            </div>

            {/* Payout & Status Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 min-w-[240px] text-right">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Simulated Bounty
              </div>
              <div className="text-3xl font-extrabold text-slate-900 my-0.5">
                ${gig.reward}{' '}
                <span className="text-xs font-normal text-slate-500">{gig.rewardCurrency}</span>
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                Funded by client in escrow
              </div>
            </div>
          </div>
        </div>

        {/* Locked Prerequisite Alert if not eligible */}
        {!unlocked && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-7 mb-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-1">
                  <Lock className="w-5 h-5 text-amber-600" />
                  <span>Prerequisite Practical Challenge Required</span>
                </div>
                <p className="text-amber-800 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  To ensure client satisfaction and fair compensation, MintGig requires learners to prove mastery in{' '}
                  <span className="font-semibold text-slate-900">{gig.requiredSkills.join(', ')}</span> before applying.
                </p>
              </div>

              {gig.unlockedByChallengeId && (
                <Link
                  to={`/challenges/${gig.unlockedByChallengeId}`}
                  className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition whitespace-nowrap flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Solve Challenge to Unlock</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Existing Application or Submission State */}
        {existingSub && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-base mb-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Work Deliverable Submitted ({existingSub.status.replace('_', ' ')})</span>
              </div>
              <p className="text-xs text-emerald-800">
                You have already submitted your project for this gig. You can track reviewer evaluation and feedback.
              </p>
            </div>
            <Link
              to={`/submissions/${existingSub.id}`}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
            >
              View Submission Status
            </Link>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gig Scope & Deliverables (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-600" />
                <span>Gig Description & Specifications</span>
              </h2>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-6 font-sans">
                {gig.description}
              </div>

              <div className="pt-5 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Required Deliverable Format
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {gig.deliverables}
                </p>
              </div>
            </div>
          </div>

          {/* Action / Application Column (1 Col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-brand-600" />
                <span>Application & Submission</span>
              </h3>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {unlocked ? (
                existingApp ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-brand-600" />
                        <span>Applied & Pre-Approved</span>
                      </div>
                      <p>Your demonstrated skills satisfied all eligibility checks. You can now submit your deliverables.</p>
                    </div>

                    <Link
                      to={`/gigs/${gig.id}/submit`}
                      className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>Submit Work Deliverable</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <p className="text-xs text-slate-600">
                      You hold the verified prerequisite skill badge. Submit your pitch to begin working on this deliverable:
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quick Pitch or Approach Note
                      </label>
                      <textarea
                        rows={4}
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                        placeholder="Hi! I have passed the practical challenge and will deliver this within 48 hours..."
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={applying}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{applying ? 'Applying...' : 'Apply to Gig'}</span>
                    </button>
                  </form>
                )
              ) : (
                <div className="text-center py-4 space-y-3">
                  <Lock className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">
                    This gig is currently locked. Pass the required challenge to activate this form.
                  </p>
                  {gig.unlockedByChallengeId && (
                    <Link
                      to={`/challenges/${gig.unlockedByChallengeId}`}
                      className="block py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
                    >
                      Go to Prerequisite Challenge
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
