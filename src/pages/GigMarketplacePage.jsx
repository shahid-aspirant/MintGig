import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  Search, 
  Filter, 
  Unlock, 
  Lock, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

export default function GigMarketplacePage() {
  const { gigs, isGigUnlocked } = useData()
  const { currentUser } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [eligibilityFilter, setEligibilityFilter] = useState('all') // all, unlocked, locked

  const filteredGigs = gigs.filter((gig) => {
    // Search
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      gig.title.toLowerCase().includes(query) ||
      gig.description.toLowerCase().includes(query) ||
      gig.clientCompany.toLowerCase().includes(query) ||
      (gig.tags || []).some((t) => t.toLowerCase().includes(query))

    // Category
    const matchesCategory =
      selectedCategory === 'All' || gig.category.toLowerCase() === selectedCategory.toLowerCase()

    // Eligibility
    const unlocked = isGigUnlocked(gig)
    const matchesEligibility =
      eligibilityFilter === 'all' ||
      (eligibilityFilter === 'unlocked' && unlocked) ||
      (eligibilityFilter === 'locked' && !unlocked)

    return matchesSearch && matchesCategory && matchesEligibility
  })

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5 text-brand-600" />
              <span>Micro-Work Marketplace</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Skill-Unlocked Client Gigs
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Real micro-projects funded by startup clients. Complete the matching skill challenge to unlock application access.
            </p>
          </div>

          {currentUser?.role === 'client' && (
            <Link
              to="/client"
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5"
            >
              <span>+ Post a New Gig</span>
            </Link>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search gigs by keyword, skill, or startup name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            {/* Eligibility Filter */}
            <div>
              <select
                value={eligibilityFilter}
                onChange={(e) => setEligibilityFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
              >
                <option value="all">All Gigs (Locked & Unlocked)</option>
                <option value="unlocked">Unlocked Gigs Only (Ready to Apply)</option>
                <option value="locked">Locked Gigs (Challenge Needed)</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {['All', 'Frontend', 'Design', 'Content'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gigs Grid */}
        {filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => {
              const unlocked = isGigUnlocked(gig)
              return (
                <div
                  key={gig.id}
                  className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg ${
                    unlocked
                      ? 'border-brand-200 ring-1 ring-brand-500/15'
                      : 'border-slate-200 opacity-95'
                  }`}
                >
                  <div>
                    {/* Top Client info & Unlock Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={gig.clientAvatar}
                          alt={gig.clientName}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">
                            {gig.clientCompany}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {gig.difficulty} • {gig.deadline}
                          </div>
                        </div>
                      </div>

                      {unlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Unlock className="w-3 h-3 text-emerald-600" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>Challenge Required</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <Link to={`/gigs/${gig.id}`}>
                      <h3 className="font-bold text-slate-900 hover:text-brand-600 transition text-base mb-2 line-clamp-2">
                        {gig.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                      {gig.description}
                    </p>

                    {/* Required Skills Badges */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[11px] font-semibold text-slate-500">Prerequisite Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {gig.requiredSkills.map((s) => (
                          <SkillBadge key={s} skill={s} isVerified={unlocked} isLocked={!unlocked} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer with Reward & CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Simulated Bounty</div>
                      <div className="text-lg font-bold text-slate-900">
                        ${gig.reward}{' '}
                        <span className="text-xs font-normal text-slate-500">{gig.rewardCurrency}</span>
                      </div>
                    </div>

                    <Link
                      to={`/gigs/${gig.id}`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        unlocked
                          ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{unlocked ? 'View & Apply' : 'Unlock Prereq'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500 text-sm">No gigs found matching your active filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
