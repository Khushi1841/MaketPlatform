
import { User, Project, UserRole } from '../types';

export const SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB',
  'PostgreSQL', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot',
  'HTML/CSS', 'UI/UX Design', 'Product Management', 'Digital Marketing',
  'Data Science', 'Machine Learning', 'AI', 'DevOps', 'Cloud Computing',
  'AWS', 'Azure', 'GCP', 'Mobile Development', 'iOS', 'Android',
  'React Native', 'Flutter', 'Blockchain', 'Security', 'Testing'
];

export const CATEGORIES = [
  'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
  'UI/UX Design', 'DevOps', 'Cloud Computing', 'Blockchain', 'Cybersecurity',
  'Product Management', 'Digital Marketing', 'Content Creation', 'E-commerce',
  'Education', 'Healthcare', 'Finance', 'Real Estate', 'Transportation',
  'Social Media', 'Gaming', 'AR/VR', 'IoT'
];

export const USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Computer Science student passionate about web development',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    location: 'New York, USA',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-06-20'),
    education: [
      {
        id: '1',
        institution: 'NYU',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: new Date('2021-09-01'),
        current: true,
        description: 'Focus on web technologies and databases',
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'freelancer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Full-stack developer with 5+ years of experience',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    location: 'San Francisco, USA',
    website: 'https://janesmith.dev',
    socialLinks: {
      linkedin: 'janesmith',
      github: 'janesmith',
      twitter: 'janesmith'
    },
    createdAt: new Date('2022-03-10'),
    updatedAt: new Date('2023-05-15'),
    experience: [
      {
        id: '1',
        title: 'Senior Developer',
        company: 'Tech Solutions Inc',
        location: 'San Francisco',
        startDate: new Date('2020-01-01'),
        current: true,
        description: 'Leading frontend development for multiple clients',
      }
    ]
  },
  {
    id: '3',
    name: 'Tech Innovations',
    email: 'info@techinnovations.com',
    role: 'company',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Building cutting-edge technology solutions for the future',
    location: 'Austin, USA',
    website: 'https://techinnovations.com',
    socialLinks: {
      linkedin: 'techinnovations',
      twitter: 'techinnovations'
    },
    createdAt: new Date('2021-11-05'),
    updatedAt: new Date('2023-04-18')
  },
  {
    id: '4',
    name: 'Dr. Alex Johnson',
    email: 'alex@example.com',
    role: 'mentor',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'PhD in Computer Science with 15+ years in the industry',
    skills: ['Machine Learning', 'AI', 'Data Science', 'Python'],
    location: 'Boston, USA',
    website: 'https://alexjohnson.com',
    socialLinks: {
      linkedin: 'alexjohnson',
      github: 'alexjohnson'
    },
    createdAt: new Date('2020-07-20'),
    updatedAt: new Date('2023-02-12'),
    experience: [
      {
        id: '1',
        title: 'Lead AI Researcher',
        company: 'AI Solutions',
        location: 'Boston',
        startDate: new Date('2018-03-01'),
        current: true,
        description: 'Leading research in natural language processing',
      }
    ]
  },
  {
    id: '5',
    name: 'Global Solutions Ltd',
    email: 'contact@globalsolutions.com',
    role: 'company',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'International consulting firm with focus on digital transformation',
    location: 'London, UK',
    website: 'https://globalsolutions.com',
    createdAt: new Date('2019-05-14'),
    updatedAt: new Date('2023-01-30')
  },
  {
    id: '6',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=6',
    bio: 'Graphic design student with interest in UI/UX',
    skills: ['UI/UX Design', 'Adobe XD', 'Figma', 'HTML/CSS'],
    location: 'Miami, USA',
    createdAt: new Date('2022-09-01'),
    updatedAt: new Date('2023-06-05'),
    education: [
      {
        id: '1',
        institution: 'Miami Design Institute',
        degree: 'Bachelor',
        field: 'Graphic Design',
        startDate: new Date('2021-09-01'),
        current: true,
        description: 'Focus on digital design and user experience',
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'Looking for talented developers to build a modern e-commerce platform with React frontend and Node.js backend. The platform should include payment integration, inventory management, and user authentication.',
    company: {
      id: '3',
      name: 'Tech Innovations',
      logo: 'https://i.pravatar.cc/150?img=3'
    },
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Payment Integration'],
    categories: ['Web Development', 'E-commerce'],
    duration: '3 months',
    budget: '$5,000 - $10,000',
    status: 'open',
    teamSize: 3,
    applicants: ['1', '2'],
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-06-01')
  },
  {
    id: '2',
    title: 'AI-Powered Customer Service Chatbot',
    description: 'We are looking to develop an intelligent chatbot that can handle customer inquiries, support tickets, and basic troubleshooting. The solution should integrate with our existing customer management system.',
    company: {
      id: '5',
      name: 'Global Solutions Ltd',
      logo: 'https://i.pravatar.cc/150?img=5'
    },
    skills: ['Machine Learning', 'NLP', 'Python', 'API Integration'],
    categories: ['AI', 'Machine Learning', 'Customer Service'],
    duration: '4 months',
    budget: '$15,000 - $20,000',
    status: 'open',
    teamSize: 2,
    applicants: ['4'],
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-06-05')
  },
  {
    id: '3',
    title: 'Mobile App UI/UX Redesign',
    description: 'Our financial services app needs a modern UI/UX redesign to improve user engagement and satisfaction. Looking for designers who can create intuitive interfaces that simplify complex financial transactions.',
    company: {
      id: '3',
      name: 'Tech Innovations',
      logo: 'https://i.pravatar.cc/150?img=3'
    },
    skills: ['UI/UX Design', 'Figma', 'Mobile Design', 'User Research'],
    categories: ['UI/UX Design', 'Mobile Development', 'Finance'],
    duration: '2 months',
    budget: '$8,000 - $12,000',
    status: 'open',
    teamSize: 2,
    applicants: ['6'],
    createdAt: new Date('2023-05-25'),
    updatedAt: new Date('2023-06-10')
  },
  {
    id: '4',
    title: 'Data Analytics Dashboard',
    description: 'Develop a comprehensive analytics dashboard for our marketing department to track campaign performance, customer engagement, and ROI. Should include data visualization and export capabilities.',
    company: {
      id: '5',
      name: 'Global Solutions Ltd',
      logo: 'https://i.pravatar.cc/150?img=5'
    },
    skills: ['Data Visualization', 'JavaScript', 'React', 'API Integration', 'SQL'],
    categories: ['Data Science', 'Web Development', 'Digital Marketing'],
    duration: '3 months',
    budget: '$10,000 - $15,000',
    status: 'open',
    teamSize: 2,
    applicants: ['2'],
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: '5',
    title: 'Blockchain-based Supply Chain Solution',
    description: 'Design and implement a blockchain solution to track and verify the authenticity of products throughout our supply chain. The solution should provide transparency to customers and partners.',
    company: {
      id: '3',
      name: 'Tech Innovations',
      logo: 'https://i.pravatar.cc/150?img=3'
    },
    skills: ['Blockchain', 'Smart Contracts', 'Web3', 'Solidity', 'React'],
    categories: ['Blockchain', 'Supply Chain', 'Web Development'],
    duration: '6 months',
    budget: '$20,000 - $30,000',
    status: 'open',
    teamSize: 4,
    applicants: [],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01')
  }
];

export function getRandomUsersByRole(role: UserRole, count: number = 3): User[] {
  const filtered = USERS.filter(user => user.role === role);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomProjects(count: number = 3): Project[] {
  const shuffled = [...PROJECTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find(project => project.id === id);
}

export function getUserById(id: string): User | undefined {
  return USERS.find(user => user.id === id);
}
