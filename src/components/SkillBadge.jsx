import React from 'react'
import { CheckCircle2, Lock } from 'lucide-react'

export default function SkillBadge({ skill, isVerified = true, isLocked = false }) {
  if (isLocked) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
        <Lock className="w-3 h-3 text-slate-400" />
        <span>{skill}</span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
      {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />}
      <span>{skill}</span>
    </span>
  )
}
