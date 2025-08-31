import { Opportunity } from '@/components/shared';
import { Organization } from '@/features/organizations/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OrganizationType } from '@/features/organizations/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: remove this here once the backend for opportunities is ready
export const opportunityData: Opportunity[] = [
  {
    id: 1,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Starts Mar 5, 2025',
    title: 'Advanced React Development',
    organization: 'React Masters',
    location: 'Online',
    description:
      'Master React hooks, context API, and advanced state management patterns. Build complex applications with performance optimization techniques.',
    matchReason:
      'Matches your interest in frontend development and your experience with JavaScript frameworks.',
    dueDate: 'Enroll by Feb 28, 2025',
  },
  {
    id: 2,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Feb 1, 2025',
    title: 'Senior Frontend Developer',
    organization: 'TechNova Solutions',
    location: 'San Francisco, CA (Remote)',
    description:
      'Lead frontend development for our SaaS platform. Work with React, TypeScript, and modern web technologies in a fast-paced startup environment.',
    matchReason:
      '95% match with your skills in React, TypeScript, and UI/UX design experience.',
    dueDate: 'Apply by Feb 28, 2025',
  },
  {
    id: 3,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'Apr 15-17, 2025',
    title: 'Web3 & Blockchain Summit',
    organization: 'Crypto Innovators',
    location: 'Austin, TX',
    description:
      'Annual gathering of blockchain developers, entrepreneurs, and industry leaders. Featuring workshops, keynotes, and networking opportunities.',
    matchReason:
      'Based on your interest in decentralized technologies and previous blockchain projects.',
    dueDate: 'Early bird ends Mar 1, 2025',
  },
  {
    id: 4,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Self-paced',
    title: 'Cloud Architecture with AWS',
    organization: 'Cloud Academy',
    location: 'Online',
    description:
      'Learn to design and deploy scalable, highly available, and fault-tolerant systems on AWS. Covers EC2, S3, RDS, Lambda, and more.',
    matchReason:
      'Complements your experience with cloud technologies and system design skills.',
    dueDate: 'Access for 1 year',
  },
  {
    id: 5,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Jan 28, 2025',
    title: 'UX/UI Designer',
    organization: 'DesignHub',
    location: 'New York, NY (Hybrid)',
    description:
      'Create beautiful, intuitive interfaces for our enterprise clients. Work closely with product managers and developers to deliver exceptional user experiences.',
    matchReason:
      'Matches your design portfolio and experience with Figma and user research.',
    dueDate: 'Apply by Mar 15, 2025',
  },
  {
    id: 6,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'May 5-7, 2025',
    title: 'AI & Machine Learning Conference',
    organization: 'AI Collective',
    location: 'Boston, MA',
    description:
      'Explore the latest advancements in AI and machine learning. Hands-on workshops, research presentations, and networking with industry leaders.',
    matchReason:
      'Based on your interest in AI applications and previous data science projects.',
    dueDate: 'Early bird ends Apr 1, 2025',
  },
  {
    id: 7,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Starts Apr 10, 2025',
    title: 'DevOps Engineering Bootcamp',
    organization: 'CodeCraft Academy',
    location: 'Online',
    description:
      'Intensive 12-week program covering Docker, Kubernetes, CI/CD pipelines, and infrastructure as code with Terraform.',
    matchReason:
      'Aligns with your goal to expand your DevOps skills and work with cloud infrastructure.',
    dueDate: 'Apply by Mar 31, 2025',
  },
  {
    id: 8,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Feb 5, 2025',
    title: 'Full Stack Developer',
    organization: 'Digital Innovations',
    location: 'Remote (Global)',
    description:
      'Work on cutting-edge web applications using React, Node.js, and modern cloud technologies. Full-time remote position with flexible hours.',
    matchReason:
      '92% match with your full-stack development experience and remote work preference.',
    dueDate: 'Apply by Mar 15, 2025',
  },
  {
    id: 9,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'Jun 20-22, 2025',
    title: 'Tech Leadership Summit',
    organization: 'LeadDev',
    location: 'Chicago, IL',
    description:
      'For engineering leaders looking to grow their leadership skills. Topics include team management, technical strategy, and career growth.',
    matchReason:
      'Based on your recent promotion to team lead and interest in leadership development.',
    dueDate: 'Early bird ends May 1, 2025',
  },
  {
    id: 10,
    type: 'COURSE',
    typeColor: 'bg-yellow-100 text-yellow-800',
    date: 'Self-paced',
    title: 'Advanced TypeScript Patterns',
    organization: 'TypeScript Masters',
    location: 'Online',
    description:
      'Master advanced TypeScript features including decorators, generics, type inference, and functional programming patterns.',
    matchReason:
      'Complements your TypeScript skills and will help with your current project at work.',
    dueDate: 'Lifetime access',
  },
  {
    id: 11,
    type: 'JOB',
    typeColor: 'bg-blue-100 text-blue-800',
    date: 'Posted Jan 30, 2025',
    title: 'Mobile Developer (React Native)',
    organization: 'AppVenture',
    location: 'Seattle, WA',
    description:
      'Build cross-platform mobile applications using React Native. Work with a talented team on consumer-facing apps with millions of users.',
    matchReason:
      'Matches your React experience and interest in mobile development.',
    dueDate: 'Apply by Mar 1, 2025',
  },
  {
    id: 12,
    type: 'EVENT',
    typeColor: 'bg-red-100 text-red-800',
    date: 'Jul 10-12, 2025',
    title: 'International JavaScript Conference',
    organization: 'JS Foundation',
    location: 'Berlin, Germany',
    description:
      'The largest JavaScript conference in Europe. Featuring talks from industry experts, workshops, and networking opportunities.',
    matchReason:
      'Perfect opportunity to stay updated with the latest in JavaScript and network with other developers.',
    dueDate: 'Early bird ends May 15, 2025',
  },
];

