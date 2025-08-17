"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

const projects = [
  {
    "title": "Global Cars – Car Dealership Website",
    "duration": "May 2025 - Jul 2025 · 3 mos",
    "description": "Global Cars is a Nizhny Novgorod–based dealership specializing in buying, selling, and importing used cars from the USA and Europe. For their website I performed competitor analysis, designed a new logo and UI/UX, built an inventory dashboard, implemented a Prisma-powered database with server-side image storage, optimized the site for SEO, and deployed the production site to a VPS. Delivered features include the Main Page and a searchable Car Catalogue.",
    "links": ["https://global-cars.ru"],
    "skills": ["Next.js", "Prisma", "Database Design", "SEO", "UI/UX", "Deployment"],
    "images": ["/projects/globalcars1.png", "/projects/globalcars2.png"]
  },
  {
    "title": "StartupSeed – Platform for Startups and Investors",
    "duration": "May 2025 - Jul 2025 · 3 mos",
    "description": "StartupSeed is a concept platform connecting startup founders and investors across Malaysia. I built the prototype frontend and core flows: public and private startup listings, investor discovery and filtering, a Business Model Canvas tool, a business-analyzer page, and a basic secondary-market concept for early exits. Focus was on founder-first UX, efficient discovery, and low-fee monetization model to encourage adoption.",
    "links": ["https://startupseedmy.netlify.app"],
    "skills": ["Next.js", "React.js", "Product Design", "Startup Strategy", "Search & Filtering", "Project Management"],
    "images": ["/projects/startupseed1.png", "/projects/startupseed2.png"]
  },
  {
    "title": "CollabCode – Winner at The Dev Challenge",
    "duration": "Jan 2025 - Feb 2025 · 2 mos",
    "description": "Developed CollabCode, a real-time, browser-based coding platform that secured a winning position at The Dev Challenge, standing out among 203 projects for its impact on coding education. Engineered live coding sessions, classroom management tools, peer collaboration features, and gamified progress tracking. Built a scalable, secure system that allows seamless interaction with zero local setup, enhancing accessibility for students and educators worldwide.",
    "links": ["https://devpost.com/software/collabcode", "https://collabcode-vob8.onrender.com"],
    "skills": ["React.js", "Node.js", "WebSockets", "Python", "Express.js", "Database Management"],
    "images": ["/projects/collabcode1.png", "/projects/collabcode2.png", "/projects/collabcode3.png"]
  },
  {
    "title": "A3t Team Website – Frontend Developer",
    "duration": "Jan 2025 · 1 mo",
    "description": "Designed and developed an interactive, visually engaging website for A3t, showcasing team projects, hackathon participation, and business collaborations. Implemented dynamic themes inspired by popular games and ensured seamless performance across devices.",
    "links": ["https://a3t.netlify.app"],
    "skills": ["React.js", "Web Design", "UI/UX Development", "Frontend Optimization"],
    "images": ["/projects/a3t1.png", "/projects/a3t2.png", "/projects/a3t3.png", "/projects/a3t4.png"]
  },
  {
    "title": "Turn of Life – Multiplayer Game Developer",
    "duration": "Dec 2024 - Jan 2025 · 2 mos",
    "description": "Developed Turn of Life, a real-time multiplayer party game blending Monopoly, The Game of Life, and Jackbox elements. Engineered live gameplay, dynamic board mechanics, and interactive mini-games. Implemented WebSocket-based communication for seamless player interactions.",
    "links": ["https://devpost.com/software/turn-of-life"],
    "skills": ["React.js", "Node.js", "Socket.io", "Express.js", "Game Development"],
    "images": ["/projects/turnoflife1.png"]
  },
  {
    "title": "Telegram Scraper AI – AI Engineer & Developer",
    "duration": "Dec 2024 · 1 mo",
    "description": "Developed Telegram Scraper AI, an advanced tool leveraging OpenAI and Telethon to extract and analyze chat data securely. Integrated AI-driven insights for travel planning, financial safety, and community monitoring with multilingual support.",
    "links": ["https://devpost.com/software/telegram-scraper-ai", "https://telegramscraperai.onrender.com"],
    "skills": ["React.js", "Node.js", "OpenAI API", "Python", "Telethon", "Data Analysis"],
    "images": ["/projects/telegramscraper1.png", "/projects/telegramscraper2.png", "/projects/telegramscraper3.png", "/projects/telegramscraper4.png"]
  },
  {
    "title": "Pollution Zero – Hackathon Winner (1st Place)",
    "duration": "Nov 2024 - Dec 2024 · 1 mo",
    "description": "Built Pollution Zero, an award-winning web-based simulation game tackling environmental challenges. Implemented AI-driven analytics, real-world environmental problem-solving, and interactive mapping. Achieved 1st place in FireHacks Fall 2024 for innovation and impact.",
    "links": ["https://devpost.com/software/pollution-zero"],
    "skills": ["JavaScript", "React.js", "Node.js", "GeoJSON/Leaflet.js", "Machine Learning Integration"],
    "images": ["/projects/pollutionzero1.png", "/projects/pollutionzero2.png", "/projects/pollutionzero3.png"]
  }
];

