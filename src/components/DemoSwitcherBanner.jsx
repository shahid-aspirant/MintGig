import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { RotateCcw, Database, Sparkles, Check } from 'lucide-react'
import { DEMO_ACCOUNTS } from '../lib/demoAccounts'

export default function DemoSwitcherBanner() {
  const { currentUser, switchDemoAccount, isDemoMode } = useAuth()
  const { resetDemo } = useData()

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Hackathon Environment status */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">Hackathon Prototype Mode</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
            <Database className="w-3.5 h-3.5 text-brand-400" />
            <span>{isDemoMode ? 'Local Persistent Storage' : 'Supabase Backend Connected'}</span>
          </span>
        </div>

        {/* Center: Switch Demo Accounts */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium hidden md:inline">Quick Role Switch:</span>
          {DEMO_ACCOUNTS.map((acc) => {
            const isActive = currentUser?.id === acc.id
            return (
              <button
                key={acc.id}
                onClick={() => switchDemoAccount(acc.role)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-medium ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm ring-1 ring-white/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={`Switch to ${acc.name} (${acc.role})`}
              >
                <span>{acc.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 uppercase tracking-wider">({acc.role})</span>
                {isActive && <Check className="w-3 h-3 text-white ml-0.5" />}
              </button>
            )
          })}
        </div>

        {/* Right: Reset Data */}
        <button
          onClick={resetDemo}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2.5 py-1 rounded transition text-xs"
          title="Reset demo data to default seeded state"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Demo Data</span>
        </button>
      </div>
    </div>
  )
}
