import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  count: number;
  icon: React.ReactNode;
}

export function CategoryCard({ title, description, href, count, icon }: CategoryCardProps) {
  return (
    <Link 
      to={href}
      className="group relative block border border-white/10 ring-1 ring-white/5 rounded-3xl p-8 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-orange-500/50 hover:ring-orange-500/20 backdrop-blur-md transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/10"
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700 ease-out"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-zinc-400 group-hover:text-orange-400 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all duration-500">
            {icon}
          </div>
          <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-zinc-400 group-hover:bg-orange-500/10 group-hover:text-orange-400 group-hover:border-orange-500/20 transition-all duration-500">
            {count} Projects
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white mb-3 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 mb-8 font-light leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-medium text-zinc-300 group-hover:text-orange-400 transition-colors">
          Explore Category
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
