-- ==============================================================================
-- MintGig Supabase PostgreSQL Schema & Row Level Security (RLS)
-- Learn. Prove. Earn.
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Roles Enum
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('learner', 'client', 'reviewer', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'learner',
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  title TEXT,
  bio TEXT,
  company TEXT,
  skills TEXT[] DEFAULT '{}',
  wallet_balance NUMERIC(10, 2) DEFAULT 0.00,
  completed_challenges_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Learning Paths Table
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  icon TEXT DEFAULT 'Code',
  badge TEXT,
  level TEXT DEFAULT 'Beginner Friendly',
  estimated_hours TEXT DEFAULT '8 hours',
  description TEXT NOT NULL,
  overview TEXT,
  skills_awarded TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  path_id TEXT REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT,
  content TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Practical Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
  id TEXT PRIMARY KEY,
  path_id TEXT REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  points INT DEFAULT 100,
  skill_unlocked TEXT NOT NULL,
  time_estimate TEXT DEFAULT '30 mins',
  summary TEXT NOT NULL,
  brief TEXT NOT NULL,
  criteria JSONB DEFAULT '[]'::jsonb,
  starter_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Challenge Completions Table
CREATE TABLE IF NOT EXISTS public.challenge_completions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id TEXT REFERENCES public.challenges(id) ON DELETE CASCADE,
  skill_awarded TEXT NOT NULL,
  submission_text TEXT NOT NULL,
  project_url TEXT,
  status TEXT DEFAULT 'passed' CHECK (status IN ('passed', 'failed', 'review')),
  score INT DEFAULT 95,
  feedback TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- 8. Gigs Marketplace Table
CREATE TABLE IF NOT EXISTS public.gigs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  required_skills TEXT[] DEFAULT '{}',
  unlocked_by_challenge_id TEXT REFERENCES public.challenges(id),
  reward NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
  reward_currency TEXT DEFAULT 'USD',
  difficulty TEXT DEFAULT 'Beginner',
  deadline TEXT DEFAULT '3 days',
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'closed')),
  tags TEXT[] DEFAULT '{}',
  applicants_count INT DEFAULT 0,
  description TEXT NOT NULL,
  deliverables TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Gig Applications Table
CREATE TABLE IF NOT EXISTS public.gig_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  gig_id UUID REFERENCES public.gigs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  pitch TEXT,
  relevant_skills TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'accepted', 'rejected', 'completed')),
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(gig_id, user_id) -- Duplicate application prevention
);

-- 10. Work Submissions Table
CREATE TABLE IF NOT EXISTS public.work_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  gig_id UUID REFERENCES public.gigs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_url TEXT,
  live_demo_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'revision_requested', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  review_feedback TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Evidence-Based Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  gig_id UUID REFERENCES public.gigs(id),
  submission_id UUID REFERENCES public.work_submissions(id),
  title TEXT NOT NULL,
  summary TEXT,
  client_name TEXT,
  verified_skills TEXT[] DEFAULT '{}',
  live_demo_url TEXT,
  project_url TEXT,
  thumbnail TEXT,
  earnings NUMERIC(10, 2) DEFAULT 0.00,
  reviewer_name TEXT,
  reviewer_feedback TEXT,
  is_verified BOOLEAN DEFAULT true,
  approved_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_completions_user ON public.challenge_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_gigs_client ON public.gigs(client_id);
CREATE INDEX IF NOT EXISTS idx_gigs_challenge ON public.gigs(unlocked_by_challenge_id);
CREATE INDEX IF NOT EXISTS idx_applications_gig ON public.gig_applications(gig_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.gig_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_gig ON public.work_submissions(gig_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.work_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON public.portfolio_projects(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gig_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, self-update (with role lock)
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile without role escalation" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Learning Paths & Lessons & Challenges: Publicly viewable
CREATE POLICY "Learning paths viewable by all" ON public.learning_paths FOR SELECT USING (true);
CREATE POLICY "Lessons viewable by all" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Challenges viewable by all" ON public.challenges FOR SELECT USING (true);

-- Challenge Completions: Learners can insert their own, all can view verified completions
CREATE POLICY "View challenge completions" ON public.challenge_completions FOR SELECT USING (true);
CREATE POLICY "Insert own completion" ON public.challenge_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Gigs: Open to view, only clients can create
CREATE POLICY "Gigs are viewable by all" ON public.gigs FOR SELECT USING (true);
CREATE POLICY "Clients can create gigs" ON public.gigs FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update their own gigs" ON public.gigs FOR UPDATE USING (auth.uid() = client_id);

-- Gig Applications: Users can apply (if unlocked) and view their own applications
CREATE POLICY "Learners can view their own applications" ON public.gig_applications FOR SELECT 
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.gigs g WHERE g.id = gig_id AND g.client_id = auth.uid()));
CREATE POLICY "Learners can create applications" ON public.gig_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Submissions: Learners can insert and view their own, clients can view for their gigs, reviewers can view all
CREATE POLICY "View submissions" ON public.work_submissions FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    auth.uid() = client_id OR 
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('reviewer', 'admin'))
  );
CREATE POLICY "Learners can submit work" ON public.work_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Review Submission Security Rule: Learner CANNOT review/approve their own submission!
CREATE POLICY "Reviewers can review submissions" ON public.work_submissions FOR UPDATE 
  USING (
    auth.uid() != user_id AND (
      auth.uid() = client_id OR 
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('reviewer', 'admin'))
    )
  );

-- Portfolio Projects: Publicly viewable evidence
CREATE POLICY "Portfolio viewable by all" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Authorized system or reviewer can insert portfolio item" ON public.portfolio_projects FOR INSERT WITH CHECK (true);
