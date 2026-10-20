import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RoleBadge from './RoleBadge'
import { 
  Compass, 
  Briefcase, 
  Award, 
  Menu, 
  X, 
  LogOut, 
  User, 
  DollarSign, 
  Sparkles, 
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  PlusCircle
} from 'lucide-react'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
    setProfileDropdownOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition transform">
                <Sparkles className="w-5 h-5 text-mint-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition">
                  Mint<span className="text-brand-600">Gig</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
                  Learn. Prove. Earn.
                </span>
              </div>
            </Link>

            {/* Main Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/paths"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/paths')
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4 text-brand-500" />
                <span>Learning Paths</span>
              </Link>

              <Link
                to="/gigs"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/gigs')
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Briefcase className="w-4 h-4 text-brand-500" />
                <span>Gig Marketplace</span>
              </Link>

              <Link
                to="/portfolio"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive('/portfolio')
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-4 h-4 text-brand-500" />
                <span>Verified Portfolios</span>
              </Link>
            </nav>
          </div>

          {/* Right section: Wallet, Dashboards, User profile */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Simulated Wallet Balance */}
                {currentUser.role === 'learner' && (
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>${currentUser.walletBalance?.toFixed(2) || '0.00'}</span>
                    <span className="text-[10px] text-emerald-600 font-normal opacity-85">(Simulated)</span>
                  </div>
                )}

                {/* Role-specific Action Button */}
                {currentUser.role === 'learner' && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-300" />
                    <span>Dashboard</span>
                  </Link>
                )}

                {currentUser.role === 'client' && (
                  <Link
                    to="/client"
                    className="flex items-center gap-1.5 bg-brand-600 text-white hover:bg-brand-700 px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Client Hub & Post Gig</span>
                  </Link>
                )}

                {currentUser.role === 'reviewer' && (
                  <Link
                    to="/reviewer"
                    className="flex items-center gap-1.5 bg-purple-700 text-white hover:bg-purple-800 px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Reviewer Console</span>
                  </Link>
                )}

                {/* User Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                  >
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
                    />
                    <div className="text-left hidden lg:block">
                      <div className="text-xs font-semibold text-slate-800 leading-tight">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] text-slate-500 capitalize">
                        {currentUser.role}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="font-semibold text-sm text-slate-900">{currentUser.name}</div>
                        <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                        <div className="mt-2">
                          <RoleBadge role={currentUser.role} />
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          <span>Learner Dashboard</span>
                        </Link>
                        <Link
                          to="/client"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          <span>Client Dashboard</span>
                        </Link>
                        <Link
                          to="/reviewer"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <ShieldCheck className="w-4 h-4 text-slate-400" />
                          <span>Reviewer Console</span>
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Profile & Settings</span>
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/paths"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            <Compass className="w-5 h-5 text-brand-600" />
            <span>Learning Paths</span>
          </Link>
          <Link
            to="/gigs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            <Briefcase className="w-5 h-5 text-brand-600" />
            <span>Gig Marketplace</span>
          </Link>
          <Link
            to="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            <Award className="w-5 h-5 text-brand-600" />
            <span>Evidence Portfolio</span>
          </Link>

          <div className="border-t border-slate-100 pt-3">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2">
                  <div className="text-sm font-semibold text-slate-800">{currentUser.name}</div>
                  <RoleBadge role={currentUser.role} />
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Learner Dashboard
                </Link>
                <Link
                  to="/client"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Client Dashboard
                </Link>
                <Link
                  to="/reviewer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Reviewer Console
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 bg-brand-600 text-white rounded-lg text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
