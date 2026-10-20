import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import RoleBadge from '../components/RoleBadge'
import SkillBadge from '../components/SkillBadge'
import { 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  FileText, 
  FolderKanban, 
  PlusCircle, 
  Sparkles, 
  Unlock, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'

export default function LearnerDashboard() {
  const { currentUser } = useAuth()
  const { paths, gigs, applications, submissions, portfolio, completions, isGigUnlocked } = useData()

  const [activeTab, setActiveTab] = useState('overview') // overview, submissions, unlocked_gigs, portfolio

  // User-specific data
  const userCompletions = completions.filter(c => c.userId === currentUser?.id)
  const userApplications = applications.filter(a => a.userId === currentUser?.id)
  const userSubmissions = submissions.filter(s => s.userId === currentUser?.id)
  const userPortfolio = portfolio.filter(p => p.userId === currentUser?.id)
  const unlockedGigs = gigs.filter(g => isGigUnlocked(g))

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Learner Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/30"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h1>
                  <RoleBadge role={currentUser?.role || 'learner'} />
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{currentUser?.title}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-xs font-semibold text-slate-500 mr-1">Proven Skills:</span>
                  {(currentUser?.skills || []).length > 0 ? (
                    currentUser.skills.map((s) => (
                      <SkillBadge key={s} skill={s} isVerified={true} />
                    ))
                  ) : (
                    <span className="text-xs text-amber-600 font-medium">
                      No skills unlocked yet. Complete a challenge below!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions & Simulated Earnings Callout */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-right">
                <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Simulated Earnings
                </div>
                <div className="text-2xl font-extrabold text-emerald-700">
                  ${currentUser?.walletBalance?.toFixed(2) || '0.00'}
                </div>
                <div className="text-[10px] text-emerald-600">Released via Review Approvals</div>
              </div>

              <Link
                to="/paths"
                className="px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Unlock New Skill</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Skills Proven</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">
              {currentUser?.skills?.length || 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Verified by code challenges</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Unlocked Gigs</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Unlock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{unlockedGigs.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Ready for application</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Work Submissions</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{userSubmissions.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Under review or approved</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Portfolio Proofs</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">{userPortfolio.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Evidence-backed public items</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Action Plan
          </button>
          <button
            onClick={() => setActiveTab('unlocked_gigs')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'unlocked_gigs'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Unlocked Micro-Gigs</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-brand-100 text-brand-700">
              {unlockedGigs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'submissions'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Submissions & Feedback</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700">
              {userSubmissions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 text-sm font-semibold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'portfolio'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Verified Portfolio</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700">
              {userPortfolio.length}
            </span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ACTION PLAN */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Suggested Next Challenge Banner */}
            <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-mint-300 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended Next Challenge</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Interactive FAQ Accordion with Keyboard Support
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                    Completing this frontend challenge unlocks 2 intermediate gigs paying up to $150 in simulated rewards.
                  </p>
                </div>
                <Link
                  to="/challenges/ch_fe_2"
                  className="px-5 py-3 rounded-xl bg-white text-brand-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition whitespace-nowrap"
                >
                  Take Challenge Now (150 Pts)
                </Link>
              </div>
            </div>

            {/* Submissions in progress */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base">Active Gig Deliverables & Status</h3>
                <Link to="/gigs" className="text-xs text-brand-600 font-semibold hover:underline">
                  Browse more gigs
                </Link>
              </div>

              {userSubmissions.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {userSubmissions.map((sub) => (
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
                          Submitted on {new Date(sub.submittedAt).toLocaleDateString()} • Simulated Payout: ${sub.reward}
                        </div>
                        {sub.reviewFeedback && (
                          <div className="mt-2 text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700">
                            <span className="font-semibold text-slate-900">Reviewer ({sub.reviewerName}): </span>
                            {sub.reviewFeedback}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {sub.liveDemoUrl && (
                          <a
                            href={sub.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <Link
                          to={`/submissions/${sub.id}`}
                          className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-semibold"
                        >
                          View Full Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  You haven't submitted any gig deliverables yet. Unlock a gig and submit your project URL!
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: UNLOCKED GIGS */}
        {activeTab === 'unlocked_gigs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Gigs You Have Unlocked</h3>
                <p className="text-xs text-slate-500">
                  Because you have proved the required practical skills, you are eligible to apply immediately.
                </p>
              </div>
              <Link to="/gigs" className="text-xs font-semibold text-brand-600 hover:underline">
                View all marketplace gigs
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unlockedGigs.map((gig) => (
                <div key={gig.id} className="bg-white rounded-2xl border border-brand-200 p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img src={gig.clientAvatar} alt={gig.clientName} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{gig.clientCompany}</div>
                          <div className="text-[10px] text-slate-500">{gig.difficulty} Level</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <Unlock className="w-3 h-3 text-emerald-600" />
                        Unlocked
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mb-1">{gig.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">{gig.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {gig.requiredSkills.map((s) => (
                        <SkillBadge key={s} skill={s} isVerified={true} />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">
                      ${gig.reward} <span className="text-xs font-normal text-slate-500">(Simulated)</span>
                    </div>
                    <Link
                      to={`/gigs/${gig.id}`}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Apply / Submit Work
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SUBMISSIONS & REVIEW FEEDBACK */}
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Submission Tracking & Reviews</h3>
            <p className="text-xs text-slate-500 mb-6">
              Track the exact review status of your submitted projects. Authorized reviewers verify each deliverable before simulated earnings release.
            </p>

            {userSubmissions.length > 0 ? (
              <div className="space-y-4">
                {userSubmissions.map((sub) => (
                  <div key={sub.id} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{sub.gigTitle}</h4>
                        <div className="text-xs text-slate-500">
                          Submitted on {new Date(sub.submittedAt).toLocaleString()}
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
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
                    </div>

                    <p className="text-xs text-slate-600 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">Learner Notes: </span>
                      {sub.notes}
                    </p>

                    {sub.reviewFeedback && (
                      <div className="bg-brand-50/50 border border-brand-100 rounded-lg p-3 text-xs text-brand-950 mb-3">
                        <div className="font-bold flex items-center gap-1.5 mb-1 text-brand-900">
                          <CheckCircle2 className="w-4 h-4 text-brand-600" />
                          <span>Reviewer Feedback from {sub.reviewerName}:</span>
                        </div>
                        <p>{sub.reviewFeedback}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-xs">
                        {sub.projectUrl && (
                          <a
                            href={sub.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 hover:underline flex items-center gap-1"
                          >
                            <span>Code Repository</span>
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

                      <div className="text-xs font-bold text-slate-800">
                        Simulated Bounty: ${sub.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-xs">
                No submissions yet.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: VERIFIED PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Your Evidence-Backed Portfolio</h3>
                <p className="text-xs text-slate-500">
                  Projects automatically added upon client / reviewer approval. Verifiable by prospective clients.
                </p>
              </div>
              <Link
                to={`/portfolio`}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <span>View Public Showcase</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPortfolio.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-44 object-cover border-b border-slate-100"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Deliverable
                      </span>
                      <span className="text-xs font-bold text-slate-900">${item.earnings} Payout</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 mb-3">{item.summary}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {(item.verifiedSkills || []).map((s) => (
                        <SkillBadge key={s} skill={s} isVerified={true} />
                      ))}
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
                      <div className="font-semibold text-slate-800 text-[11px] mb-0.5">
                        Reviewed & Certified by {item.reviewerName}
                      </div>
                      <p className="italic">"{item.reviewerFeedback}"</p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-xs">
                      {item.liveDemoUrl && (
                        <a
                          href={item.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand-600 hover:underline flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-600 hover:underline flex items-center gap-1"
                        >
                          <span>Code Proof</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
