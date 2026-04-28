/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { FrontendProjects } from './pages/FrontendProjects';
import { FullstackProjects } from './pages/FullstackProjects';
import { ProjectDetail } from './pages/ProjectDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative">
        {/* Global Grid Background - Made Prominent */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff25_2px,transparent_2px)] bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/frontend" element={<FrontendProjects />} />
              <Route path="/fullstack" element={<FullstackProjects />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
