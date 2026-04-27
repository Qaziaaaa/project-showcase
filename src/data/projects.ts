export type Project = {
  slug: string;
  title: string;
  category: 'frontend' | 'fullstack';
  description: string;
  role: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: 'hiking-app',
    title: 'Hiking App',
    category: 'fullstack',
    description: 'A comprehensive full-stack application for discovering and sharing hiking trails.',
    role: 'Developed the complete MERN stack architecture, including RESTful APIs, user authentication, and a responsive frontend.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/Qaziaaaa/hiking-app',
    live: 'https://hiking-app-puce.vercel.app/',
    image: 'https://picsum.photos/seed/hiking-app/800/500?blur=2'
  },
  {
    slug: 'portfolio-qazi',
    title: 'Personal Portfolio',
    category: 'frontend',
    description: 'My personal portfolio website showcasing my skills, projects, and professional journey.',
    role: 'Designed and developed the entire frontend, focusing on performance, accessibility, and modern UI/UX principles.',
    tech: ['React', 'Tailwind CSS', 'Vite', 'HTML5'],
    github: 'https://github.com/Qaziaaaa/Cinematic-Personal-Portfolio',
    live: 'https://porfolio-qazi.netlify.app',
    image: 'https://picsum.photos/seed/portfolio-qazi/800/500?blur=2'
  },
  {
    slug: 'agencyx-ai',
    title: 'AgencyX AI',
    category: 'frontend',
    description: 'A modern landing page for an AI-powered creative agency.',
    role: 'Implemented the responsive layout, smooth scroll animations, and interactive UI components.',
    tech: ['React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Qaziaaaa/AI-Agency-app',
    live: 'https://agencyxai.netlify.app',
    image: 'https://picsum.photos/seed/agencyx-ai/800/500?blur=2'
  },
  {
    slug: 'qbuilds',
    title: 'QBuilds',
    category: 'frontend',
    description: 'A construction and architecture firm website with a focus on project galleries.',
    role: 'Built the frontend interface, integrated image lightboxes, and optimized assets for fast loading.',
    tech: ['React', 'CSS3', 'Vite'],
    github: 'https://github.com/Qaziaaaa/Construction-app',
    live: 'https://qbulids.netlify.app',
    image: 'https://picsum.photos/seed/qbuilds/800/500?blur=2'
  },
  {
    slug: 'vertex-design-lab',
    title: 'Vertex Design Lab',
    category: 'frontend',
    description: 'A creative studio website featuring bold typography and custom cursor interactions.',
    role: 'Developed custom animations and interactive elements to create a unique user experience.',
    tech: ['React', 'Tailwind CSS', 'Figma'],
    github: 'https://github.com/Qaziaaaa/vertex-studio',
    live: 'https://vertexdesignlab.netlify.app',
    image: 'https://picsum.photos/seed/vertex-design-lab/800/500?blur=2'
  },
  {
    slug: 'marketingz',
    title: 'MarketingZ',
    category: 'frontend',
    description: 'A digital marketing agency website with service showcases and contact forms.',
    role: 'Created the frontend layout, implemented form validation, and ensured cross-browser compatibility.',
    tech: ['React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Qaziaaaa/Marketing-frontend-project',
    live: 'https://marketingz.netlify.app',
    image: 'https://picsum.photos/seed/marketingz/800/500?blur=2'
  },
  {
    slug: 'landing-page-saas',
    title: 'SaaS Landing Page',
    category: 'frontend',
    description: 'A high-converting landing page template for Software-as-a-Service products.',
    role: 'Designed pricing tables, feature toggles, and optimized the page for conversion rate.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Qaziaaaa/SAAS',
    live: 'https://landingpagesaas.netlify.app',
    image: 'https://picsum.photos/seed/landing-page-saas/800/500?blur=2'
  },
  {
    slug: 'ecommerce-store-qazi',
    title: 'E-Commerce Store',
    category: 'frontend',
    description: 'A modern e-commerce storefront with product filtering, cart functionality, and checkout flow.',
    role: 'Built the client-side state management for the shopping cart and integrated product search.',
    tech: ['React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Qaziaaaa/ecommerce-frontend',
    live: 'https://ecommercestoreqazi.netlify.app',
    image: 'https://picsum.photos/seed/ecommerce-store-qazi/800/500?blur=2'
  },
  {
    slug: 'oliipop',
    title: 'Oliipop Clone',
    category: 'frontend',
    description: 'A visually engaging clone of the Olipop soda brand website.',
    role: 'Recreated complex CSS animations, scroll effects, and vibrant color schemes.',
    tech: ['React', 'CSS3', 'Vite'],
    github: 'https://github.com/Qaziaaaa/Olipop-animated-site',
    live: 'https://oliipop.netlify.app',
    image: 'https://picsum.photos/seed/oliipop/800/500?blur=2'
  },
  {
    slug: 'gaming-bench',
    title: 'Gaming Bench',
    category: 'frontend',
    description: 'A platform for gaming news, reviews, and community discussions.',
    role: 'Developed the frontend architecture, including article layouts and comment sections.',
    tech: ['React', 'Tailwind CSS', 'Next.js'],
    github: 'https://github.com/Qaziaaaa/Gaming-app',
    live: 'https://gamingbench.netlify.app',
    image: 'https://picsum.photos/seed/gaming-bench/800/500?blur=2'
  },
  {
    slug: 'ecommerce-system',
    title: 'Full Stack E-Commerce',
    category: 'fullstack',
    description: 'A comprehensive full-stack e-commerce store with modern features.',
    role: 'Developed the complete full stack architecture, handling both frontend and backend functionality.',
    tech: ['Next.js', 'React', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/Qaziaaaa/ecommerce-system.git',
    live: 'https://ecommerce-store-one-ochre.vercel.app/',
    image: 'https://picsum.photos/seed/ecommerce-system/800/500?blur=2'
  },
  {
    slug: 'css-website',
    title: 'University Community Platform',
    category: 'fullstack',
    description: 'A university community website built with Next.js.',
    role: 'Developed the community platform, focusing on user engagement and responsive design.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/mazharktk5/css-website.git',
    live: 'https://cssuop.org/',
    image: 'https://picsum.photos/seed/css-website/800/500?blur=2'
  }
];
