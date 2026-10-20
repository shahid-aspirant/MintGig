import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  Code, 
  Palette, 
  Share2, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

export default function LearningPathsPage() {
  const { paths } = useData()
  const { currentUser } = useAuth()

  const getPathIcon = (iconName) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-brand-600" />
      case 'Palette':
        return <Palette className="w-6 h-6 text-purple-600" />
      case 'Share2':
        return <Share2 className="w-6 h-6 text-emerald-600" />
      default:
        return <Sparkles className="w-6 h-6 text-brand-600" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-brand-600" />
            <span>Practical Learning Tracks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curated Skill Paths for Beginner Micro-Work
          </h1>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Every lesson and challenge is reverse-engineered from current client gig requirements. Pass the practical challenge to unlock instant gig eligibility.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path) => (
            <div
              key={path.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7">
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getPathIcon(path.icon)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                    {path.badge || path.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{path.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{path.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-6">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Level</span>
                    <span className="font-semibold text-slate-700">{path.level}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Duration</span>
                    <span className="font-semibold text-slate-700">{path.estimatedHours}</span>
                  </div>
                </div>

                {/* Skills Unlocked */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold text-slate-800">Skills & Gigs Unlocked:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {path.skillsAwarded.map((s) => {
                      const hasSkill = (currentUser?.skills || []).includes(s)
                      return (
                        <SkillBadge key={s} skill={s} isVerified={hasSkill} />
                      )
                    })}
                  </div>
                </div>

                {/* Lessons summary */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Practical Challenges</span>
                    <span className="text-brand-600 font-bold">{path.challenges.length} Available</span>
                  </div>
                  <ul className="text-xs text-slate-500 space-y-1">
                    {path.challenges.map((ch) => (
                      <li key={ch.id} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                        <span className="truncate">{ch.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  to={`/paths/${path.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2"
                >
                  <span>Explore Lessons & Challenges</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
