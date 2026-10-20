import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Star, 
  MessageSquare,
  DollarSign,
  Award
} from 'lucide-react'

export default function SubmissionDetailPage() {
  const { submissionId } = useParams()
  const { submissions, gigs, reviewSubmission } = useData()
  const { currentUser } = useAuth()

  const sub = submissions.find((s) => s.id === submissionId)
  const gig = sub ? gigs.find((g) => g.id === sub.gigId) : null

  // Review state
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(5)
  const [reviewing, setReviewing] = useState(false)
  const [error, setError] = useState('')

  if (!sub) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Submission not found.</p>
      </div>
    )
  }

  const isReviewerOrClient = currentUser?.role === 'reviewer' || currentUser?.role === 'client' || currentUser?.role === 'admin'
  const isOwnSubmission = currentUser?.id === sub.userId

  const handleReviewAction = async (action) => {
    setError('')
    setReviewing(true)
    try {
      await reviewSubmission({
        submissionId: sub.id,
        action,
        feedback: feedback || (action === 'approved' ? 'Verified deliverable matching all quality criteria.' : 'Please fix requested items.'),
        rating
      })
      setFeedback('')
    } catch (err) {
      setError(err.message || 'Review action failed')
    } finally {
      setReviewing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={currentUser?.role === 'reviewer' ? '/reviewer' : '/dashboard'}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-500">Submission for:</span>
                <span className="text-xs font-semibold text-brand-600">{sub.gigTitle}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Deliverable Evaluation</h1>
              <div className="text-xs text-slate-500 mt-1">
                Submitted by <span className="font-semibold text-slate-800">{sub.userName}</span> on{' '}
                {new Date(sub.submittedAt).toLocaleString()}
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  sub.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : sub.status === 'revision_requested'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {sub.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {sub.status.replace('_', ' ')}
              </span>
              <div className="text-xs font-bold text-slate-700 mt-1.5">
                Simulated Bounty: ${sub.reward}
              </div>
            </div>
          </div>

          {/* Links & Artifacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
            {sub.projectUrl && (
              <a
                href={sub.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-brand-600 flex items-center justify-between transition"
              >
                <span>Code Repository / Figma</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {sub.liveDemoUrl && (
              <a
                href={sub.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-brand-600 flex items-center justify-between transition"
              >
                <span>Live Deployed Demo URL</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Written Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-base font-bold text-slate-900 mb-3">Learner Implementation Notes</h2>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
            {sub.notes || 'No extra written notes provided.'}
          </div>
        </div>

        {/* Reviewer Feedback Section */}
        {sub.reviewFeedback && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-slate-900">
                Staff Reviewer Feedback ({sub.reviewerName})
              </h2>
            </div>
            <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4 text-xs sm:text-sm text-purple-950 leading-relaxed">
              {sub.reviewFeedback}
            </div>

            {sub.status === 'approved' && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Verified and added to Learner Public Portfolio!</span>
                </div>
                <Link to="/portfolio" className="font-bold underline text-emerald-700">
                  View in Portfolio
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Review Action Controls for Reviewers / Clients */}
        {isReviewerOrClient && !isOwnSubmission && (
          <div className="bg-white rounded-2xl border border-purple-200 p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-slate-900">
                Authorized Reviewer Evaluation Console
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              As a reviewer ({currentUser.name} - {currentUser.role}), you can verify code quality, approve payouts, or request revisions.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Evaluation Feedback & Suggestions
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter constructive praise or specific revision notes..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={() => handleReviewAction('revision_requested')}
                  className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition disabled:opacity-50"
                >
                  Request Revisions
                </button>

                <button
                  type="button"
                  disabled={reviewing}
                  onClick={() => handleReviewAction('approved')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Release ${sub.reward} Bounty</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
