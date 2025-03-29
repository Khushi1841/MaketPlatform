
export type UserRole = 'student' | 'freelancer' | 'company' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  location?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  company: {
    id: string;
    name: string;
    logo?: string;
  };
  skills: string[];
  categories: string[];
  duration: string;
  budget?: string;
  status: 'open' | 'in-progress' | 'completed';
  teamSize: number;
  applicants?: string[];
  contributors?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assignedTo?: string[];
  status: 'to-do' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  projectId?: string;
  content: string;
  attachments?: string[];
  readBy?: string[];
  createdAt: Date;
}

export interface Mentorship {
  id: string;
  mentorId: string;
  menteeId: string;
  status: 'requested' | 'active' | 'completed' | 'declined';
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
