import React from 'react'
import { ShieldCheck, User, Briefcase } from 'lucide-react'

export default function RoleBadge({ role, size = 'sm' }) {
  const configs = {
    learner: {
      label: 'Learner',
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: User
    },
    client: {
      label: 'Client / Employer',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Briefcase
    },
    reviewer: {
      label: 'Staff Reviewer',
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: ShieldCheck
    },
    admin: {
      label: 'Admin',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: ShieldCheck
    }
  }

  const config = configs[role] || configs.learner
  const Icon = config.icon

  const sizeClasses = size === 'xs' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-xs px-2.5 py-1 font-medium'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${sizeClasses}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  )
}
