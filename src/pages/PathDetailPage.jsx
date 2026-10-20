import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Code, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Unlock
} from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

export default function PathDetailPage() {
  const { pathId } = useParams()
  const { paths, completions } = useData()
  const { currentUser } = useAuth()

  const path = paths.find((p) => p.id === pathId || p.slug === pathId) || paths[0]
  const [selectedLesson, setSelectedLesson] = useState(path?.lessons[0] || null)

  if (!path) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Learning path not found.</p>
      </div>
    )
  }

  const isChallengeCompleted = (challengeId) => {
    return completions.some((c) => c.userId === currentUser?.id && c.challengeId === challengeId && c.status === 'passed')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/paths"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Learning Paths</span>
        </Link>

        {/* Path Hero Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                  {path.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {path.estimatedHours}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{path.title}</h1>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl">{path.overview || path.description}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[240px]">
              <div className="text-xs font-semibold text-slate-500 mb-2">Target Skills Awarded:</div>
              <div className="flex flex-wrap gap-1.5">
                {path.skillsAwarded.map((s) => (
                  <SkillBadge key={s} skill={s} isVerified={(currentUser?.skills || []).includes(s)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Lessons Reader on Left, Practical Challenges on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Section (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Navigation Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <span>Micro-Lessons & Guides</span>
              </h2>

              <div className="space-y-2 mb-6">
                {path.lessons.map((lesson, idx) => {
                  const isSelected = selectedLesson?.id === lesson.id
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between text-xs sm:text-sm ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 text-brand-900 font-semibold ring-1 ring-brand-600'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-normal">{lesson.duration}</span>
                    </button>
                  )
                })}
              </div>

              {/* Lesson Content Viewer */}
              {selectedLesson && (
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-lg">{selectedLesson.title}</h3>
                    <span className="text-xs text-slate-400">{selectedLesson.duration} read</span>
                  </div>

                  <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans">
                    {selectedLesson.content}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Practical Challenges Column (1 Col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Code className="w-5 h-5 text-brand-600" />
                  <span>Practical Challenges</span>
                </h2>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Gig Gates
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Solve these challenges to prove your capability and unlock client gigs on MintGig.
              </p>

              <div className="space-y-4">
                {path.challenges.map((ch) => {
                  const completed = isChallengeCompleted(ch.id)
                  return (
                    <div
                      key={ch.id}
                      className={`p-4 rounded-xl border transition ${
                        completed
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-slate-200 bg-white hover:border-brand-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-slate-500">{ch.difficulty}</span>
                        {completed ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Passed
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-brand-600">+{ch.points} Pts</span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm mb-1">{ch.title}</h4>
                      <p className="text-xs text-slate-600 mb-3">{ch.summary}</p>

                      <div className="mb-4">
                        <span className="text-[11px] text-slate-500 block mb-1">Unlocks Skill:</span>
                        <SkillBadge skill={ch.skillUnlocked} isVerified={completed} />
                      </div>

                      <Link
                        to={`/challenges/${ch.id}`}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                          completed
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-brand-600 text-white hover:bg-brand-700 shadow-xs'
                        }`}
                      >
                        <span>{completed ? 'Review Solution' : 'Solve & Unlock Gig'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
