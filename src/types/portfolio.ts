export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

export interface Taglines {
  static: string;
  dynamic: string[];
}

export interface DeveloperProfile {
  name: string;
  title: string;
  tagline: Taglines;
  shortDescription: string;
  aboutSummary: string;
  aboutHonestMobile: string;
  profileImagePlaceholderText: string;
  socials: SocialLinks;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  features: string[];
  category: 'react' | 'typescript' | 'mobile' | 'all';
  githubUrl?: string;
  liveUrl?: string;
  imagePlaceholder: string;
  badge?: string;
  imageUrl?: string;
  isPrivate?: boolean;
}

export interface HireMeReason {
  title: string;
  description: string;
  iconName: string;
}

export interface EducationItem {
  degree: string;
  duration: string;
  institution: string;
}

export interface PortfolioData {
  profile: DeveloperProfile;
  stats: StatItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  hireMeReasons: HireMeReason[];
}
