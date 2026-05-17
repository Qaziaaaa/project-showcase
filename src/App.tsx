/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const FrontendProjects = lazy(() => import('./pages/FrontendProjects').then(m => ({ default: m.FrontendProjects })));
const FullstackProjects = lazy(() => import('./pages/FullstackProjects').then(m => ({ default: m.FullstackProjects })));
const AiProjects = lazy(() => import('./pages/AiProjects').then(m => ({ default: m.AiProjects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative">
        {/* Global Grid Background - Net lines made more prominent */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/frontend" element={<FrontendProjects />} />
                <Route path="/fullstack" element={<FullstackProjects />} />
                <Route path="/ai" element={<AiProjects />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="border-t border-white/5 py-8 mt-12 bg-black/40 backdrop-blur-md relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-xs font-light">
              <div>
                © {new Date().getFullYear()} Qazi Farhan Ahmad. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/Qaziaaaa" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">GitHub</a>
                <span>•</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
                <span>•</span>
                <a href="/admin" className="hover:text-orange-400/80 transition-colors font-medium" title="Admin Portal">CMS Console</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}
