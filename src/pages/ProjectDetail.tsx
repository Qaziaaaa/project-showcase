import { useParams, Link, Navigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { projects } from '../data/projects';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { TechIcon } from '../components/TechIcon';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="py-12 md:py-16">
      <Container>
        <Link 
          to={`/${project.category}`}
          className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to {project.category === 'frontend' ? 'Frontend' : 'Fullstack'} Projects
        </Link>

        <div className="max-w-4xl">
          {/* Live Preview Iframe */}
          <div className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-10 bg-zinc-900 border border-white/10 ring-1 ring-white/5 relative group backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
            <iframe 
              src={project.live} 
              title={project.title}
              className="w-full h-full border-none bg-zinc-900"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          <div className="max-w-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-zinc-300 border border-white/10 ring-1 ring-white/5 capitalize transition-colors">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

          <div className="bg-zinc-900/40 rounded-3xl p-6 md:p-8 mb-10 border border-white/10 ring-1 ring-white/5 backdrop-blur-md">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">My Role</h2>
            <p className="text-zinc-300 leading-relaxed font-light">
              {project.role}
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechIcon key={tech} name={tech} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 ring-1 ring-white/5 rounded-xl text-sm font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] transition-all duration-300"
            >
              <Github className="w-4 h-4 mr-2" />
              View Source
            </a>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </div>
        </div>
        </div>
      </Container>
    </div>
  );
}
