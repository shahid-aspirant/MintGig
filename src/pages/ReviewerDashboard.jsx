import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  Award, 
  MessageSquare,
  Search,
  Filter
} from 'lucide-react'
import RoleBadge from '../components/RoleBadge'

export default function ReviewerDashboard() {
  const { submissions, reviewSubmission } = useData()
  const { currentUser } = useAuth()

  const [activeFilter, setActiveFilter] = useState('all') // all, submitted, revision_requested, approved
  const [selectedSub, setSelectedSub] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(5)
  const [reviewing, setReviewing] = useState(false)
  const [error, setError] = useState('')

  const filteredSubs = submissions.filter((s) => {
    if (activeFilter === 'all') return true
    return s.status === activeFilter
  })

  const pendingCount = submissions.filter((s) => s.status === 'submitted').length
  const approvedCount = submissions.filter((s) => s.status === 'approved').length
  const revisionCount = submissions.filter((s) => s.status === 'revision_requested').length

  const handleReview = async (action) => {
    if (!selectedSub) return
    setError('')
    setReviewing(true)

    try {
      await reviewSubmission({
        submissionId: selectedSub.id,
        action,
        feedback: feedback || (action === 'approved' ? 'Deliverable meets all hackathon & client quality standards.' : 'Please fix the highlighted responsive styling.'),
        rating
      })
      setSelectedSub(null)
      setFeedback('')
    } catch (err) {
      setError(err.message || 'Review failed')
    } finally {
      setReviewing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviewer Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/30"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                  <RoleBadge role="reviewer" />
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                  {currentUser?.title || 'Senior Staff Reviewer & Code Mentor'}
                </p>
                <div className="text-xs text-slate-500 mt-2">
                  Verifying code quality, approving client bounties, and certifying portfolio evidence.
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 text-right">
              <div className="text-[10px] uppercase font-bold text-purple-800 tracking-wider">
                Certification Authority
              </div>
              <div className="text-lg font-bold text-purple-900">
                Staff Reviewer
              </div>
              <div className="text-[10px] text-purple-700">Quality gate active</div>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Awaiting Evaluation</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{pendingCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Pending reviewer decision</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Approved & Certified</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{approvedCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Portfolio entries created</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Revisions Requested</span>
              <AlertCircle className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{revisionCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Returned to learner</div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Queue:
          </span>
          {[
            { id: 'all', label: 'All Submissions' },
            { id: 'submitted', label: 'Pending Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'revision_requested', label: 'Revisions Requested' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeFilter === tab.id
                  ? 'bg-purple-700 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Submissions Queue Table / List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {filteredSubs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredSubs.map((sub) => (
                <div key={sub.id} className="p-6 hover:bg-slate-50/50 transition">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-base">{sub.gigTitle}</span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            sub.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : sub.status === 'revision_requested'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {sub.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                        <span>Learner: <strong className="text-slate-800">{sub.userName}</strong></span>
                        <span>•</span>
                        <span>Simulated Bounty: <strong className="text-slate-900">${sub.reward}</strong></span>
                        <span>•</span>
                        <span>Submitted: {new Date(sub.submittedAt).toLocaleDateString()}</span>
                      </div>

                      {/* Evidence Links */}
                      <div className="flex items-center gap-3 mt-3 text-xs font-semibold">
                        {sub.projectUrl && (
                          <a
                            href={sub.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 hover:underline flex items-center gap-1"
                          >
                            <span>Code Repo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {sub.liveDemoUrl && (
                          <a
                            href={sub.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 hover:underline flex items-center gap-1"
                          >
                            <span>Live Deployed URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {sub.reviewFeedback && (
                        <div className="mt-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-950">
                          <strong>Feedback ({sub.reviewerName}):</strong> {sub.reviewFeedback}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Evaluate & Certify</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              No submissions match this filter.
            </div>
          )}
        </div>

        {/* Modal for Reviewer Evaluation */}
        {selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-slate-900">Evaluate Deliverable</h3>
                </div>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div><strong>Gig:</strong> {selectedSub.gigTitle}</div>
                <div><strong>Learner:</strong> {selectedSub.userName}</div>
                <div><strong>Simulated Escrow:</strong> ${selectedSub.reward}</div>
                {selectedSub.projectUrl && (
                  <div>
                    <strong>Repository:</strong>{' '}
                    <a href={selectedSub.projectUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                      {selectedSub.projectUrl}
                    </a>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quality Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5/5 - Meets All Standards</option>
                    <option value={4}>⭐⭐⭐⭐ 4/5 - High Quality</option>
                    <option value={3}>⭐⭐⭐ 3/5 - Acceptable</option>
                    <option value={2}>⭐⭐ 2/5 - Needs Revision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reviewer Assessment & Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide specific constructive praise or requested revisions..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={reviewing}
                    onClick={() => handleReview('revision_requested')}
                    className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100"
                  >
                    Request Revisions
                  </button>

                  <button
                    type="button"
                    disabled={reviewing}
                    onClick={() => handleReview('approved')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                  >
                    {reviewing ? 'Approving...' : `Approve & Release \$${selectedSub.reward}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
