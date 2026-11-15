import type { TeamMember } from '../types';

/* ==================================================================
 * TEAM CREDITS
 * Edit names, roles, bios and responsibilities here — the Credits page
 * updates automatically. Photos live in /public/team/.
 * ================================================================== */

export const TEAM_NAME = 'Team COSMIC LOST & FOUND';

export const team: TeamMember[] = [
  {
    id: 'sana-ullah',
    name: 'Sana Ullah',
    role: 'Team Leader',
    photo: 'team/sanaullah.jpg',
    bio: 'Led the team from idea to launch — set the mission, divided the work and kept the whole crew on course.',
    responsibilities: ['Project vision & planning', 'Team coordination & deadlines', 'Final review of features & content', 'Pitch presentation lead'],
    skills: ['Leadership', 'Project management', 'Communication', 'Presentation'],
    accent: '#f2603a',
  },
  {
    id: 'khuzaima',
    name: 'Khuzaima',
    role: 'NASA Researcher',
    photo: 'team/khuzaima.jpg',
    bio: 'Researched every mission using official NASA sources and turned the science into stories young explorers can enjoy.',
    responsibilities: ['Mission research & fact-checking', 'Mission statuses & coordinates', 'Quiz questions & explanations', '"Robot\'s Last Message" stories'],
    skills: ['Space science', 'Research', 'Technical writing', 'Storytelling'],
    accent: '#34d399',
  },
  {
    id: 'noman-ali',
    name: 'Noman Ali',
    role: 'UI/UX Designer',
    photo: 'team/noman-ali.jpg',
    bio: 'Designed the cinematic space-museum look: the colours, layouts and interactions that make exploring feel like a mission.',
    responsibilities: ['Visual design system', 'Page layouts & user flows', 'Mission illustrations & patch designs', 'Accessibility & mobile layout'],
    skills: ['UI design', 'Tailwind CSS', 'Prototyping', 'Accessibility'],
    accent: '#5ab0ff',
  },
  {
    id: 'muhammad-saad',
    name: 'Muhammad Saad',
    role: 'Frontend Developer & QA Tester',
    photo: 'team/muhammad-saad.jpg',
    bio: 'Built the interactive features and tested every button, filter and map marker on desktop and mobile.',
    responsibilities: ['Interactive map & timeline', 'Quiz & Patch Lab features', 'Testing on desktop & mobile', 'Demo video support'],
    skills: ['JavaScript', 'React', 'Testing', 'Debugging'],
    accent: '#a78bfa',
  },
];
