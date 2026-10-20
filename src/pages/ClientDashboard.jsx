import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  Briefcase, 
  PlusCircle, 
  Users, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  Send,
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react'
import RoleBadge from '../components/RoleBadge'
import SkillBadge from '../components/SkillBadge'

export default function ClientDashboard() {
  const { gigs, submissions, applications, createGig } = useData()
  const { currentUser } = useAuth()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Frontend')
  const [skill, setSkill] = useState('Responsive Design')
  const [reward, setReward] = useState('85')
  const [difficulty, setDifficulty] = useState('Beginner')
  const [deadline, setDeadline] = useState('3 days')
  const [description, setDescription] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Client-specific gigs
  const myGigs = gigs.filter((g) => g.clientId === currentUser?.id || g.clientCompany === currentUser?.company)
  const myGigIds = myGigs.map((g) => g.id)
  const mySubmissions = submissions.filter((s) => myGigIds.includes(s.gigId) || s.clientId === currentUser?.id)
  const myApplications = applications.filter((a) => myGigIds.includes(a.gigId))

  const handleCreateGig = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await createGig({
        title,
        category,
        requiredSkills: [skill],
        difficulty,
        reward: parseFloat(reward) || 50,
        deadline,
        description,
        deliverables: deliverables || 'GitHub repository URL or deployed preview link.',
        tags: [category, skill]
      })

      setShowCreateModal(false)
      setTitle('')
      setDescription('')
      setDeliverables('')
    } catch (err) {
      setError(err.message || 'Failed to post gig')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                  <RoleBadge role="client" />
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                  {currentUser?.company || 'TechBloom Studios'} • {currentUser?.title}
                </p>
                <div className="text-xs text-slate-500 mt-2">
                  Hiring pre-vetted learners with verified challenge proof.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Micro-Gig</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Gigs Posted</span>
              <Briefcase className="w-4 h-4 text-brand-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{myGigs.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Available to qualified learners</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Applications</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{myApplications.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Learners with unlocked proof</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Submissions to Review</span>
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{mySubmissions.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Project deliverables received</div>
          </div>
        </div>

        {/* Deliverables Pending Client Review */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-base font-bold text-slate-900 mb-2">Deliverables Received for Your Gigs</h2>
          <p className="text-xs text-slate-500 mb-6">
            Learners submit their code repositories or previews here. You can inspect deliverables and verify completion.
          </p>

          {mySubmissions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {mySubmissions.map((sub) => (
                <div key={sub.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{sub.gigTitle}</span>
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
                    <div className="text-xs text-slate-500 mt-1">
                      Learner: <span className="font-semibold text-slate-800">{sub.userName}</span> • Bounty: ${sub.reward}
                    </div>
                    {sub.notes && (
                      <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {sub.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/submissions/${sub.id}`}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
                    >
                      Inspect & Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              No project deliverables received yet.
            </div>
          )}
        </div>

        {/* Client Gigs List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Your Posted Gigs</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              + Create Another Gig
            </button>
          </div>

          <div className="space-y-4">
            {myGigs.map((g) => (
              <div key={g.id} className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{g.title}</span>
                    <span className="text-xs text-slate-500">({g.difficulty})</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{g.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-slate-500">Prereq:</span>
                    {g.requiredSkills.map((s) => (
                      <span key={s} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-slate-900">${g.reward}</div>
                  <Link
                    to={`/gigs/${g.id}`}
                    className="text-xs text-brand-600 font-semibold hover:underline mt-1 inline-block"
                  >
                    View in Marketplace
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Gig Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Post a Practical Micro-Gig</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateGig} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gig Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Build an Accessible Cookie Consent Modal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="Frontend">Frontend Development</option>
                      <option value="Design">UI & Graphic Design</option>
                      <option value="Content">Social & Growth Content</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Required Proof Skill</label>
                    <select
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="Responsive Design">Responsive Design</option>
                      <option value="JavaScript Interactivity">JavaScript Interactivity</option>
                      <option value="Visual Hierarchy">Visual Hierarchy</option>
                      <option value="Brand Identity">Brand Identity</option>
                      <option value="Content Copywriting">Content Copywriting</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bounty ($ USD)</label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline</label>
                    <input
                      type="text"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      placeholder="3 days"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specifications</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Outline what needs to be built and acceptance criteria..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition"
                  >
                    {submitting ? 'Publishing...' : 'Publish Gig to Marketplace'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
