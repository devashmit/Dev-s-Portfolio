// src/data/content.js
export const stackItems = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', color: '#61DAFB', desc: 'Declarative component architecture for building reactive interfaces.', status: 'Core System' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6', desc: 'Strongly typed JavaScript extension for absolute code safety.', status: 'Primary' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', color: '#ffffff', invertInDark: true, desc: 'Production-ready React framework with server-side excellence.', status: 'Advanced' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#E34F26', desc: 'The structural skeleton of the interactive web ecosystem.', status: 'Standard' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4', desc: 'Utility-first framework for rapid responsive design deployment.', status: 'Fluid UI' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#339933', desc: 'V8-powered asynchronous runtime for high-throughput scaling.', status: 'Active' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', color: '#ffffff', invertInDark: true, desc: 'Minimalist router and REST API middleware server backend.', status: 'Active' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#3776AB', desc: 'Reads like English, scales like a rocket. High-level versatility.', status: 'Active' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', color: '#007396', desc: 'Enterprise-grade structured OOP foundation for deep backends.', status: 'Systems' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', color: '#47A248', desc: 'Highly flexible document-oriented NoSQL database system.', status: 'Active' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', color: '#4479A1', desc: 'Relational database engine with highly structured execution.', status: 'Standard' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032', desc: 'Distributed codebase control and atomic history tracker.', status: 'Essential' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', color: '#F24E1E', desc: 'Pixel-perfect vector sandbox for layouts and prototyping.', status: 'Design' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', color: '#007ACC', desc: 'The refined workspace optimized for development speed.', status: 'IDE Core' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', color: '#646CFF', desc: 'Lightning-fast dev server with modular hot module replacement.', status: 'Active' }
];


export const projectsData = [
  {
    title: 'Dollar Colony',
    year: '2024',
    desc: 'A dynamic and secure residential community management and rental portal for Dollars Colony, featuring booking systems, secure user authentication, and admin telemetry.',
    tags: ['Real Estate', 'Next.js'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    github: 'https://github.com/devashmit/dollarcolony',
    link: 'https://dollarscolony1.vercel.app/',
    category: 'web',
    previewType: 'dollar-colony'
  },
  {
    title: 'BerojgarCv',
    year: '2024',
    desc: 'A modern, free resume builder built with React and TypeScript, helping students and job-seekers quickly generate and download professional resumes in clean PDF formats.',
    tags: ['TypeScript', 'Web'],
    stack: ['TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/devashmit/BerojgarCv',
    category: 'web',
    previewType: 'cv-flow'
  },
  {
    title: 'Sahayogi',
    year: '2025',
    desc: 'A collaborative task organizer and productivity companion application built with Next.js and MongoDB, streamlining team workflows through interactive lists and role management.',
    tags: ['Productivity', 'WIP'],
    stack: ['Next.js', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/devashmit/SYP',
    category: 'systems',
    previewType: 'node-network'
  },
  {
    title: 'Devs-bouquet',
    year: '2024',
    desc: 'An interactive web canvas that procedurally generates hand-drawn digital flower arrangements using custom coordinate geometry and vector strokes.',
    tags: ['Canvas API', 'Creative Coding'],
    stack: ['HTML5', 'TypeScript', 'Vite'],
    github: 'https://github.com/devashmit/Devs-bouquet',
    category: 'creative',
    previewType: 'flower-bloom'
  },
  {
    title: 'Virtual Petals',
    year: '2024',
    desc: 'A real-time physics simulation built on the HTML5 Canvas API that renders tranquil falling flower petals, organic stem growth, and fluid wind dynamics.',
    tags: ['Physics', 'Canvas'],
    stack: ['HTML5', 'Node.js'],
    github: 'https://github.com/devashmit/Virtual-Petals',
    category: 'creative',
    previewType: 'floating-petals'
  }
];

