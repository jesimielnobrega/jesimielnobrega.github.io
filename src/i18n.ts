export type Lang = 'pt' | 'en';

export interface NavTranslations {
  about: string;
  projects: string;
  experience: string;
  skills: string;
  contact: string;
}

export interface HeroTranslations {
  badge: string;
  titleMain: string;
  titleAccent: string;
  sub: string;
  ctaProjects: string;
  cvBtn: string;
  badgeTech: string;
  stat1n: string;
  stat1l: string;
  stat2n: string;
  stat2l: string;
  stat3n: string;
  stat3l: string;
}

export interface AboutTranslations {
  heading: string;
  p1: string;
  p2: string;
  p3: string;
  focusL: string;
  focusV: string;
  availL: string;
  availV: string;
  langsL: string;
  langsV: string;
}

export interface ProjTranslations {
  heading: string;
  intro: string;
  acessoDesc: string;
  acessoScope: string;
  sipeDesc: string;
  sipeScope: string;
  ipilDesc: string;
  ipilScope: string;
  pyNote: string;
  othersLabel: string;
  othersList: string;
}

export interface ExpItem {
  role: string;
  org: string;
  period: string;
  desc: string;
}

export interface ExpTranslations {
  heading: string;
  items: ExpItem[];
}

export interface SkillsTranslations {
  heading: string;
  intro: string;
}

export interface EduTranslations {
  heading: string;
  uniTitle: string;
  uniSub: string;
  ipilTitle: string;
  ipilSub: string;
  certL: string;
}

export interface ContactTranslations {
  eyebrow: string;
  heading: string;
  sub: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  proj: ProjTranslations;
  exp: ExpTranslations;
  skills: SkillsTranslations;
  edu: EduTranslations;
  contact: ContactTranslations;
  footerRole: string;
}

