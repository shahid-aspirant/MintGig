import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowLeft, 
  Send, 
  AlertCircle, 
  Link2, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react'

export default function WorkSubmissionPage() {
  const { gigId } = useParams()
  const { gigs, submissions, submitWork } = useData()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const gig = gigs.find((g) => g.id === gigId)
  const existingSub = submissions.find((s) => s.gigId === gigId && s.userId === currentUser?.id)

  const [projectUrl, setProjectUrl] = useState(existingSub?.projectUrl || '')
  const [liveDemoUrl, setLiveDemoUrl] = useState(existingSub?.liveDemoUrl || '')
  const [notes, setNotes] = useState(existingSub?.notes || '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Gig not found.</p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!projectUrl && !notes) {
      setError('Please provide at least a project repository URL or substantive written deliverable notes.')
      return
    }

    setSubmitting(true)
    try {
      const result = await submitWork({
        gigId: gig.id,
        projectUrl,
        liveDemoUrl,
        notes
      })
      navigate(`/submissions/${result.id}`)
    } catch (err) {
      setError(err.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/gigs/${gig.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gig Details</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Work Deliverable Submission
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{gig.title}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Client: <span className="font-semibold text-slate-800">{gig.clientCompany}</span> • Simulated Escrow Bounty: <span className="font-semibold text-slate-900">${gig.reward}</span>
            </p>
          </div>

          {/* Previous Revisions Alert if applicable */}
          {existingSub?.status === 'revision_requested' && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Revision Requested by Reviewer ({existingSub.reviewerName})</span>
              </div>
              <p className="leading-relaxed">{existingSub.reviewFeedback}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project / Code Repo URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-slate-400" />
                <span>Project Code Repository or Figma / Document URL</span>
              </label>
              <input
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://github.com/alexrivera/techbloom-newsletter-box"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Link to GitHub repo, Figma file, Google Doc, or StackBlitz workspace.
              </span>
            </div>

            {/* Live Preview URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Live Deployed Preview URL (Optional)</span>
              </label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://techbloom-newsletter.vercel.app"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Recommended for frontend deliverables (Vercel, Netlify, GitHub Pages).
              </span>
            </div>

            {/* Written Deliverable / Explanation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Implementation Summary, Deliverable Notes, or Copywriting</span>
              </label>
              <textarea
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe how you met the gig requirements, responsive layout decisions, and testing notes..."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-sans"
              />
            </div>

            {/* Info notice about Review -> Portfolio flow */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Evidence Portfolio Pipeline:</span> Once approved by Marcus (Staff Reviewer) or Sarah (Client), this deliverable will be certified and permanently attached to your public MintGig evidence portfolio.
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Deliverable...' : 'Submit Work for Review'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
