import React, { createContext, useContext, useState, useEffect } from 'react'
import { DEMO_ACCOUNTS } from '../lib/demoAccounts'
import { storage, initializeStorage } from '../lib/storageAdapter'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(true)

  // Initialize storage and initial user session
  useEffect(() => {
    initializeStorage()
    
    // Check if user was previously selected or default to Alex Rivera (Learner)
    const savedUserId = localStorage.getItem('mintgig_active_user_id')
    const allUsers = storage.getUsers()
    
    if (savedUserId) {
      const found = allUsers.find(u => u.id === savedUserId)
      if (found) {
        setCurrentUser(found)
      } else {
        setCurrentUser(DEMO_ACCOUNTS[0]) // default to Alex Rivera
      }
    } else {
      setCurrentUser(DEMO_ACCOUNTS[0])
    }
    
    // Check if Supabase is active
    if (isSupabaseConfigured()) {
      setIsDemoMode(false)
    } else {
      setIsDemoMode(true)
    }

    setIsLoading(false)
  }, [])

  // Refresh user data (e.g. after earnings or challenge completion)
  const refreshUser = () => {
    if (!currentUser) return
    const updated = storage.getUserById(currentUser.id)
    if (updated) {
      setCurrentUser({ ...updated })
    }
  }

  // Switch demo account instantly
  const switchDemoAccount = (roleOrId) => {
    const allUsers = storage.getUsers()
    let target = allUsers.find(u => u.id === roleOrId || u.role === roleOrId)
    if (!target) {
      target = DEMO_ACCOUNTS.find(u => u.role === roleOrId) || DEMO_ACCOUNTS[0]
    }
    setCurrentUser(target)
    localStorage.setItem('mintgig_active_user_id', target.id)
    return target
  }

  // Standard Login (demo or Supabase)
  const login = async (email, password) => {
    setIsLoading(true)
    try {
      const user = storage.getUserByEmail(email)
      if (!user) {
        throw new Error('No account found with this email address.')
      }
      if (user.password && user.password !== password) {
        throw new Error('Invalid password. For demo accounts use password123.')
      }

      setCurrentUser(user)
      localStorage.setItem('mintgig_active_user_id', user.id)
      return { success: true, user }
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Register new user
  const signup = async ({ name, email, password, role = 'learner', title, company }) => {
    setIsLoading(true)
    try {
      const newUser = storage.createUser({
        name,
        email,
        password,
        role,
        title: title || (role === 'client' ? 'Hiring Lead' : 'Learner & Creator'),
        company: role === 'client' ? company || 'Startup Co.' : undefined,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
      })

      setCurrentUser(newUser)
      localStorage.setItem('mintgig_active_user_id', newUser.id)
      return { success: true, user: newUser }
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Return to public or unauthenticated state
    setCurrentUser(null)
    localStorage.removeItem('mintgig_active_user_id')
  }

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
    isDemoMode,
    login,
    signup,
    logout,
    switchDemoAccount,
    refreshUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