export const T: Record<Lang, Translations> = {
  pt: {
    nav: { about: 'Sobre', projects: 'Projetos', experience: 'Experiência', skills: 'Stack', contact: 'Contacto' },
    hero: {
      badge: 'Disponível para novos projetos',
      titleMain: 'Desenvolvedor Fullstack &', titleAccent: 'Líder Técnico',
      sub: 'Desenvolvimento e liderança técnica de plataformas de escala nacional e provincial em Angola, com foco em arquitetura sólida, performance e trabalho de equipa.',
      ctaProjects: 'Ver projetos', cvBtn: 'Ver CV',
      badgeTech: 'Engenharia de Sofware',
      stat1n: '3', stat1l: 'plataformas de larga escala',
      stat2n: '6+', stat2l: 'sistemas em produção',
      stat3n: 'Líder', stat3l: 'da equipa técnica @ SOSOFT',
    },
    about: {
      heading: 'Sobre mim',
      p1: 'Jesimiel Nóbrega — desenvolvedor de software fullstack e líder de equipa técnica, com atuação em projetos de escala nacional e provincial.',
      p2: 'Como Desenvolvedor Sénior e Líder da Equipa Técnica na SOSOFT LDA, conduzo a equipa no desenvolvimento de plataformas usadas a nível nacional e provincial, do planeamento à entrega em produção.',
      p3: 'Valorizo código limpo, decisões técnicas fundamentadas e o crescimento contínuo da equipa. A cursar Engenharia Informática na Universidade Metodista de Angola.',
      focusL: 'Foco', focusV: 'Performance, escalabilidade e experiência do utilizador',
      availL: 'Disponibilidade', availV: 'Luanda, outras localidades ou remoto',
      langsL: 'Idiomas', langsV: 'Português (fluente) · Inglês (intermédio)',
    },
    proj: {
      heading: 'Projetos em destaque',
      intro: 'Plataformas em produção ao serviço de instituições nacionais e provinciais.',
      acessoDesc: 'Plataforma nacional de acesso ao ensino técnico-profissional — candidaturas, colocação e gestão de vagas.',
      acessoScope: 'Nacional',
      sipeDesc: 'Sistema de informação e gestão a nível provincial, com instância dedicada ao Governo Provincial de Luanda (GPEL).',
      sipeScope: 'Provincial · Luanda',
      ipilDesc: 'Portal de gestão escolar do IPIL, com liderança técnica do projeto e coordenação do desenvolvimento pela equipa.',
      ipilScope: 'Institucional',
      pyNote: 'Scripts internos em Python (ex.: remoção automática de fundo) integrados nas plataformas para tarefas específicas.',
      othersLabel: 'Também', othersList: 'Loja Online AGIM · Correção de Provas · Gestão Documental · Gestão de Resíduos Sólidos',
    },
    exp: {
      heading: 'Experiência',
      items: [
        { role: 'Desenvolvedor Sénior & Líder Técnico', org: 'SOSOFT LDA', period: 'Presente', desc: 'Liderança da equipa técnica no desenvolvimento e entrega de plataformas de escala nacional e provincial — Acesso ETP, SIPE / SIPE-GPEL e Portal do IPIL. Definição de arquitetura, práticas de CI/CD e fluxos de deploy próprios de cada plataforma.' },
        { role: 'Desenvolvedor — Freelancer enquadrado', org: 'ESSJ LDA', period: 'Projetos', desc: 'Colaboração como freelancer enquadrado no desenvolvimento de projetos como o Acesso ETP e o Sistema de Correção de Provas.' },
        { role: 'Auxiliar Técnico · Help Desk · Dev', org: 'AGIM CORPORATE LDA', period: '9 meses', desc: 'Suporte técnico e desenvolvimento de soluções, incluindo a Loja Online AGIM.' },
      ],
    },
    skills: {
      heading: 'Stack & ferramentas',
      intro: 'Aprender uma sintaxe é simples, mas dominar a engenharia por trás dela requer tempo. A experiência ensina que as linguagens e os frameworks mudam, mas as bases de arquitetura e a lógica permanecem. Trabalho com igual proficiência em diferentes ecossistemas — seja no back-end com Laravel, Node.js e Python, no front-end com React, Next.js e React Native, ou orquestrando deploys com Docker e CI/CD. O verdadeiro diferencial não é a stack, mas a aplicação rigorosa de padrões de design, SOLID, Clean Code e a capacidade de resolver problemas complexos com soluções simples e eficientes.',
    },
    edu: {
      heading: 'Formação académica',
      uniTitle: 'Engenharia Informática', uniSub: 'Universidade Metodista de Angola · em curso',
      ipilTitle: 'Técnico de Informática', ipilSub: 'Instituto Politécnico Industrial de Luanda (IPIL)',
      certL: 'Formação complementar',
    },
    contact: { eyebrow: 'Vamos trabalhar juntos', heading: 'Vamos falar sobre o próximo projeto.', sub: 'Disponível para novos desafios — em Luanda, noutras localidades ou de forma remota.' },
    footerRole: 'Fullstack Developer & Tech Lead',
  },
  en: {
    nav: { about: 'About', projects: 'Projects', experience: 'Experience', skills: 'Stack', contact: 'Contact' },
    hero: {
      badge: 'Available for new projects',
      titleMain: 'Fullstack Developer &', titleAccent: 'Tech Lead',
      sub: 'Development and technical leadership of nationwide and province-scale platforms in Angola, focused on solid architecture, performance and teamwork.',
      ctaProjects: 'View projects', cvBtn: 'View CV',
      badgeTech: 'Software Engineering',
      stat1n: '3', stat1l: 'large-scale platforms',
      stat2n: '6+', stat2l: 'systems in production',
      stat3n: 'Lead', stat3l: 'of the tech team @ SOSOFT',
    },
    about: {
      heading: 'About me',
      p1: 'Jesimiel Nóbrega — fullstack software developer and technical team lead, working on national and provincial-scale projects.',
      p2: 'As Senior Developer and Tech Team Lead at SOSOFT LDA, I guide the team through the development of platforms used at national and provincial level, from planning through to production.',
      p3: 'I value clean code, well-grounded technical decisions and the continuous growth of the team. Currently studying Computer Engineering at Universidade Metodista de Angola.',
      focusL: 'Focus', focusV: 'Performance, scalability and user experience',
      availL: 'Availability', availV: 'Luanda, other locations or remote',
      langsL: 'Languages', langsV: 'Portuguese (fluent) · English (intermediate)',
    },
    proj: {
      heading: 'Featured projects',
      intro: 'Platforms in production serving national and provincial institutions.',
      acessoDesc: 'Nationwide platform for access to technical-vocational education — applications, placement and vacancy management.',
      acessoScope: 'National',
      sipeDesc: 'Province-level information and management system, with a dedicated instance for the Provincial Government of Luanda (GPEL).',
      sipeScope: 'Provincial · Luanda',
      ipilDesc: 'IPIL school-management portal, with technical leadership of the project and coordination of the team development.',
      ipilScope: 'Leadership',
      pyNote: 'Internal Python scripts (e.g. automatic background removal) integrated into the platforms for specific tasks.',
      othersLabel: 'Also', othersList: 'AGIM Online Store · Exam Grading · Document Management · Solid Waste Management',
    },
    exp: {
      heading: 'Experience',
      items: [
        { role: 'Senior Developer & Tech Lead', org: 'SOSOFT LDA', period: 'Present', desc: 'Leadership of the technical team in the development and delivery of national and provincial-scale platforms — Acesso ETP, SIPE / SIPE-GPEL and the IPIL Portal. Architecture definition, CI/CD practices and custom deploy flows for each platform.' },
        { role: 'Developer — Embedded Freelancer', org: 'ESSJ LDA', period: 'Projects', desc: 'Worked as an embedded freelancer on projects such as Acesso ETP and the Exam Grading System.' },
        { role: 'Technical Assistant · Help Desk · Dev', org: 'AGIM CORPORATE LDA', period: '9 months', desc: 'Technical support and solution development, including the AGIM Online Store.' },
      ],
    },
    skills: {
      heading: 'Stack & tools',
      intro: 'Learning a syntax is easy, but mastering the engineering behind it takes time. Experience teaches that languages and frameworks change, but architecture fundamentals and logic remain. I work with equal proficiency across different ecosystems — whether on the back-end with Laravel, Node.js and Python, on the front-end with React, Next.js and React Native, or orchestrating deploys with Docker and CI/CD. The true differentiator is not the stack itself, but the rigorous application of design patterns, SOLID, Clean Code, and the ability to solve complex problems with simple, efficient solutions.',
    },
    edu: {
      heading: 'Education',
      uniTitle: 'Computer Engineering', uniSub: 'Universidade Metodista de Angola · in progress',
      ipilTitle: 'Computer Technician', ipilSub: 'Industrial Polytechnic Institute of Luanda (IPIL)',
      certL: 'Additional training',
    },
    contact: { eyebrow: "Let's work together", heading: "Let's talk about your next project.", sub: 'Available for new challenges — in Luanda, elsewhere, or fully remote.' },
    footerRole: 'Fullstack Developer & Tech Lead',
  },
};