// TODO: remove this here once the backend for organizations is ready
export const organizationData: Organization[] = [
  {
    id: '1',
    name: 'University of the Philippines',
    type: OrganizationType.university,
    description:
      'A premier institution of higher learning in the Philippines, offering a wide range of undergraduate and postgraduate programs.',
    website: 'https://up.edu.ph',
    logoUrl: '/public/sponsors/ecop.png', // Placeholder, replace with actual logo URL
    location: 'Diliman, Quezon City, Philippines',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Google',
    type: OrganizationType.company,
    description:
      'A multinational technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.',
    website: 'https://about.google/',
    logoUrl: '/public/sponsors/create8.png', // Placeholder, replace with actual logo URL
    location: 'Mountain View, California, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Dole Food Company',
    type: OrganizationType.company,
    description:
      "One of the world's largest producers and marketers of fresh fruit and vegetables.",
    website: 'https://www.dole.com/',
    logoUrl: '/public/sponsors/dole.png', // Placeholder, replace with actual logo URL
    location: 'Charlotte, North Carolina, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Microsoft',
    type: OrganizationType.company,
    description:
      'A global technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    website: 'https://www.microsoft.com/',
    logoUrl: '/public/sponsors/dole2.png',
    location: 'Redmond, Washington, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Stanford University',
    type: OrganizationType.university,
    description:
      "One of the world's leading research and teaching institutions, located in Stanford, California.",
    website: 'https://www.stanford.edu/',
    logoUrl: '/public/sponsors/ecop.png',
    location: 'Stanford, California, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Meta Platforms',
    type: OrganizationType.company,
    description:
      'An American multinational technology conglomerate based in Menlo Park, California.',
    website: 'https://about.meta.com/',
    logoUrl: '/public/sponsors/create8.png',
    location: 'Menlo Park, California, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Harvard University',
    type: OrganizationType.university,
    description:
      'A private Ivy League research university in Cambridge, Massachusetts.',
    website: 'https://www.harvard.edu/',
    logoUrl: '/public/sponsors/ecop.png',
    location: 'Cambridge, Massachusetts, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Amazon',
    type: OrganizationType.company,
    description:
      'An American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.',
    website: 'https://www.amazon.com/',
    logoUrl: '/public/sponsors/dole.png',
    location: 'Seattle, Washington, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    name: 'California Institute of Technology',
    type: OrganizationType.university,
    description:
      'A world-renowned science and engineering research and education institution, located in Pasadena, California.',
    website: 'https://www.caltech.edu/',
    logoUrl: '/public/sponsors/ecop.png',
    location: 'Pasadena, California, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    name: 'Apple Inc.',
    type: OrganizationType.company,
    description:
      'An American multinational technology company headquartered in Cupertino, California.',
    website: 'https://www.apple.com/',
    logoUrl: '/public/sponsors/dole2.png',
    location: 'Cupertino, California, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '11',
    name: 'University of Cambridge',
    type: OrganizationType.university,
    description:
      'A collegiate research university in Cambridge, United Kingdom.',
    website: 'https://www.cam.ac.uk/',
    logoUrl: '/public/sponsors/ecop.png',
    location: 'Cambridge, United Kingdom',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '12',
    name: 'Netflix',
    type: OrganizationType.company,
    description:
      'An American subscription streaming service and production company.',
    website: 'https://www.netflix.com/',
    logoUrl: '/public/sponsors/create8.png',
    location: 'Los Gatos, California, USA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '13',
    name: 'Oxford University',
    type: OrganizationType.university,
    description: 'A collegiate research university in Oxford, England.',
    website: 'https://www.ox.ac.uk/',
    logoUrl: '/public/sponsors/ecop.png',
    location: 'Oxford, England',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
