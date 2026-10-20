import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Briefcase, 
  Award, 
  Code2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Compass,
  Star
} from 'lucide-react'
import RoleBadge from '../components/RoleBadge'
import SkillBadge from '../components/SkillBadge'

export default function LandingPage() {
  const { currentUser, switchDemoAccount } = useAuth()
  const { gigs, paths, isGigUnlocked } = useData()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-brand-50/30 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold mb-6 shadow-xs animate-bounce-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>The Skill-to-Earn Micro-Work Platform</span>
              <span className="bg-brand-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">24H Prototype</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Learn practical skills. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                Prove mastery.
              </span>{' '}
              Unlock paid gigs.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              No endless job applications. Complete a hands-on skill challenge to instantly unlock relevant beginner-friendly client gigs. Approved work creates an indisputable, evidence-backed portfolio.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/paths"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-md shadow-brand-500/25 transition flex items-center justify-center gap-2 group"
              >
                <span>Start Learning & Unlocking</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                to="/gigs"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-300 shadow-xs transition flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-slate-500" />
                <span>Explore Micro-Gigs</span>
              </Link>
            </div>

            {/* Quick Demo Switch helper for judges */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Judge / Evaluator Fast-Track:</span>
              <button
                onClick={() => switchDemoAccount('learner')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-brand-600"
              >
                Try as Learner (Alex)
              </button>
              <button
                onClick={() => switchDemoAccount('client')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-emerald-600"
              >
                Try as Client (Sarah)
              </button>
              <button
                onClick={() => switchDemoAccount('reviewer')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-purple-600"
              >
                Try as Reviewer (Marcus)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflow: Learn -> Prove -> Unlock -> Submit -> Review -> Portfolio */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Core Differentiator
            </h2>
            <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
              The 6-Step Evidence Loop
            </p>
            <p className="mt-3 text-slate-600 text-sm">
              Traditional platforms rely on self-proclaimed resumes. MintGig verifies real capability before a gig is ever assigned.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Learn Skill</h3>
                <p className="text-xs text-slate-600">
                  Follow interactive micro-lessons in Frontend, UI Design, or Content.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                <span>Free Lessons</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Prove It</h3>
                <p className="text-xs text-slate-600">
                  Complete a practical challenge matching client criteria.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
                <span>Skill Badge Awarded</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-brand-200 bg-brand-50/20 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-xs">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Unlock Gigs</h3>
                <p className="text-xs text-slate-600">
                  Gigs requiring that skill unlock automatically. No bidding wars!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-brand-600 font-semibold flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" />
                <span>Instant Eligibility</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Submit Work</h3>
                <p className="text-xs text-slate-600">
                  Submit your code, live preview URL, or deliverables for client review.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-amber-600 font-semibold flex items-center gap-1">
                <span>URL & Code Evidence</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
                  5
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Review & QA</h3>
                <p className="text-xs text-slate-600">
                  Authorized reviewers verify standards or request precise revisions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-purple-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quality Gate</span>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-xs">
                  6
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Earn & Portfolio</h3>
                <p className="text-xs text-slate-600">
                  Simulated payout released to wallet; approved deliverable joins your verified public portfolio.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Evidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs Showcase with Unlock Status */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest">
                Real-Time Marketplace
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Sample Unlocked & Locked Gigs
              </p>
              <p className="text-slate-600 text-sm mt-1">
                Notice how completing a challenge changes a gig from locked to unlocked!
              </p>
            </div>
            <Link
              to="/gigs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              <span>View all available gigs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.slice(0, 3).map((gig) => {
              const unlocked = isGigUnlocked(gig)
              return (
                <div
                  key={gig.id}
                  className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg ${
                    unlocked ? 'border-brand-200 ring-1 ring-brand-500/10' : 'border-slate-200 opacity-90'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={gig.clientAvatar}
                          alt={gig.clientName}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="text-xs font-semibold text-slate-900">{gig.clientCompany}</div>
                          <div className="text-[11px] text-slate-500">{gig.difficulty} Level</div>
                        </div>
                      </div>

                      {/* Unlock Status Pill */}
                      {unlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Unlock className="w-3 h-3 text-emerald-600" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>Prereq Required</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <Link to={`/gigs/${gig.id}`}>
                      <h3 className="font-bold text-slate-900 hover:text-brand-600 transition text-base line-clamp-2 mb-2">
                        {gig.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                      {gig.description}
                    </p>

                    {/* Required Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {gig.requiredSkills.map((s) => (
                        <SkillBadge key={s} skill={s} isVerified={unlocked} isLocked={!unlocked} />
                      ))}
                    </div>
                  </div>

                  {/* Footer Reward & Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Payout (Simulated)</div>
                      <div className="text-lg font-bold text-slate-900">
                        ${gig.reward}{' '}
                        <span className="text-xs font-normal text-slate-500">{gig.rewardCurrency}</span>
                      </div>
                    </div>

                    <Link
                      to={`/gigs/${gig.id}`}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                        unlocked
                          ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{unlocked ? 'Apply Now' : 'Unlock Challenge'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Seeded Learning Paths preview */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Structured Tracks
            </h2>
            <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
              3 Seeded Practical Learning Paths
            </p>
            <p className="mt-3 text-slate-600 text-sm">
              Each path contains actionable lessons and a hands-on coding or design challenge that connects directly to client gigs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paths.map((p) => (
              <div
                key={p.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-700 border border-brand-200">
                      {p.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{p.estimatedHours}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-semibold text-slate-700">Skills Awarded:</div>
                    <div className="flex flex-wrap gap-1">
                      {p.skillsAwarded.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">{p.challenges.length}</span> Challenges
                  </div>
                  <Link
                    to={`/paths/${p.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition"
                  >
                    View Lessons & Challenge
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof-of-Skill vs Traditional Resume CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to prove what you can build?
          </h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
            Jump in as Alex Rivera, complete a quick interactive challenge, and experience how skill proof immediately opens real work opportunities.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/paths/path_frontend"
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-lg transition"
            >
              Solve Frontend Challenge Now
            </Link>
            <Link
              to="/portfolio"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
            >
              Browse Public Evidence Portfolios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
