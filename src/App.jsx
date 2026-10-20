import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DemoSwitcherBanner from './components/DemoSwitcherBanner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotificationToast from './components/NotificationToast'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import LearnerDashboard from './pages/LearnerDashboard'
import LearningPathsPage from './pages/LearningPathsPage'
import PathDetailPage from './pages/PathDetailPage'
import ChallengePage from './pages/ChallengePage'
import GigMarketplacePage from './pages/GigMarketplacePage'
import GigDetailPage from './pages/GigDetailPage'
import WorkSubmissionPage from './pages/WorkSubmissionPage'
import SubmissionDetailPage from './pages/SubmissionDetailPage'
import PortfolioPage from './pages/PortfolioPage'
import ClientDashboard from './pages/ClientDashboard'
import ReviewerDashboard from './pages/ReviewerDashboard'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Demo Account & Environment Bar */}
      <DemoSwitcherBanner />

      {/* Main Top Navbar */}
      <Navbar />

      {/* Notification Toast Layer */}
      <NotificationToast />

      {/* Content Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<LearnerDashboard />} />
          <Route path="/paths" element={<LearningPathsPage />} />
          <Route path="/paths/:pathId" element={<PathDetailPage />} />
          <Route path="/challenges/:challengeId" element={<ChallengePage />} />
          <Route path="/gigs" element={<GigMarketplacePage />} />
          <Route path="/gigs/:gigId" element={<GigDetailPage />} />
          <Route path="/gigs/:gigId/submit" element={<WorkSubmissionPage />} />
          <Route path="/submissions/:submissionId" element={<SubmissionDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/reviewer" element={<ReviewerDashboard />} />
          <Route path="/profile" element={<ProfileSettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
