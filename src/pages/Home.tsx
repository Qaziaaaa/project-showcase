import { Container } from '../components/Container';
import { CategoryCard } from '../components/CategoryCard';
import { projects } from '../data/projects';
import { Github, Palette, Server, Wrench, BookOpen, Monitor, Database, Layout } from 'lucide-react';
import { TechIcon } from '../components/TechIcon';
import { SiReact, SiTailwindcss, SiTypescript, SiNextdotjs, SiNodedotjs, SiPostgresql } from 'react-icons/si';

const FloatingIcon = ({ icon: Icon, color, className }: { icon: any, color: string, className: string }) => (
  <div 
    className={`absolute flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 transition-transform hover:scale-110 duration-300 ${className}`} 
    style={{ boxShadow: `0 8px 32px -8px ${color}40` }}
  >
    <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
  </div>
);

export function Home() {
  const frontendCount = projects.filter(p => p.category === 'frontend').length;
  const fullstackCount = projects.filter(p => p.category === 'fullstack').length;

  const skills = [
    {
      category: "Frontend",
      icon: <Palette className="w-5 h-5 text-orange-500" />,
      items: ['React', 'Tailwind CSS', 'HTML5', 'CSS3', 'Vite', 'Next.js']
    },
    {
      category: "Backend & Database",
      icon: <Server className="w-5 h-5 text-orange-500" />,
      items: ['Node.js', 'Express', 'MongoDB', 'REST API']
    },
    {
      category: "Tools & Platforms",
      icon: <Wrench className="w-5 h-5 text-orange-500" />,
      items: ['Git', 'GitHub', 'Vercel', 'Netlify', 'VS Code', 'Postman']
    },
    {
      category: "Currently Learning",
      icon: <BookOpen className="w-5 h-5 text-orange-500" />,
      items: ['TypeScript', 'GraphQL', 'Docker']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section (Dark Theme) */}
      <div className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-24 flex items-center justify-center min-h-[85vh] border-b border-white/5">
        {/* Floating Icons - Left */}
        <div className="hidden lg:block absolute left-0 top-0 w-1/3 h-full pointer-events-none">
          <FloatingIcon icon={SiReact} color="#61DAFB" className="top-[20%] left-[40%]" />
          <FloatingIcon icon={SiTailwindcss} color="#06B6D4" className="top-[45%] left-[20%]" />
          <FloatingIcon icon={SiTypescript} color="#3178C6" className="top-[70%] left-[35%]" />
        </div>

        {/* Floating Icons - Right */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/3 h-full pointer-events-none">
          <FloatingIcon icon={SiNextdotjs} color="#ffffff" className="top-[25%] right-[35%]" />
          <FloatingIcon icon={SiNodedotjs} color="#339933" className="top-[50%] right-[20%]" />
          <FloatingIcon icon={SiPostgresql} color="#4169E1" className="top-[75%] right-[40%]" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 ring-1 ring-white/5 text-sm text-gray-300 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Junior MERN Stack Developer
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 max-w-5xl leading-[1.1]">
            All My Projects In One <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Place</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed">
            A curated collection of my frontend and full-stack applications, featuring modern UI/UX, scalable architectures, and clean code.
          </p>

          {/* Feature Row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 px-8 py-4 rounded-2xl bg-zinc-900/40 border border-white/10 ring-1 ring-white/5 text-sm font-medium text-gray-300 mb-12 backdrop-blur-md">
            <span className="flex items-center gap-2"><Monitor className="w-4 h-4 text-gray-400"/> Frontend</span>
            <span className="flex items-center gap-2"><Server className="w-4 h-4 text-gray-400"/> Backend</span>
            <span className="flex items-center gap-2"><Database className="w-4 h-4 text-gray-400"/> Database</span>
            <span className="flex items-center gap-2"><Layout className="w-4 h-4 text-gray-400"/> UI/UX</span>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#categories" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all shadow-lg shadow-white/10 flex items-center justify-center">
              View Projects
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-2">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </Container>
      </div>

      {/* Main Content (Dark Theme) */}
      <div className="py-24 flex-grow">
        <Container>
          {/* Categories Section */}
          <div id="categories" className="mb-32">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">Project Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryCard 
                title="Frontend Projects"
                description="UI/UX focused applications, design systems, and complex client-side state management."
                href="/frontend"
                count={frontendCount}
                icon={<Monitor className="w-6 h-6" />}
              />
              <CategoryCard 
                title="Fullstack Projects"
                description="End-to-end applications with database design, API development, and authentication."
                href="/fullstack"
                count={fullstackCount}
                icon={<Server className="w-6 h-6" />}
              />
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="bg-zinc-900/40 rounded-3xl p-8 border border-white/10 ring-1 ring-white/5 hover:border-orange-500/50 hover:ring-orange-500/20 transition-all duration-500 backdrop-blur-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/[0.05] rounded-2xl border border-white/10">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-100">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(tech => (
                      <TechIcon key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
