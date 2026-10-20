import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, Shield, Code, Database } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-mint-300" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Mint<span className="text-brand-400">Gig</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              MintGig turns beginner learning into practical proof and paid micro-work. Complete challenges, unlock client gigs, and build an indisputable evidence portfolio.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-lg p-2.5">
              <Shield className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Zero credentials exposed. Dual-mode local demo & Supabase connected.</span>
            </div>
          </div>

          {/* Learn & Explore */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Learn & Prove</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/paths" className="hover:text-white transition">
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link to="/paths" className="hover:text-white transition">
                  Graphic & UI Design
                </Link>
              </li>
              <li>
                <Link to="/paths" className="hover:text-white transition">
                  Growth & Social Media
                </Link>
              </li>
              <li>
                <Link to="/gigs" className="hover:text-white transition">
                  Unlocked Micro-Gigs
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfolios & Trust */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Evidence & Reviews</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/portfolio" className="hover:text-white transition">
                  Verified Portfolios
                </Link>
              </li>
              <li>
                <Link to="/reviewer" className="hover:text-white transition">
                  Staff Reviewer System
                </Link>
              </li>
              <li>
                <Link to="/client" className="hover:text-white transition">
                  Client Talent Portal
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Learner Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon Specs */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Prototype Stack</h4>
            <p className="text-xs text-slate-400 mb-2">
              Engineered for hackathon judging criteria with React 18, Vite, Tailwind CSS, Supabase PostgreSQL, and LocalStorage dual-adapter.
            </p>
            <div className="text-[11px] text-slate-500 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Code className="w-3.5 h-3.5 text-brand-400" />
                <span>React + Vite (JS)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>PostgreSQL / Supabase</span>
              </div>
              <div className="text-[10px] text-amber-300/80 pt-1 border-t border-slate-700/50">
                Notice: All financial payouts and balances are simulated for hackathon demo purposes.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 MintGig. All rights reserved. Built for 24-Hour Prototype Hackathon.
          </div>
          <div className="flex items-center gap-4">
            <span>Learn. Prove. Earn.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
