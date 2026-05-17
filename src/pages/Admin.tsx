import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { defaultProjects, Project } from '../data/projects';
import { 
  Plus, Edit, Trash2, Settings, Github, Globe, Key, Eye, EyeOff, 
  Save, Download, Copy, Check, AlertCircle, Database, UploadCloud, 
  Lock, Unlock, RefreshCw, ExternalLink, FileText, X, ChevronRight, LogOut
} from 'lucide-react';

export function Admin() {
  const navigate = useNavigate();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [savedPasscode, setSavedPasscode] = useState<string | null>(null);
  const [isSettingPasscode, setIsSettingPasscode] = useState(false);
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Projects states
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'sync' | 'export'>('projects');
  
  // Form states (Add/Edit Project)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState<'frontend' | 'fullstack' | 'ai'>('frontend');
  const [formDescription, setFormDescription] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formTechString, setFormTechString] = useState('');
  const [formGithub, setFormGithub] = useState('');
  const [formLive, setFormLive] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formTimeline, setFormTimeline] = useState('');
  const [formDeliverablesString, setFormDeliverablesString] = useState('');
  const [formHighlightsString, setFormHighlightsString] = useState('');
  const [formError, setFormError] = useState('');

  // GitHub Sync states
  const [githubToken, setGithubToken] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [githubBranch, setGithubBranch] = useState('main');
  const [showGithubToken, setShowGithubToken] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'testing' | 'committing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  // UI alert states
  const [successToast, setSuccessToast] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Load passcode and projects on mount
  useEffect(() => {
    // 1. Passcode setup
    const saved = localStorage.getItem('project_showcase_admin_passcode');
    if (!saved) {
      setIsSettingPasscode(true);
    } else {
      setSavedPasscode(saved);
    }

    // 2. Load projects
    const savedProjects = localStorage.getItem('project_showcase_projects');
    if (savedProjects) {
      try {
        setProjectsList(JSON.parse(savedProjects));
      } catch (e) {
        setProjectsList(defaultProjects);
      }
    } else {
      setProjectsList(defaultProjects);
      localStorage.setItem('project_showcase_projects', JSON.stringify(defaultProjects));
    }

    // 3. Load Sync settings
    const savedToken = localStorage.getItem('project_showcase_github_token') || '';
    const savedRepo = localStorage.getItem('project_showcase_github_repo') || '';
    const savedBranch = localStorage.getItem('project_showcase_github_branch') || 'main';
    setGithubToken(savedToken);
    setGithubRepo(savedRepo);
    setGithubBranch(savedBranch);

    // Check if session token exists
    const sessionAuth = sessionStorage.getItem('project_showcase_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Flash toast message
  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Passcode verification
  const handleSetPasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setAuthError('Passcode cannot be empty.');
      return;
    }
    if (passcode !== confirmPasscode) {
      setAuthError('Passcodes do not match.');
      return;
    }
    localStorage.setItem('project_showcase_admin_passcode', passcode);
    setSavedPasscode(passcode);
    setIsSettingPasscode(false);
    setIsAuthenticated(true);
    sessionStorage.setItem('project_showcase_authenticated', 'true');
    setAuthError('');
    triggerToast('Passcode configured successfully!');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === savedPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('project_showcase_authenticated', 'true');
      setAuthError('');
      setPasscode('');
    } else {
      setAuthError('Invalid passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('project_showcase_authenticated');
    setPasscode('');
  };

  // Slug generator helper
  useEffect(() => {
    if (!editingProject && formTitle) {
      const generated = formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormSlug(generated);
    }
  }, [formTitle, editingProject]);

  // Open Form for Adding
  const handleOpenAddForm = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('frontend');
    setFormDescription('');
    setFormRole('');
    setFormTechString('');
    setFormGithub('');
    setFormLive('');
    setFormClient('');
    setFormTimeline('');
    setFormDeliverablesString('');
    setFormHighlightsString('');
    setFormError('');
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEditForm = (proj: Project) => {
    setEditingProject(proj);
    setFormTitle(proj.title);
    setFormSlug(proj.slug);
    setFormCategory(proj.category);
    setFormDescription(proj.description);
    setFormRole(proj.role || '');
    setFormTechString(proj.tech.join(', '));
    setFormGithub(proj.github);
    setFormLive(proj.live);
    setFormClient(proj.client || '');
    setFormTimeline(proj.timeline || '');
    setFormDeliverablesString(proj.deliverables ? proj.deliverables.join(', ') : '');
    setFormHighlightsString(proj.highlights ? proj.highlights.join('\n') : '');
    setFormError('');
    setIsFormOpen(true);
  };

  // Handle Form Submission (Save Project Locally)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!formTitle.trim()) return setFormError('Title is required.');
    if (!formSlug.trim()) return setFormError('Slug is required.');
    if (!formDescription.trim()) return setFormError('Description is required.');
    if (!formGithub.trim()) return setFormError('GitHub repository URL is required.');
    if (!formLive.trim()) return setFormError('Live site preview URL is required.');

    const techArray = formTechString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (techArray.length === 0) {
      return setFormError('Please add at least one tool or technology.');
    }

    // Check slug collision
    const slugCollision = projectsList.some(
      p => p.slug === formSlug.trim() && (!editingProject || p.slug !== editingProject.slug)
    );
    if (slugCollision) {
      return setFormError('A project with this slug already exists. Please choose a unique title or edit the slug.');
    }

    const deliverablesArray = formDeliverablesString
      .split(',')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    const highlightsArray = formHighlightsString
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    const newProject: Project = {
      slug: formSlug.trim(),
      title: formTitle.trim(),
      category: formCategory,
      description: formDescription.trim(),
      role: formRole.trim() || `Developed the frontend components and optimized code structure using ${techArray[0] || 'modern tech'}.`,
      tech: techArray,
      github: formGithub.trim(),
      live: formLive.trim(),
      image: `https://picsum.photos/seed/${formSlug.trim()}/800/500?blur=2`,
      client: formClient.trim() || undefined,
      timeline: formTimeline.trim() || undefined,
      deliverables: deliverablesArray.length > 0 ? deliverablesArray : undefined,
      highlights: highlightsArray.length > 0 ? highlightsArray : undefined
    };

    let updatedList: Project[] = [];
    if (editingProject) {
      updatedList = projectsList.map(p => p.slug === editingProject.slug ? newProject : p);
      triggerToast('Project updated successfully!');
    } else {
      updatedList = [newProject, ...projectsList];
      triggerToast('New project created successfully!');
    }

    setProjectsList(updatedList);
    localStorage.setItem('project_showcase_projects', JSON.stringify(updatedList));
    setIsFormOpen(false);
  };

  // Delete Project
  const handleDeleteProject = (slug: string) => {
    if (window.confirm('Are you absolutely sure you want to delete this project?')) {
      const updatedList = projectsList.filter(p => p.slug !== slug);
      setProjectsList(updatedList);
      localStorage.setItem('project_showcase_projects', JSON.stringify(updatedList));
      triggerToast('Project deleted successfully!');
    }
  };

  // Helper to generate the exact TS contents
  const getTSCode = () => {
    const serializedProjects = JSON.stringify(projectsList, null, 2);
    return `export type Project = {
  slug: string;
  title: string;
  category: 'frontend' | 'fullstack' | 'ai';
  description: string;
  role: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
  client?: string;
  timeline?: string;
  deliverables?: string[];
  highlights?: string[];
};

// Hardcoded default projects
export const defaultProjects: Project[] = ${serializedProjects};

// Dynamically load projects from localStorage if available, otherwise default to defaultProjects
export const projects: Project[] = (() => {
  try {
    const saved = localStorage.getItem('project_showcase_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  } catch (e) {
    console.error('Error loading projects from localStorage:', e);
    return defaultProjects;
  }
})();
`;
  };

  // Copy Code to Clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(getTSCode());
    setCopiedCode(true);
    triggerToast('Source code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Download projects.ts File
  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([getTSCode()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'projects.ts';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    triggerToast('projects.ts downloaded successfully!');
  };

  // Test GitHub Connection
  const handleTestGithub = async () => {
    if (!githubToken || !githubRepo) {
      setSyncStatus('error');
      setSyncMessage('Please provide both your Personal Access Token and Repository Path (owner/repo).');
      return;
    }

    setSyncStatus('testing');
    setSyncMessage('Verifying connection to your GitHub repository...');

    try {
      const response = await fetch(`https://api.github.com/repos/${githubRepo.trim()}`, {
        headers: {
          'Authorization': `Bearer ${githubToken.trim()}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        setSyncStatus('success');
        setSyncMessage('Successfully connected to GitHub repository! Ready to publish.');
        // Save settings
        localStorage.setItem('project_showcase_github_token', githubToken.trim());
        localStorage.setItem('project_showcase_github_repo', githubRepo.trim());
        localStorage.setItem('project_showcase_github_branch', githubBranch.trim());
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSyncStatus('error');
        setSyncMessage(`Failed to connect. GitHub API returned: ${errorData.message || response.statusText}`);
      }
    } catch (err: any) {
      setSyncStatus('error');
      setSyncMessage(`Error testing connection: ${err.message}`);
    }
  };

  // Publish / Commit to GitHub Live Repo
  const handlePublishLive = async () => {
    if (!githubToken || !githubRepo) {
      setSyncStatus('error');
      setSyncMessage('Missing GitHub token or repository path.');
      return;
    }

    // Double check confirmation
    if (!window.confirm('This will commit the updated projects list directly to your live GitHub repository, which will trigger a rebuild and redeployment of your live portfolio. Continue?')) {
      return;
    }

    setSyncStatus('committing');
    setSyncMessage('Initiating deployment... (1/3: Fetching repo details)');

    const fileUrl = `https://api.github.com/repos/${githubRepo.trim()}/contents/src/data/projects.ts`;
    const token = githubToken.trim();

    try {
      // Step 1: Fetch the file to get its current SHA
      let currentSha = '';
      const getFileResponse = await fetch(`${fileUrl}?ref=${githubBranch}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (getFileResponse.status === 200) {
        const fileData = await getFileResponse.json();
        currentSha = fileData.sha;
        setSyncMessage('File details acquired. (2/3: Committing updated project list to GitHub)');
      } else if (getFileResponse.status === 404) {
        // File does not exist yet in this branch/path (rare but let's allow creating it)
        setSyncMessage('File src/data/projects.ts not found. Creating a new file... (2/3: Committing updated project list to GitHub)');
      } else {
        const errorData = await getFileResponse.json().catch(() => ({}));
        throw new Error(`Failed to fetch file. GitHub returned: ${errorData.message || getFileResponse.statusText}`);
      }

      // Step 2: Encode the new code to Base64 (supporting Unicode characters correctly)
      const codeToPush = getTSCode();
      const encodedCode = btoa(unescape(encodeURIComponent(codeToPush)));

      // Step 3: Put/Commit the file
      const commitResponse = await fetch(fileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'chore: update projects list dynamically via Portfolio CMS',
          content: encodedCode,
          sha: currentSha || undefined,
          branch: githubBranch
        })
      });

      if (commitResponse.ok) {
        setSyncStatus('success');
        setSyncMessage('SUCCESS! The updated project list has been committed directly to your repository! Your hosting service (Vercel/Netlify) is currently building and deploying the changes. The changes will be live worldwide in 1-2 minutes!');
        triggerToast('Site published successfully!');
        
        // Save settings
        localStorage.setItem('project_showcase_github_token', token);
        localStorage.setItem('project_showcase_github_repo', githubRepo.trim());
        localStorage.setItem('project_showcase_github_branch', githubBranch.trim());
      } else {
        const errorData = await commitResponse.json().catch(() => ({}));
        throw new Error(errorData.message || commitResponse.statusText);
      }
    } catch (err: any) {
      setSyncStatus('error');
      setSyncMessage(`Failed to deploy changes: ${err.message}`);
    }
  };

  // PASSCODE SETTING VIEW
  if (isSettingPasscode) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md bg-zinc-950/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent pointer-events-none" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-black text-white">Create Admin Passcode</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Setup a private passcode to secure your dynamic admin CMS panel when deployed live.
            </p>
          </div>

          <form onSubmit={handleSetPasscodeSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Create Passcode</label>
              <input 
                type="password"
                placeholder="Enter numbers or text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors text-center font-semibold tracking-widest"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Confirm Passcode</label>
              <input 
                type="password"
                placeholder="Re-enter passcode"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors text-center font-semibold tracking-widest"
              />
            </div>

            {authError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold rounded-2xl shadow-lg shadow-orange-500/10 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Save and Access CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PIN ENTRY VIEW (LOCKED SCREEN)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md bg-zinc-950/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent pointer-events-none" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-black text-white">Portfolio Admin Portal</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Enter your secret admin passcode to manage your projects.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2 text-center">Admin Passcode</label>
              <input 
                type="password"
                placeholder="••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors text-center font-bold text-2xl tracking-[0.5em]"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold rounded-2xl shadow-lg shadow-orange-500/10 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" /> Unlock Dashboard
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => {
                if (window.confirm("Forgot passcode? If you click OK, you will reset the passcode, but you will need to re-verify yourself in development. Do you want to proceed?")) {
                  localStorage.removeItem('project_showcase_admin_passcode');
                  setIsSettingPasscode(true);
                  setPasscode('');
                  setConfirmPasscode('');
                }
              }}
              className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-colors"
            >
              Reset Passcode
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN CMS WORKBENCH (UNLOCKED VIEW)
  return (
    <div className="py-12 md:py-16 relative z-10">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 px-6 py-4 bg-zinc-900 border border-orange-500/50 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-orange-400" />
          </div>
          <span className="text-sm font-semibold text-white">{successToast}</span>
        </div>
      )}

      <Container>
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Administration Console</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-zinc-400">Database Sync active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              CMS Panel <span className="text-zinc-500 text-2xl font-light">Showcase Manager</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleOpenAddForm}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/10 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" /> Add Project
            </button>
            
            <button 
              onClick={handleLogout}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              title="Lock CMS Dashboard"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Grid */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-950 border border-white/5 rounded-2xl mb-10 max-w-lg">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'projects' ? 'bg-white/10 text-white border border-white/10' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <span className="flex items-center justify-center gap-2"><Database className="w-4 h-4" /> Showcase ({projectsList.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('sync')}
            className={`py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'sync' ? 'bg-white/10 text-white border border-white/10' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <span className="flex items-center justify-center gap-2"><UploadCloud className="w-4 h-4" /> Live Sync</span>
          </button>
          <button 
            onClick={() => setActiveTab('export')}
            className={`py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'export' ? 'bg-white/10 text-white border border-white/10' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            <span className="flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> Export TS</span>
          </button>
        </div>

        {/* TAB CONTENT: PROJECTS LIST */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {projectsList.length === 0 ? (
              <div className="text-center py-20 bg-zinc-950/40 border border-white/10 rounded-3xl backdrop-blur-md">
                <AlertCircle className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300">No Projects Found</h3>
                <p className="text-zinc-500 text-sm mt-2 max-w-sm mx-auto">Your database is currently empty. Click "Add Project" to add your first CSS-skeleton showcase project!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projectsList.map((proj) => (
                  <div 
                    key={proj.slug} 
                    className="p-6 bg-zinc-900/40 hover:bg-zinc-900/60 border border-white/10 hover:border-orange-500/50 rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="text-2xl font-bold text-white leading-tight">{proj.title}</span>
                        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/5 border border-white/10 text-orange-400">{proj.category}</span>
                      </div>
                      <p className="text-sm text-zinc-400 font-light max-w-3xl mb-3 leading-relaxed line-clamp-2">{proj.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> {proj.github}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                        <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {proj.live}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5 justify-end">
                      <a 
                        href={`/project/${proj.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors"
                        title="View Live Detail Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      
                      <button 
                        onClick={() => handleOpenEditForm(proj)}
                        className="p-3 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 rounded-xl text-zinc-400 hover:text-orange-400 transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => handleDeleteProject(proj.slug)}
                        className="p-3 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: LIVE GITHUB SYNC */}
        {activeTab === 'sync' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-500/15 border border-orange-500/30 rounded-2xl">
                  <UploadCloud className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Direct GitHub Deployment Integration</h3>
                  <p className="text-sm text-zinc-400 mt-1">Push modifications seamlessly into your git repository to trigger your pipeline builds.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">GitHub Personal Access Token (PAT)</label>
                  <div className="relative">
                    <input 
                      type={showGithubToken ? "text" : "password"}
                      placeholder="ghp_xxxxxxxxxxxx"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      className="w-full pl-5 pr-12 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors font-mono"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowGithubToken(!showGithubToken)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showGithubToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">GitHub Repository Path</label>
                    <input 
                      type="text"
                      placeholder="username/repository"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Target Deployment Branch</label>
                    <input 
                      type="text"
                      placeholder="main"
                      value={githubBranch}
                      onChange={(e) => setGithubBranch(e.target.value)}
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                {syncStatus !== 'idle' && (
                  <div className={`p-5 border rounded-2xl flex items-start gap-4 ${
                    syncStatus === 'testing' || syncStatus === 'committing' 
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                      : syncStatus === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    {(syncStatus === 'testing' || syncStatus === 'committing') ? (
                      <RefreshCw className="w-5 h-5 animate-spin shrink-0 mt-0.5" />
                    ) : syncStatus === 'success' ? (
                      <Check className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-white capitalize">{syncStatus === 'testing' || syncStatus === 'committing' ? 'Processing...' : syncStatus}</h4>
                      <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{syncMessage}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button 
                    onClick={handleTestGithub}
                    disabled={syncStatus === 'testing' || syncStatus === 'committing'}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all flex items-center gap-2 active:scale-98 disabled:opacity-50"
                  >
                    <Key className="w-4 h-4" /> Test Connection
                  </button>

                  <button 
                    onClick={handlePublishLive}
                    disabled={syncStatus === 'testing' || syncStatus === 'committing'}
                    className="px-8 py-3.5 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold rounded-2xl shadow-lg shadow-orange-500/10 transition-all flex items-center gap-2 active:scale-98 disabled:opacity-50"
                  >
                    <UploadCloud className="w-4 h-4" /> Publish to Live Site
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-4">How it works</h4>
                <ul className="space-y-4 text-sm text-zinc-400 font-light leading-relaxed">
                  <li className="flex gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span>Your portfolio acts as a static React site hosted on Netlify or Vercel.</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span>When you click <strong>Publish to Live Site</strong>, the CMS uses the GitHub API to replace <code>src/data/projects.ts</code> inside your repository.</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span>This commit instantly triggers your host to rebuild the applet with the new data.</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span>Your visitors see the changes live immediately after the build finishes—zero server fees or setups required!</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Need a Token?</h4>
                <a 
                  href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio%20Showcase%20CMS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-orange-400 hover:text-orange-300 underline inline-flex items-center gap-1.5 font-medium transition-colors"
                >
                  Create GitHub Classic PAT <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-zinc-500 mt-1">Requires the <strong>repo</strong> checkbox scope permission to edit file contents.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: EXPORT CODE */}
        {activeTab === 'export' && (
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-orange-400" /> Export Static projects.ts Code</h3>
                <p className="text-sm text-zinc-400 mt-1">If you prefer manual coding, copy this code block and replace the contents of <code>src/data/projects.ts</code> in your editor.</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopyCode}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all flex items-center gap-2 active:scale-95 text-sm"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedCode ? 'Copied' : 'Copy Code'}
                </button>
                
                <button 
                  onClick={handleDownloadCode}
                  className="px-5 py-3 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold rounded-2xl transition-all flex items-center gap-2 active:scale-95 text-sm"
                >
                  <Download className="w-4 h-4" /> Download projects.ts
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-black/60 shadow-inner">
              <div className="absolute top-3 right-3 text-xs bg-zinc-900 border border-white/15 px-3 py-1 rounded-full text-zinc-500 font-mono select-none">typescript</div>
              <pre className="p-6 text-sm text-zinc-300 font-mono overflow-x-auto max-h-[500px] leading-relaxed select-all">
                {getTSCode()}
              </pre>
            </div>
          </div>
        )}
      </Container>

      {/* MODAL: ADD / EDIT PROJECT DIALOGPLACEHOLDER */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between z-10 shrink-0">
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                {editingProject ? <Edit className="w-6 h-6 text-orange-400" /> : <Plus className="w-6 h-6 text-orange-400" />}
                {editingProject ? 'Edit Project Details' : 'Add New Showcase Project'}
              </h3>
              
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-2 bg-white/5 border border-white/5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <form onSubmit={handleFormSubmit} className="flex-grow overflow-y-auto p-6 space-y-6 z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Project Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AgencyX AI"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Unique URL Slug</label>
                  <input 
                    type="text" 
                    placeholder="e.g. agencyx-ai"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors font-mono"
                    disabled={!!editingProject}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Project Category</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="frontend">Frontend Project</option>
                    <option value="fullstack">Fullstack Project</option>
                    <option value="ai">AI / ML Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Your Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Built standard fullstack MERN app layout..."
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Tech Stack (comma-separated list)</label>
                <input 
                  type="text" 
                  placeholder="React, Tailwind CSS, TypeScript, Vite"
                  value={formTechString}
                  onChange={(e) => setFormTechString(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-500 mt-1.5">Note: Entering common tools will automatically map icons (like React, Next.js, Node.js, Express, MongoDB, Tailwind CSS, groqapi, jinaai, supabase, etc.)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">GitHub Repository URL</label>
                  <input 
                    type="url" 
                    placeholder="https://github.com/Qaziaaaa/..."
                    value={formGithub}
                    onChange={(e) => setFormGithub(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Live Production URL</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    value={formLive}
                    onChange={(e) => setFormLive(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Client Name (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Personal brand / Vertex Lab"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Timeline / Duration (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3 weeks / 1 month"
                    value={formTimeline}
                    onChange={(e) => setFormTimeline(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Key Deliverables / Building Blocks (Optional, comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Responsive UI, CSS Wireframes, Layout Design"
                  value={formDeliverablesString}
                  onChange={(e) => setFormDeliverablesString(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-500 mt-1.5">Leave blank to use context-aware automatic blocks depending on the category.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Key Highlights / Features Built (Optional, one per line)</label>
                <textarea 
                  placeholder="e.g. Dynamic Hero and category sections&#10;Smooth interactions and layout animations&#10;Mobile-first responsive architecture"
                  rows={4}
                  value={formHighlightsString}
                  onChange={(e) => setFormHighlightsString(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed text-sm font-light"
                />
                <p className="text-[10px] text-zinc-500 mt-1.5">Leave blank to use default portfolio highlights.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-2">Brief Showcase Description</label>
                <textarea 
                  placeholder="Explain the project features, architecture, and purpose..."
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed text-sm"
                />
              </div>

              {formError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
            </form>

            {/* Modal Actions Footer */}
            <div className="p-6 border-t border-white/5 bg-zinc-950/80 z-10 shrink-0 flex items-center justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all text-sm"
              >
                Cancel
              </button>

              <button 
                type="button" 
                onClick={handleFormSubmit}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold rounded-2xl shadow-lg shadow-orange-500/10 transition-all text-sm"
              >
                {editingProject ? 'Save Changes' : 'Create Showcase'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
