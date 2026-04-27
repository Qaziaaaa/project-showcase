import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { TechIcon } from './TechIcon';

interface ProjectCardProps {
  project: Project;
  key?: string | number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link 
      to={`/project/${project.slug}`}
      className="group block h-full border border-white/10 ring-1 ring-white/5 rounded-3xl bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-orange-500/50 hover:ring-orange-500/20 backdrop-blur-md transition-all duration-500 overflow-hidden flex flex-col relative shadow-xl hover:shadow-2xl hover:shadow-orange-500/10"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
      
      {/* Preview removed as requested */}
      
      <div className="p-8 flex flex-col flex-grow relative z-10">
        <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-orange-400 transition-colors mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-8 flex-grow font-light leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.slice(0, 4).map((tech) => (
            <TechIcon key={tech} name={tech} />
          ))}
          {project.tech.length > 4 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-zinc-400 border border-white/10 ring-1 ring-white/5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
