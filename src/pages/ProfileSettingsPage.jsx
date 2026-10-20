import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import RoleBadge from '../components/RoleBadge'
import SkillBadge from '../components/SkillBadge'
import { 
  User, 
  Mail, 
  Briefcase, 
  DollarSign, 
  ShieldAlert, 
  Database, 
  RotateCcw, 
  Check, 
  Save,
  AlertCircle
} from 'lucide-react'

export default function ProfileSettingsPage() {
  const { currentUser, isDemoMode, refreshUser } = useAuth()
  const { showToast, resetDemo } = useData()

  const [name, setName] = useState(currentUser?.name || '')
  const [title, setTitle] = useState(currentUser?.title || '')
  const [bio, setBio] = useState(currentUser?.bio || '')
  const [company, setCompany] = useState(currentUser?.company || '')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Save to user storage
    const allUsers = JSON.parse(localStorage.getItem('mintgig_users_v1') || '[]')
    const idx = allUsers.findIndex((u) => u.id === currentUser?.id)
    if (idx !== -1) {
      allUsers[idx] = {
        ...allUsers[idx],
        name,
        title,
        bio,
        company: currentUser.role === 'client' ? company : allUsers[idx].company
      }
      localStorage.setItem('mintgig_users_v1', JSON.stringify(allUsers))
      refreshUser()
      setSuccess(true)
      showToast('Profile updated successfully!', 'success')
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Account Profile & Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your public creator profile and platform preferences.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 mb-6">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg">{currentUser?.name}</span>
                <RoleBadge role={currentUser?.role || 'learner'} />
              </div>
              <div className="text-xs text-slate-500">{currentUser?.email}</div>
            </div>
          </div>

          {success && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headline / Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {currentUser?.role === 'client' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Studio</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bio & Background</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Security Notice on Role Escalation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Security Rule Enforced:</span> Roles (Learner, Client, Reviewer, Admin) are strictly locked by server / RLS policy to prevent unauthorized privilege escalation. Use the demo account switcher in the top banner for multi-persona evaluation.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* System & Data Management Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-2">Hackathon System Diagnostics</h2>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Storage Adapter Mode:</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                {isDemoMode ? 'Persistent LocalStorage Adapter' : 'Supabase PostgreSQL Client'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Simulated Wallet Ledger:</span>
              <span className="font-bold text-slate-900">
                ${currentUser?.walletBalance?.toFixed(2) || '0.00'} USD
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Reset Demo Database</div>
                <div className="text-[11px] text-slate-500">Restore initial seeded paths, gigs, and submissions.</div>
              </div>
              <button
                onClick={resetDemo}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Seed Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