const ProjectsSection = () => {
  const [selectedProj, setSelectedProj] = useState(projects[0]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  
  // Single ref for scroll detection to avoid conflicts
  const sectionRef = useRef(null);
  
  // Simplified scroll detection
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-100px" 
  });

  // Professional animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 60
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Professional easing
        staggerChildren: 0.1
      }
    }
  };

  const leftPanelVariants = {
    hidden: { 
      opacity: 0, 
      x: -50
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2 
      }
    }
  };

  const rightPanelVariants = {
    hidden: { 
      opacity: 0, 
      x: 50
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3 
      }
    }
  };

  const projectItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="section-4" 
      className="flex flex-col md:flex-row w-full text-[#F8ECE4] p-6 md:p-12 gap-10 mt-14"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Left: Projects List */}
      <motion.div
        variants={leftPanelVariants}
        className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#FFF7D6] p-6"
      >
        <motion.h3 
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Projects
        </motion.h3>
        
        <motion.ul 
          className="divide-y divide-[#FFF7D6]/50"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((proj, index) => (
            <motion.li
              key={index}
              custom={index}
              variants={projectItemVariants}
              onClick={() => {setSelectedProj(proj); setShowAllImages(false)}}
              className={`cursor-pointer flex items-center gap-4 py-4 transition-all duration-300 hover:bg-[#FFF7D6]/5 hover:px-2 rounded-lg ${
                selectedProj.title === proj.title 
                  ? "text-[#FFF7D6] bg-[#FFF7D6]/10 px-2 shadow-lg border-l-4 border-[#FFF7D6]" 
                  : "hover:text-[#FFF7D6]/70"
              }`}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={`/icons/proj${index + 1}.png`}
                  alt={proj.title || "Project Icon"}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="font-medium">{proj.title}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Right: Project Details */}
        <motion.div
          key={selectedProj.title}
          variants={rightPanelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="w-full md:w-2/3 p-6"
        >
          {/* Title */}
          <motion.h3 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typewriter
              words={[selectedProj.title]}
              loop={1}
              cursor={false}
              typeSpeed={30}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </motion.h3>

          {/* Duration */}
          <motion.p 
            className="text-[#FFF7D6]/70 mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typewriter
              words={[selectedProj.duration]}
              loop={1}
              cursor={false}
              typeSpeed={30}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg leading-relaxed mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typewriter
              words={[selectedProj.description]}
              loop={1}
              cursor={false}
              typeSpeed={10}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </motion.p>

          {Array.isArray(selectedProj.links) && selectedProj.links.length > 0 && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-2">Project Link:</h4>
              {selectedProj.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-[#4FA3D1] underline hover:no-underline transition duration-300 block hover:text-[#6BB3D6]"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-semibold mt-4">Skills:</h4>
            <ul className="list-disc pl-5 mb-4">
              {selectedProj.skills.map((skill, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className="hover:text-[#FFF7D6] transition-colors duration-200"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Project Images */}
          {selectedProj.images && selectedProj.images.length > 0 && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="font-semibold mb-2">Project Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence mode="wait">
                  {selectedProj.images
                    .slice(0, showAllImages ? selectedProj.images.length : 2)
                    .map((img, index) => (
                      <motion.div
                        key={img}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="relative w-40 h-40 md:w-48 md:h-48 cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => setZoomedImage(img)}
                        whileHover={{ 
                          scale: 1.03,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={img}
                          alt={`Project screenshot ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 160px, 192px"
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>

                {/* Show all media button */}
                {selectedProj.images.length > 2 && !showAllImages && (
                  <motion.div 
                    className="w-40 md:w-48 h-40 md:h-48 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.span
                      className="px-4 py-2 text-lg font-semibold text-[#FFF7D6] underline hover:no-underline cursor-pointer transition bg-[#FFF7D6]/10 rounded-lg hover:bg-[#FFF7D6]/20"
                      onClick={() => setShowAllImages(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Show all {selectedProj.images.length} media
                    </motion.span>
                  </motion.div>
                )}

                {/* Show less button */}
                {selectedProj.images.length > 2 && showAllImages && (
                  <motion.div 
                    className="w-40 md:w-48 h-40 md:h-48 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      className="px-4 py-2 text-lg font-semibold text-[#FFF7D6] underline hover:no-underline cursor-pointer transition bg-[#FFF7D6]/10 rounded-lg hover:bg-[#FFF7D6]/20"
                      onClick={() => setShowAllImages(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Show less
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Zoomed Image Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.3, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.3, opacity: 0, rotateY: 15 }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Image
                src={zoomedImage}
                alt="Zoomed project image"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl max-w-full max-h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectsSection;