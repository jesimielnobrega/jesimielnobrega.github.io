import type { Translations } from './i18n';

type ProjTranslations = Translations['proj'];

export interface StackItem {
  name: string;
  name2?: string;
  icon?: string;
  mono?: string;
  invert?: boolean;
  invert2?: boolean;
}

export interface Project {
  logo: string;
  name: string;
  url: string;
  domain: string;
  scope: string;
  desc: string;
  stack: string[];
}

export const coreStack: StackItem[] = [
  { name: 'React', name2: 'React Native', icon: 'react' },
  { name: 'Laravel',     icon: 'laravel' },
  { name: 'Inertia.js',  mono: 'In' },
  { name: 'Node.js',     icon: 'nodejs' },
  { name: 'Docker',      icon: 'docker' },
  { name: 'TypeScript',  icon: 'typescript' },
  { name: 'Python',      icon: 'python' }
];

const MARQUEE_ORDER: Array<{ key: string; label: string; invert?: boolean }> = [
  { key: 'react',        label: 'React' },
  { key: 'reactnative',  label: 'React Native' },
  { key: 'laravel',      label: 'Laravel' },
  { key: 'nodejs',       label: 'Node.js' },
  { key: 'typescript',   label: 'TypeScript' },
  { key: 'javascript',   label: 'JavaScript' },
  { key: 'python',       label: 'Python' },
  { key: 'tailwindcss',  label: 'Tailwind CSS' },
  { key: 'nextjs',       label: 'Next.js', invert: true },
  { key: 'php',          label: 'PHP' },
  { key: 'docker',       label: 'Docker' },
  { key: 'git',          label: 'Git' },
  { key: 'postgresql',   label: 'PostgreSQL' },
  { key: 'mysql',        label: 'MySQL' },
  { key: 'mongodb',      label: 'MongoDB' },
  { key: 'csharp',       label: 'C#' },
  { key: 'figma',        label: 'Figma' },
  { key: 'bootstrap',    label: 'Bootstrap' },
  { key: 'html5',        label: 'HTML5' },
  { key: 'css3',         label: 'CSS3' },
  { key: 'sqlite',       label: 'SQLite' }
];

export const marquee: StackItem[] = MARQUEE_ORDER.map(({ key, label, invert }) => ({
  icon: key,
  name: label,
  invert
}));

export const courses: string[] = [
  'React Native',
  'Next.js',
  'Laravel',
  'Node.js',
  'Docker & CI/CD',
  'SQL & Arquitetura de BD'
];

export function buildProjects(P: ProjTranslations): Project[] {
  return [
    {
      logo: '/assets/logos/acessoetp.png',
      name: 'Acesso ETP',
      url: 'https://acessoetp.ao',
      domain: 'acessoetp.ao',
      scope: P.acessoScope,
      desc: P.acessoDesc,
      stack: ['Laravel', 'Inertia', 'React', 'Python', 'CI/CD']
    },
    {
      logo: '/assets/logos/sipe.png',
      name: 'SIPE · SIPE-GPEL',
      url: 'https://sipe.ao',
      domain: 'sipe.ao · luanda.sipe.ao',
      scope: P.sipeScope,
      desc: P.sipeDesc,
      stack: ['Laravel', 'Inertia', 'React', 'Python', 'CI/CD']
    },
    {
      logo: '/assets/logos/ipil.png',
      name: 'Portal do IPIL',
      url: 'https://ipil.ao',
      domain: 'portal.ipil.ao · ipil.ao',
      scope: P.ipilScope,
      desc: P.ipilDesc,
      stack: ['Node.js', 'React', 'Python', 'CI/CD']
    }
  ];
}
