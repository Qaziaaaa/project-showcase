import { Link, useLocation } from 'react-router-dom';
import { Container } from './Container';
import { Github, Linkedin, BookOpen } from 'lucide-react';
import { Logo } from './Logo';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-orange-400 font-medium' : 'text-zinc-400 hover:text-white transition-colors';
  };

  return (
    <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm shadow-black/20">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1 transition-colors group">
            <Logo size={28} className="group-hover:scale-110 transition-transform duration-300 mr-0.5" />
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">azi Farhan Ahmad</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/frontend" className={isActive('/frontend')}>
              Frontend
            </Link>
            <Link to="/fullstack" className={isActive('/fullstack')}>
              Fullstack
            </Link>
            <a href="https://drive.google.com/file/d/1jyTb2rIx2ic2nf9Go3BGjwqMc8pbVRXM/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Resume</span>
            </a>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </nav>

          {/* Mobile menu simple version */}
          <div className="flex md:hidden items-center gap-4 text-sm">
            <Link to="/frontend" className={isActive('/frontend')}>
              FE
            </Link>
            <Link to="/fullstack" className={isActive('/fullstack')}>
              FS
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
