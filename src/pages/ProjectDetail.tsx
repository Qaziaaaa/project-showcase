import { useParams, Link, Navigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { projects } from '../data/projects';
import { ArrowLeft } from 'lucide-react';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="py-12 md:py-16 relative z-10">
      <Container>
        <Link 
          to={`/${project.category}`}
          className="inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10 transition-all mb-12 shadow-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start mb-16">
          {/* Left Column: Info */}
          <div className="pr-0 lg:pr-8">
            <span className="text-zinc-500 text-sm capitalize font-bold mb-3 block tracking-wide">{project.category} Project</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg text-zinc-400 font-light mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 font-medium">
                Client: Personal brand
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 font-medium">
                Role: {project.role || 'Developer'}
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 font-medium">
                Timeline: 3 weeks
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-2xl text-sm font-bold text-black bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 transition-all shadow-lg shadow-orange-500/20"
              >
                Live Preview
              </a>
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all shadow-md"
              >
                GitHub Repo
              </a>
            </div>
          </div>

          {/* Right Column: Browser Mockup */}
          <div className="relative w-full rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl mt-8 lg:mt-0">
            {/* Browser Header */}
            <div className="h-12 border-b border-white/10 flex items-center px-6 gap-2 bg-zinc-800/80 backdrop-blur-md">
              <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
              {/* Fake address bar */}
              <div className="ml-4 flex-grow max-w-sm h-6 bg-black/30 rounded-md"></div>
            </div>
            {/* Content / Iframe */}
            <div className="relative h-[400px] lg:h-[500px] w-full bg-black/50">
              <iframe 
                src={project.live} 
                title={project.title}
                className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-white/20 transition-colors shadow-lg">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">Stack</span>
            <h3 className="text-2xl font-bold text-white mb-4">What it includes</h3>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-light">
              Key building blocks and deliverables for this project.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-xl border border-white/10 text-sm text-zinc-300 bg-white/5 font-medium">Responsive UI</span>
              <span className="px-4 py-2 rounded-xl border border-white/10 text-sm text-zinc-300 bg-white/5 font-medium">REST APIs</span>
              <span className="px-4 py-2 rounded-xl border border-white/10 text-sm text-zinc-300 bg-white/5 font-medium">Authentication</span>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-white/20 transition-colors shadow-lg">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">Tech</span>
            <h3 className="text-2xl font-bold text-white mb-4">Tools & technologies</h3>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-light">
              Main frameworks, libraries, and tooling used.
            </p>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl border border-white/10 text-sm text-zinc-300 bg-white/5 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:border-white/20 transition-colors shadow-lg">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-2">Highlights</span>
          <h3 className="text-2xl font-bold text-white mb-4">What was built</h3>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-light max-w-3xl">
            A quick breakdown of the most important features.
          </p>
          <ul className="list-disc list-inside text-zinc-300 text-sm space-y-3 font-light">
            <li>Dynamic Hero and category sections</li>
            <li>Smooth interactions and layout animations</li>
            <li>Mobile-first responsive architecture</li>
            <li>Optimized asset loading and performance</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
