import { useState } from 'react';
import { Container } from '../components/Container';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export function FullstackProjects() {
  const [visibleCount, setVisibleCount] = useState(3);
  const fullstackProjects = projects.filter(p => p.category === 'fullstack');

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Fullstack Projects</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            End-to-end applications showcasing backend architecture, database design, and API integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullstackProjects.slice(0, visibleCount).map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {visibleCount < fullstackProjects.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={loadMore}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              Load More Projects
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
