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
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
}
