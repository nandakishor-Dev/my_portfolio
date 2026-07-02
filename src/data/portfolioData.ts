import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Nanda Kishor P G",
    title: "Frontend Developer",
    tagline: {
      static: "React.js • TypeScript • React Native",
      dynamic: [
        "React.js Developer",
        "TypeScript Developer",
        "Frontend Engineer",
        "React Native Enthusiast"
      ]
    },
    shortDescription: "Building scalable, responsive, and high-performance web applications with React.js, TypeScript, and modern frontend technologies. I also have hands-on experience developing cross-platform mobile applications using React Native through personal and client projects.",
    aboutSummary: "I am a Frontend Developer with 3 years and 2 months of professional experience specializing in building modern, scalable, responsive web applications using React.js and TypeScript. I have worked on enterprise-level frontend applications, reusable component architecture, API integration, performance optimization, bug fixing, and modern UI development.",
    aboutHonestMobile: "I also have practical React Native experience through personal projects and one client project, and I continue expanding my mobile development skills.",
    profileImagePlaceholderText: "NK",
    socials: {
      github: "https://https://github.com/nandakishor-Dev", // Placeholder to be edited by user
      linkedin: "https://linkedin.com/in/nandakishor-pg", // Placeholder to be edited by user
      email: "nandakishorpg98@gmail.com", // Stylized placeholder
      resume: "/Nanda_Kishor_Resume.pdf"
    }
  },
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "10+", label: "Technologies" },
    { value: "1+", label: "Client Projects" }
  ],
  skills: [
    {
      title: "Frontend",
      skills: [
        "React.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Material UI",
        "React Router",
        "State Management",
        "React Context",
        "React Query",
        "REST API Integration"
      ]
    },
    {
      title: "Mobile",
      skills: [
        "React Native",
        "Expo"
      ]
    },
    {
      title: "Backend Familiarity",
      skills: [
        "Supabase",
        "PostgreSQL",
        "Node.js (Basic)"
      ]
    },
    {
      title: "Tools & Workflow",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Vite",
        "Figma"
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        "Problem Solving",
        "Debugging",
        "Communication",
        "Team Collaboration",
        "Continuous Learning"
      ]
    }
  ],
  experience: [
    {
      company: "ABC Company",
      role: "Frontend Developer",
      duration: "3 Years 2 Months",
      responsibilities: [
        "Built reusable React components that reduced development cycle times across teams.",
        "Developed scalable frontend modules for enterprise workflows and business solutions.",
        "Worked extensively with TypeScript to secure type safety and reduce production failures.",
        "Integrated complex REST APIs securely and handled client-side caching mechanisms.",
        "Collaborated closely with backend developers to align data schemas and endpoint design.",
        "Identified, debugged, and fixed critical production bugs under tight project timelines.",
        "Improved UI performance and reduced bundle sizes by implementing code-splitting.",
        "Implemented pixel-perfect responsive layouts catering to diverse screen dimensions.",
        "Participated in active code reviews to maintain code quality standards and conventions.",
        "Worked in Agile development sprints, ensuring timely deliverable completions."
      ]
    }
  ],
  projects: [
    {
      title: "Enterprise ERP System",
      description: "Large enterprise web application focused on reusable components, business workflows, API integration, performance optimization, and responsive interfaces.",
      techStack: ["React", "TypeScript", "Material UI", "React Query", "REST API"],
      features: [
        "Designed a library of 30+ reusable core dashboard controls.",
        "Integrated query caching with React Query, decreasing API load times by 40%.",
        "Optimized heavy tables and dynamic lists with windowing elements.",
        "Developed real-time status monitors for business workflow states."
      ],
      category: "react",
      githubUrl: "https://https://github.com/nandakishor-Dev/enterprise-erp-system",
      liveUrl: "https://erp-system-demo.example.com",
      imagePlaceholder: "ERP"
    },
    {
      title: "Field Work Management System",
      badge: "Personal / Client Project",
      description: "Cross-platform mobile application for field employees with an administrative dashboard, authentication, offline-friendly workflows, and real-time synchronization.",
      techStack: ["React Native", "Expo", "Supabase", "TypeScript", "PostgreSQL"],
      features: [
        "Built offline-first local storage cache to store work orders without signal.",
        "Configured Supabase Realtime databases for active dispatcher updates.",
        "Implemented Expo Push Notification pipelines for immediate task alerts.",
        "Created an web administrative panel for dispatch managers."
      ],
      category: "mobile",
      githubUrl: "https://https://github.com/nandakishor-Dev/field-work-management",
      liveUrl: "https://fieldwork-app-demo.example.com",
      imagePlaceholder: "FMS"
    },
    {
      title: "Personal Portfolio Website",
      description: "Premium, production-ready, and highly responsive personal portfolio website showcasing frontend architecture, custom hooks, and modern micro-animations.",
      techStack: ["React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "React Hook Form", "Zod"],
      features: [
        "Engineered v4 Tailwind compiler pipeline with ultra-fast cold builds.",
        "Crafted premium glassmorphism designs with fully customizable Dark/Light settings.",
        "Form validation built via React Hook Form and Zod schemas.",
        "Optimized with clean animations, lazy loading, and semantic HTML tags for SEO."
      ],
      category: "react",
      githubUrl: "https://https://github.com/nandakishor-Dev/nanda-kishor-portfolio",
      liveUrl: "https://nandakishor-portfolio.example.com",
      imagePlaceholder: "PORTFOLIO"
    }
  ],
  hireMeReasons: [
    {
      title: "Strong React.js Knowledge",
      description: "Deep understanding of functional programming, hooks, render lifecycle optimizations, state management, and performance-focused code.",
      iconName: "FaReact"
    },
    {
      title: "Clean Code & SOLID Principles",
      description: "A strong advocate for writing self-documenting, modular code. I organize components neatly and minimize prop drilling.",
      iconName: "FaCode"
    },
    {
      title: "Performance Optimization",
      description: "Committed to fast loading times. Experienced in code splitting, bundle reductions, lazy loading assets, and smooth framerates.",
      iconName: "FaLightningBolt"
    },
    {
      title: "Reusable UI Component Design",
      description: "Proven experience building shared design system libraries that enforce visual consistency and improve velocity across products.",
      iconName: "FaPalette"
    },
    {
      title: "Good Debugging Skills",
      description: "Strong troubleshooting ability. Quickly diagnosing memory issues, browser glitches, or intricate TypeScript exceptions.",
      iconName: "FaBug"
    },
    {
      title: "Responsive UI Expertise",
      description: "Fluent in design execution across breakpoints, ensuring layouts work cleanly on screens from 320px up to 4K resolutions.",
      iconName: "FaMobileAlt"
    },
    {
      title: "Strong TypeScript Skills",
      description: "Strict types, generic interfaces, and API payload definitions that catch bugs during development rather than in production.",
      iconName: "SiTypescript"
    },
    {
      title: "Basic React Native Knowledge",
      description: "Sufficient knowledge of mobile layouts, cross-platform components, and app deployment pipelines using Expo for client workloads.",
      iconName: "FaMobile"
    }
  ]
};
