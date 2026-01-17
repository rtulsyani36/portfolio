
export interface Role {
  title: string;
  period: string;
  description: string[];
}

export interface Experience {
  id: number;
  company: string;
  roles: Role[];
  skills_used: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProjectFile {
  url: string;
  name: string;
  type: 'image' | 'video' | 'link' | 'youtube';
  thumbnail?: string; // Optional thumbnail for video/youtube types
  externalLink?: string; // Only required if type is 'link'
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  gallery?: ProjectFile[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
