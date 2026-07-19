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
      github: "https://github.com/nandakishor-Dev", // Placeholder to be edited by user
      linkedin: "https://linkedin.com/in/nandakishor-pg", // Placeholder to be edited by user
      email: "nandakishorpg@gmail.com", // Stylized placeholder
      phone: "+91 9496400700",
      resume: "/Nandakishor P G - React js Developer.pdf"
    }
  },
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Technologies" }
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
      company: "ENFONO Technologies",
      role: "React JS Developer",
      duration: "Nov 2025 – Present",
      responsibilities: [
        "Developed a high-performance ERP system managing maritime shipments, including job creation, vessel assignment, Bill of Lading, and financial auditing.",
        "Built a scalable micro-frontend (MFE) architecture using Vite Module Federation within a PNPM monorepo.",
        "Implemented responsive UI using React 18, TypeScript, and Material UI with a custom design system.",
        "Integrated React Hook Form with Zod for robust form handling and schema-based validation.",
        "Designed advanced validation logic using Zod for cross-field dependencies and complex business rules.",
        "Leveraged AI-assisted development tools (Cursor, Antigravity) to accelerate feature implementation, debugging, and code quality."
      ]
    },
    {
      company: "TRANETECH Software Solutions",
      role: "React JS Developer",
      duration: "Jan 2025 – June 2025",
      responsibilities: [
        "Contributed to the implementation of EQUAL ERP Software Solutions in the UAE, a cloud-based property management system.",
        "Centralized property monitoring for commercial and residential buildings and automated tasks like rent collection, lease tracking, and maintenance.",
        "Supported system scalability for small businesses up to large enterprises.",
        "Integrated advanced technology to streamline operations and reduce manual workloads."
      ]
    },
    {
      company: "CHAAVIE Solutions",
      role: "MERN Stack Developer",
      duration: "Feb 2023 – Jan 2025",
      responsibilities: [
        "Developed Happy ERP system encompassing modules for customers, staffs, suppliers, and administration.",
        "Optimized product creation, purchase orders, goods receipts, quote generation, and sales analysis.",
        "Implemented state management using Redux Toolkit, Context API, and Tanstack Query for caching.",
        "Ensured secure server data transmission with JWT for user authentication.",
        "Built server-side functionality and database logic using Node.js, Express, and MongoDB."
      ]
    },
    {
      company: "MAITEXA Info Solutions",
      role: "MERN Stack Developer (Internship)",
      duration: "Feb 2022 – Dec 2022",
      responsibilities: [
        "Completed internship on full-stack web development (MERN) building real-world style apps.",
        "Gained proficiency in creating responsive and dynamic web applications using HTML5, CSS3, and React.js.",
        "Implemented server-side logic and RESTful API endpoints with Node.js and Express.",
        "Designed full-stack database integrations using MongoDB."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor Of Computer Applications",
      duration: "July 2015 – May 2018",
      institution: "SN College Vadakara Kerala – University Of Calicut"
    }
  ],
  projects: [
    {
      title: "Prompt ERP",
      badge: "ENFONO Technologies",
      description: "High-performance shipping & logistics ERP system designed to manage vessel lifecycles, job creation, vessel assignment, Bill of Lading, and financial auditing.",
      techStack: ["React", "TypeScript", "Vite", "Module Federation", "PNPM", "Material UI", "React Hook Form", "Zod"],
      features: [
        "Architected micro-frontend (MFE) architecture using Vite Module Federation within a PNPM monorepo to optimize code-sharing and build times.",
        "Designed schema validation layers using Zod for complex multi-field business rules and dynamic form dependencies.",
        "Built a modular UI component library wrapper over Material UI, enforcing consistent styling and layout workflows."
      ],
      category: "react",
      imagePlaceholder: "ERP",
      isPrivate: true
    },
    {
      title: "Equal ERP",
      badge: "TRANETECH Software Solutions",
      description: "Cloud-based property management system automating rent collection, lease tracking, maintenance management, and reporting for real estate firms in the UAE.",
      techStack: ["React.js", "Ant Design (antd)", "Zustand", "Laravel"],
      features: [
        "Developed centralized dashboards for property managers, landlords, and agents, simplifying complex leasing operations.",
        "Automated workflows for rent invoicing, lease tracking, and maintenance logs, reducing manual administrative times.",
        "Integrated client-side state management using Zustand to maintain high rendering speeds and UI responsiveness."
      ],
      category: "react",
      liveUrl: "https://equal.ae/products/equal-property-management-system",
      imagePlaceholder: "EQUAL",
      imageUrl: "/projectlogo.svg",
      isPrivate: true
    },
    {
      title: "Happy ERP",
      badge: "CHAAVIE Solutions",
      description: "Comprehensive business operations ERP automating customer, staff, supplier databases, purchase orders, goods receipts, sales quotes, and analytics.",
      techStack: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Tanstack Query"],
      features: [
        "Optimized processing pipelines for purchase order execution, sales quote generation, and product catalog searches.",
        "Leveraged Redux Toolkit for local UI state and TanStack Query caching to reduce server-side API query overhead.",
        "Implemented secure JWT (JSON Web Tokens) access flow and robust schema validation using React Hook Form."
      ],
      category: "react",
      imagePlaceholder: "ERP",
      isPrivate: true
    },
    {
      title: "COCO Field Work Management System",
      badge: "Freelance",
      description: "Real-time field employee tracking mobile app and admin dashboard for logging work entries, tracking expenses, and collecting payments.",
      techStack: ["React Native", "Expo", "React", "TypeScript", "Supabase"],
      features: [
        "Developed a cross-platform React Native mobile client using Expo, optimized with local caching for offline work logging.",
        "Configured Supabase database schema with Row Level Security (RLS) policies to secure confidential user logs.",
        "Engineered Cloudflare Worker proxy pipelines to ensure high-availability network routing for backend services."
      ],
      category: "mobile",
      imagePlaceholder: "FMS",
      isPrivate: true
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
