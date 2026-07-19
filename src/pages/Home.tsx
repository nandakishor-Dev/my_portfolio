import React from 'react';
import { Helmet } from 'react-helmet-async';
import { portfolioData } from '../data/portfolioData';
import { Navigation } from '../sections/Navigation';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Education } from '../sections/Education';
import { Projects } from '../sections/Projects';
import { WhyHireMe } from '../sections/WhyHireMe';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';

export const Home: React.FC = () => {
  const { profile } = portfolioData;
  const siteUrl = "https://nandakishor-Dev.github.io/my_portfolio"; // GitHub Pages URL

  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.title,
    "description": profile.shortDescription,
    "url": siteUrl,
    "sameAs": [
      profile.socials.github,
      profile.socials.linkedin
    ],
    "knowsAbout": [
      "React.js",
      "TypeScript",
      "React Native",
      "JavaScript",
      "Frontend Development",
      "Responsive UI Design",
      "REST API Integration",
      "Tailwind CSS"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "ENFONO Technologies"
    }
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{`${profile.name} | ${profile.title}`}</title>
        <meta name="description" content={profile.aboutSummary} />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${profile.name} | ${profile.title}`} />
        <meta property="og:description" content={profile.shortDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${profile.name} | ${profile.title}`} />
        <meta name="twitter:description" content={profile.shortDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>

      {/* Page Layout Shell */}
      <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
        {/* Global sticky navigation */}
        <Navigation />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          <Hero />
          
          {/* Section separators (subtle gradients) */}
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <About />
          
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <Skills />
          
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <Experience />
          
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <Education />
          
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <Projects />
          
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <WhyHireMe />
          
          <div className="h-px bg-gradient-to-r from-transparent via-border-primary/60 to-transparent max-w-7xl mx-auto" />
          
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
