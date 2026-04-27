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
        {/* Global Grid Background - Made slightly more visible */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]"></div>
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
