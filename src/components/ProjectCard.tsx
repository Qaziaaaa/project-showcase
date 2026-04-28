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
      className="group block h-full border border-white/10 rounded-[2rem] bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-orange-500/50 backdrop-blur-md transition-all duration-500 flex flex-col relative shadow-2xl overflow-hidden"
    >
      {/* Wireframe Placeholder Top - matches the image's top block aesthetic */}
      <div className="p-4 pb-0">
        <div className="w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden border border-white/5 group-hover:border-orange-500/30 transition-colors duration-500">
          {/* Decorative wireframe shapes resembling UI */}
          <div className="w-3/4 h-6 bg-white/10 rounded-xl"></div>
          <div className="w-1/2 h-6 bg-white/10 rounded-xl"></div>
          <div className="mt-auto flex gap-3">
            <div className="w-16 h-8 bg-white/5 rounded-lg"></div>
            <div className="w-16 h-8 bg-white/5 rounded-lg"></div>
          </div>
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>
      
      <div className="p-8 pt-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-400 mb-8 flex-grow font-light leading-relaxed">
          {project.description}
        </p>
        
        {/* Full width button matching the reference image's layout */}
        <div className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-center text-sm font-semibold text-zinc-300 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all duration-300 shadow-lg">
          View Details
        </div>
      </div>
    </Link>
  );
}
