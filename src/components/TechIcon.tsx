import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiPostgresql, 
  SiVuedotjs, 
  SiGraphql, 
  SiMongodb, 
  SiPython, 
  SiFastapi, 
  SiRedis, 
  SiStorybook, 
  SiCssmodules, 
  SiVite, 
  SiMapbox, 
  SiStyledcomponents, 
  SiRollupdotjs,
  SiHtml5,
  SiFigma,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiPostman
} from 'react-icons/si';
import { FaCss3Alt, FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Code2 } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "" }: TechIconProps) {
  const getIcon = () => {
    const normalizedName = name.toLowerCase().replace(/\s+/g, '');
    
    switch (normalizedName) {
      case 'react': return <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />;
      case 'typescript': return <SiTypescript className="w-3.5 h-3.5 text-[#3178C6]" />;
      case 'tailwindcss': return <SiTailwindcss className="w-3.5 h-3.5 text-[#06B6D4]" />;
      case 'next.js': return <SiNextdotjs className="w-3.5 h-3.5 text-white" />;
      case 'node.js': return <SiNodedotjs className="w-3.5 h-3.5 text-[#339933]" />;
      case 'express': return <SiExpress className="w-3.5 h-3.5 text-white" />;
      case 'postgresql': return <SiPostgresql className="w-3.5 h-3.5 text-[#4169E1]" />;
      case 'vue.js': return <SiVuedotjs className="w-3.5 h-3.5 text-[#4FC08D]" />;
      case 'graphql': return <SiGraphql className="w-3.5 h-3.5 text-[#E10098]" />;
      case 'mongodb': return <SiMongodb className="w-3.5 h-3.5 text-[#47A248]" />;
      case 'python': return <SiPython className="w-3.5 h-3.5 text-[#3776AB]" />;
      case 'fastapi': return <SiFastapi className="w-3.5 h-3.5 text-[#009688]" />;
      case 'redis': return <SiRedis className="w-3.5 h-3.5 text-[#DC382D]" />;
      case 'storybook': return <SiStorybook className="w-3.5 h-3.5 text-[#FF4785]" />;
      case 'cssmodules': return <SiCssmodules className="w-3.5 h-3.5 text-[#1572B6]" />;
      case 'vite': return <SiVite className="w-3.5 h-3.5 text-[#646CFF]" />;
      case 'mapbox': return <SiMapbox className="w-3.5 h-3.5 text-white" />;
      case 'styledcomponents': return <SiStyledcomponents className="w-3.5 h-3.5 text-[#DB7093]" />;
      case 'rollup': return <SiRollupdotjs className="w-3.5 h-3.5 text-[#EC4A3F]" />;
      case 'html5': return <SiHtml5 className="w-3.5 h-3.5 text-[#E34F26]" />;
      case 'css3': return <FaCss3Alt className="w-3.5 h-3.5 text-[#1572B6]" />;
      case 'figma': return <SiFigma className="w-3.5 h-3.5 text-[#F24E1E]" />;
      case 'prisma': return <SiPrisma className="w-3.5 h-3.5 text-white" />;
      case 'git': return <SiGit className="w-3.5 h-3.5 text-[#F05032]" />;
      case 'github': return <SiGithub className="w-3.5 h-3.5 text-white" />;
      case 'vercel': return <SiVercel className="w-3.5 h-3.5 text-white" />;
      case 'netlify': return <SiNetlify className="w-3.5 h-3.5 text-[#00C7B7]" />;
      case 'docker': return <SiDocker className="w-3.5 h-3.5 text-[#2496ED]" />;
      case 'vscode': return <VscVscode className="w-3.5 h-3.5 text-[#007ACC]" />;
      case 'postman': return <SiPostman className="w-3.5 h-3.5 text-[#FF6C37]" />;
      case 'aws': return <FaAws className="w-3.5 h-3.5 text-white" />;
      default: return <Code2 className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-zinc-300 border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 ${className}`}>
      {getIcon()}
      {name}
    </span>
  );
}
