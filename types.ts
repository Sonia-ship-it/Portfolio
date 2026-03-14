
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  category?: 'Frontend' | 'Full Stack' | 'Figma Works' | string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools' | 'AI' | 'Embedded' | 'Design' | 'DevOps';
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
