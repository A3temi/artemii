"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const projects = [
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const refRight = useRef(null);
  const isInViewRight = useInView(refRight, { once: true, margin: "-100px" });

  return (
    <section id="section-4" className="flex flex-col md:flex-row w-full text-[#F8ECE4] p-6 md:p-12 gap-10 mt-14">
      {/* Left: Projects List */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#FFF7D6] p-6"
      >
        <h3 className="text-3xl font-bold text-center mb-6">Projects</h3>
        <ul className="divide-y divide-[#FFF7D6]/50">
          {projects.map((proj, index) => (
            <li
              key={index}
              onClick={() => {setSelectedProj(proj); setShowAllImages(false)}}
              className={`cursor-pointer flex items-center gap-4 py-4 transition-all duration-300 ${
                selectedProj.title === proj.title ? "text-[#FFF7D6]" : "hover:text-[#FFF7D6]/70"
              }`}
            >
              <img
                src={`/icons/proj${index + 1}.png`}
                alt={proj.title || "Project Icon"}
                className="w-12 h-12 object-contain"
              />
              <span>{proj.title}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Right: Project Details */}
        <motion.div
          ref={refRight}
          key={selectedProj.title}
          initial={{ opacity: 0, y: -50 }}
          animate={isInViewRight ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="w-full md:w-2/3 p-6"
        >
          {/* Title */}
          <h3 className="text-3xl font-bold mb-2">
            <Typewriter
              words={[selectedProj.title]}
              loop={1}
              cursor={false}
              typeSpeed={30}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </h3>

          {/* Duration */}
          <p className="text-[#FFF7D6]/70 mb-4">
            <Typewriter
              words={[selectedProj.duration]}
              loop={1}
              cursor={false}
              typeSpeed={30}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </p>

          {/* Description */}
          <p className="text-lg leading-relaxed mb-4">
            <Typewriter
              words={[selectedProj.description]}
              loop={1}
              cursor={false}
              typeSpeed={10}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </p>

            {Array.isArray(selectedProj.links) && selectedProj.links.length > 0 && (
                <div className="mt-4">
                <h4 className="font-semibold mb-2">Project Link:</h4>
                {selectedProj.links.map((link, index) => (
                    <motion.a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="text-[#4FA3D1] underline hover:no-underline transition duration-300 block"
                    >
                    {link}
                    </motion.a>
                ))}
                </div>
            )}

          {/* Skills */}
          <h4 className="font-semibold mt-4">Skills:</h4>
          <ul className="list-disc pl-5 mb-4">
            {selectedProj.skills.map((skill, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 1, delay: index * 0.05 }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>

          {/* Project Images */}
          {selectedProj.images && selectedProj.images.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Project Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence mode="wait">
                  {selectedProj.images
                    .slice(0, showAllImages ? selectedProj.images.length : 2)
                    .map((img, index) => (
                      <motion.div
                        key={img}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="relative w-40 h-40 md:w-48 md:h-48 cursor-pointer overflow-hidden"
                        onClick={() => setZoomedImage(img)}
                      >
                        <img
                          src={img ?? ""}
                          alt={`Project screenshot ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>

                {/* Show all media button */}
                {selectedProj.images.length > 2 && !showAllImages && (
                  <div className="w-40 md:w-48 h-40 md:h-48 flex items-center justify-center">
                    <span
                      className="px-4 py-2 text-lg font-semibold text-[#FFF7D6] underline hover:no-underline cursor-pointer transition"
                      onClick={() => setShowAllImages(true)}
                    >
                      Show all {selectedProj.images.length} media
                    </span>
                  </div>
                )}

                {/* Show less button */}
                {selectedProj.images.length > 2 && showAllImages && (
                  <div className="w-40 md:w-48 h-40 md:h-48 flex items-center justify-center">
                    <span
                      className="px-4 py-2 text-lg font-semibold text-[#FFF7D6] underline hover:no-underline cursor-pointer transition"
                      onClick={() => setShowAllImages(false)}
                    >
                      Show less
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Zoomed Image Modal with Animation */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <motion.img
              src={zoomedImage}
              alt="Zoomed project image"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
