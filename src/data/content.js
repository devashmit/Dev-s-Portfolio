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
    title: 'BerojgarCv',
    year: '2024',
    desc: 'A dynamic, professional CV generator built with TypeScript. It provides a robust, user-friendly interface to instantly construct, preview, and export clean resumes with customizable load-bearing structural layouts.',
    tags: ['TypeScript', 'Web'],
    stack: ['TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/devashmit/BerojgarCv',
    category: 'web',
    previewType: 'cv-flow'
  },
  {
    title: 'Devs-bouquet',
    year: '2024',
    desc: 'A serene, interactive canvas experience designed to let users procedurally generate beautiful, hand-drawn digital flower arrangements through advanced creative coding and algorithmic geometry.',
    tags: ['Canvas API', 'Creative Coding'],
    stack: ['HTML5', 'TypeScript', 'Vite'],
    github: 'https://github.com/devashmit/Devs-bouquet',
    category: 'creative',
    previewType: 'flower-bloom'
  },
  {
    title: 'Virtual Petals',
    year: '2024',
    desc: 'An immersive digital ecosystem where users can plant and observe procedural floral physics. Built entirely on the HTML5 Canvas API, it simulates fluid wind dynamics and organic growth in real-time.',
    tags: ['Canvas', 'Interactive'],
    stack: ['HTML5', 'Node.js'],
    github: 'https://github.com/devashmit/Virtual-Petals',
    category: 'creative',
    previewType: 'floating-petals'
  },
  {
    title: 'Sahayogi',
    year: '2025',
    desc: 'A comprehensive productivity companion application actively in development. Designed to streamline task execution by integrating contextual data processing within a highly efficient, responsive node-tracking network.',
    tags: ['WIP', 'Systems'],
    stack: ['Next.js', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/devashmit/SYP',
    category: 'systems',
    previewType: 'node-network'
  },
  {
    title: 'Dollar Colony',
    year: '2024',
    desc: 'A resource management colony-builder game and financial simulator. It provides players with real-time economic telemetry to construct colonies, optimize supply chains, and balance budgets.',
    tags: ['Simulation', 'Web'],
    stack: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/devashmit/dollarcolony',
    link: 'https://dollarscolony1.vercel.app/',
    category: 'web',
    previewType: 'dollar-colony'
  },
  {
    title: 'ChatX',
    year: '2024',
    desc: 'A real-time socket-based messaging client built to handle concurrent communication logs. Integrates custom modern interface overlays with secure channel operations.',
    tags: ['WebSockets', 'Comms'],
    stack: ['React', 'Node.js', 'Express'],
    github: 'https://github.com/devashmit/ChatX',
    category: 'web',
    previewType: 'node-network'
  },
  {
    title: 'Nirikshan',
    year: '2024',
    desc: 'A structural testing and inspection utility. Allows developers to evaluate component lifecycle metrics and monitor real-time system performance data.',
    tags: ['Testing', 'Diagnostics'],
    stack: ['React', 'Node.js', 'Express'],
    github: 'https://github.com/devashmit/Nirikshan',
    category: 'systems',
    previewType: 'cv-flow'
  },
  {
    title: 'Amora',
    year: '2024',
    desc: 'A lightweight TypeScript micro-framework supporting customizable component lifecycle state triggers and high-performance render updates.',
    tags: ['Framework', 'TS'],
    stack: ['TypeScript', 'Node.js'],
    github: 'https://github.com/devashmit/Amora',
    category: 'systems',
    previewType: 'node-network'
  },
  {
    title: 'Disha',
    year: '2023',
    desc: 'An intelligent career recommendation and roadmap planning engine designed to analyze student skills and suggest tailored pathways.',
    tags: ['Education', 'Systems'],
    stack: ['Java', 'MySQL'],
    github: 'https://github.com/devashmit/Disha',
    category: 'systems',
    previewType: 'node-network'
  },
  {
    title: 'Gokyo-Bistro-UI',
    year: '2024',
    desc: 'A modern, responsive design blueprint for a fine dining restaurant web portal featuring interactive booking forms and sleek digital menus.',
    tags: ['UI Design', 'Web'],
    stack: ['React', 'Tailwind CSS'],
    github: 'https://github.com/devashmit/Gokyo-Bistro-UI',
    category: 'web',
    previewType: 'dollar-colony'
  },
  {
    title: 'Quickdraw',
    year: '2024',
    desc: 'A canvas-based multiplayer drawing platform where users can construct digital paintings synchronously over secure network rooms.',
    tags: ['Canvas API', 'Sockets'],
    stack: ['React', 'Node.js'],
    github: 'https://github.com/devashmit/Quickdraw',
    category: 'creative',
    previewType: 'flower-bloom'
  },
  {
    title: 'Daily-Dev-Challenges',
    year: '2024',
    desc: 'A repository containing solutions to code challenges, algorithms, and modular design patterns built to polish daily programming efficiency.',
    tags: ['Algorithms', 'Practice'],
    stack: ['HTML5', 'TypeScript'],
    github: 'https://github.com/devashmit/Daily-Dev-Challenges',
    category: 'systems',
    previewType: 'cv-flow'
  }
];

