import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Share2, 
  Code2,
  DollarSign
} from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

export default function PortfolioPage() {
  const { portfolio } = useData()
  const [selectedSkill, setSelectedSkill] = useState('All')

  // Extract all unique verified skills across portfolio items
  const allSkills = ['All', ...new Set(portfolio.flatMap((p) => p.verifiedSkills || []))]

  const filteredItems = portfolio.filter((item) => {
    if (selectedSkill === 'All') return true
    return (item.verifiedSkills || []).includes(selectedSkill)
  })

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Certified Proof of Work</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Evidence Portfolio Showcase
          </h1>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Every project below was built for a real client gig, tested against practical criteria, and certified by staff reviewers. Zero unverified claims.
          </p>
        </div>

        {/* Skill Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by Skill:
          </span>
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedSkill === skill
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover border-b border-slate-100"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-700 shadow-sm border border-emerald-100 backdrop-blur-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Deliverable</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      Client: <span className="text-slate-800">{item.clientName}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {/* Verified Skill Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(item.verifiedSkills || []).map((s) => (
                        <SkillBadge key={s} skill={s} isVerified={true} />
                      ))}
                    </div>

                    {/* Reviewer Endorsement Box */}
                    {item.reviewerFeedback && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 mb-4">
                        <div className="font-bold text-[11px] text-purple-900 flex items-center gap-1 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                          <span>Reviewed & Endorsed by {item.reviewerName}</span>
                        </div>
                        <p className="italic text-[11px] text-slate-600 leading-relaxed">
                          "{item.reviewerFeedback}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Links & Simulated Bounty */}
                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    {item.liveDemoUrl && (
                      <a
                        href={item.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {item.projectUrl && (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:underline flex items-center gap-1"
                      >
                        <span>Code Proof</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    ${item.earnings} Earned
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <p className="text-slate-500 text-sm">No portfolio items found for this skill tag.</p>
          </div>
        )}
      </div>
    </div>
  )
}
