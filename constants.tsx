
import { Project, Skill, Experience } from './types';
export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: 'Uwase Sonia',
  role: 'Full Stack Engineer',
  tagline: 'Crafting digital experiences at the intersection of AI and Elegant Code.',
  about: `I'm passionate about building technology that feels simple on the surface but powerful underneath. With interests spanning full-stack development, UI/UX design, and cybersecurity, I enjoy creating digital products that are intuitive, scalable, and secure. I believe great technology is not just built, it's carefully crafted to connect human creativity with the precision of machines.`,
  location: 'Kigali, Rwanda',
  email: 'uwasesonia43@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Hilink',
    description: 'A modern travel booking web application built with React and Tailwind CSS that helps users explore destinations, view travel packages, and plan trips through a clean, responsive interface..',
    tags: ['Nextjs', 'TypeScript', 'Tailwind CSS'],
    image: '/hilink.png',
    link: '#',
    github: '#',
    category: 'Frontend'
  },
  {
    id: '2',
    title: 'UPS - Edgereach',
    description: 'A fully integrated hotel operations system handling cost control, inventory management, POS, and finance. Automates workflows like purchasing, stock movement, recipe costing, and revenue tracking while providing dashboards for real-time insights and operational control.',
    tags: ['Figma', 'Adobe XD', 'UI/UX Design'],
    image: '/UPS.jpeg',
    link: '#',
    category: 'Design'
  },
  {
    id: '3',
    title: 'INN - Sync',
    description: 'A hotel reservation and management platform that streamlines booking, room allocation, and payments. Designed for both guests and hotel staff, it ensures smooth operations with real-time updates and efficient management workflows.',
    tags: ['Figma', 'Adobe XD', 'UI/UX Design'],
    image: '/inn.jpeg',
    link: '#',
    category: 'Design'
  },
  {
    id: '4',
    title: 'SparkLock',
    description: 'A smart lock management system that allows users to control and monitor property access remotely. Features include real-time notifications, secure authentication, and an intuitive web and mobile interface.',
    tags: ['NestJS', 'SpringBoot', 'React Native', 'WebSocket'],
    image: '/SP.jpeg',
    link: '#',
    github: '#',
    category: 'Full Stack'
  },
  {
    id: '5',
    title: 'Smart Library',
    description: 'A MERN-based Smart Library Management System featuring a responsive React + Tailwind UI and an Express/MongoDB backend, supporting real-time data handling, CRUD operations, and efficient library administration..',
    tags: ['React', 'Express', 'Tailwind', 'MongoDB'],
    image: '/smart-library.png',
    link: '#',
    github: '#',
    category: 'Full Stack'
  },
  {
    id: '6',
    title: 'SaveIt',
    description: 'A smart savings and budgeting app that empowers users to take control of their finances by setting goals, tracking spending, and building healthy saving habits..',
    tags: ['PostgreSQL', 'React Native', 'Framer Motion', 'SpringBoot'],
    image: 'https://picsum.photos/seed/lumina/800/600',
    link: '#',
    github: '#',
    category: 'Full Stack'
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 92, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'React Native', level: 95, category: 'Frontend' },

  { name: 'Express', level: 88, category: 'Backend' },
  { name: 'SpringBoot', level: 50, category: 'Backend' },
  { name: 'PostgreSQL', level: 85, category: 'Backend' },
  // Design
  { name: 'Figma', level: 90, category: 'Design' },
  { name: 'Adobe XD', level: 75, category: 'Design' },
  { name: 'UI/UX Theory', level: 95, category: 'Design' },
  // Embedded
  { name: 'C/C++', level: 90, category: 'Embedded' },
  { name: 'Arduino', level: 85, category: 'Embedded' },
  { name: 'Raspberry Pi', level: 50, category: 'Embedded' },
  // DevOps
  { name: 'Docker', level: 45, category: 'DevOps' },
  { name: 'Kubernetes', level: 30, category: 'DevOps' },
  { name: 'AWS', level: 45, category: 'DevOps' },
  { name: 'CI/CD Pipelines', level: 35, category: 'DevOps' },
  // AI
  { name: 'PyTorch', level: 35, category: 'AI' }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'INN-SYNC, UPS -Edgereach and Other',
    position: 'Freelancer UI/UX Designer',
    period: '2026',
    description: [
      'Designing immersive digital experiences for luxury hospitality and corporate clients.',
      'Developing comprehensive design systems and high-fidelity prototypes to streamline brand consistency.',
      'Translating complex business requirements into intuitive and visually stunning user journeys.'
    ]
  },
  {
    company: 'Blink Tech Startup(Co)',
    position: 'FrontEnd Developer',
    period: '2025 - Present',
    description: [
      'Spearheading the core frontend architecture for a high-performance tech startup platform.',
      'Collaborating closely with product owners to define the technical roadmap and feature implementation.',
      'Optimizing application performance and accessibility for a growing global user base.'
    ]
  },
  {
    company: 'Ngwino Project',
    position: 'Front End Developer and Researcher',
    period: '2024 - 2025',
    description: [
      'Conducted extensive user research to inform the development of human-centric frontend features.',
      'Built and maintained highly responsive UI components using React and Tailwind CSS.',
      'Collaborated with the research team to implement data-driven UI improvements.'
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'First Place Winner',
    organization: 'First Lego League',
    year: '2024',
    description: 'Awarded first place for excellence in robotics design, innovation, and core values among elite regional teams.'
  },
  {
    title: 'Weekly Challenge Winner',
    organization: 'Wavumbuzi',
    year: '2023',
    description: 'Recognized as a top performer in weekly entrepreneurship and problem-solving challenges.'
  },
  {
    title: 'Camp Champion',
    organization: 'Coderina Girl Summer Camp',
    year: '2024',
    description: 'Project secured 1st place for demonstrating outstanding technical implementation and social impact.'
  },
  {
    title: 'Ideation & Prototyping Workshop',
    organization: 'Innovate Hub',
    year: '2025',
    description: 'Active participation in advanced product design and rapid prototyping methodology workshops.'
  }
];

export interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'BYIRINGIRO ALOYS',
    role: 'Colleague',
    feedback: 'Sonia demonstrates leadership through support rather than authority. By mentoring others, encouraging questions, and guiding teammates through challenges, she helps build confident and capable developers.',
    rating: 5
  },
  {
    name: 'IRASUBIZA MUCYO Bertrand',
    role: 'Collaborator',
    feedback: 'Sonia is a dependable and hardworking developer who consistently delivers good work and maintains a positive attitude.',
    rating: 5
  },
  {
    name: 'KALIZA Esther',
    role: 'Frontend Developer',
    feedback: 'Sonia is the best frontend developer I have ever worked with.',
    rating: 5
  }
];
