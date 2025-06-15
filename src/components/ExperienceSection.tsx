"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

const experiences = [
  {
    "title": "CaseClicker.online – Full-Stack Developer",
    "duration": "Aug 2024 - Nov 2024 · 4 mos",
    "description": "Developed CaseClicker.online, a full-stack web application integrating APIs for ad management, authentication, encryption, and cloud infrastructure. Engineered a secure backend, a responsive frontend, and scalable cloud solutions to ensure a seamless user experience.",
    "Links": ["https://caseclicker.online"],
    "skills": [
      "Problem Solving",
      "Cloud Computing (Google Cloud)",
      "Database Management (SQL)",
      "API Integration",
      "Node.js & Backend Programming",
      "JavaScript/React Development",
      "React.js",
      "Database Design"
    ],
    "images": ["/projects/caseclicker1.png", "/projects/caseclicker2.png"]
  },
  {
    "title": "Information Technology Assistant / HR",
    "duration": "Jul 2023 - Aug 2023 · 2 mos",
    "description": "Freelanced at VIP Auto Trans Inc, providing IT support and HR services. Designed digital assets, assisted with recruitment, and implemented employee benefits strategies to optimize business operations.",
    "skills": [
      "IT Support",
      "HR & Recruitment",
      "Employee Benefits Design",
      "Digital Marketing",
      "Graphic Design",
      "Problem Solving"
    ],
    "images": []
  },
  {
    "title": "Video Editor/Designer Intern",
    "duration": "Jul 2022 - Aug 2022 · 2 mos",
    "description": "Interned at Venkon Group in the IT department, working on video editing, graphic design, and digital advertising. Designed promotional materials and created a marketing video, enhancing brand outreach.",
    "Links": ["https://youtu.be/7aHk5jdRVhI"],
    "skills": [
      "Video Editing",
      "Graphic Design",
      "Web Design",
      "Digital Advertising",
      "Figma",
      "Content Creation"
    ],
    "images": ["/projects/video_editor1.png", "/projects/video_editor2.png", "/projects/video_editor3.png"]
  },
  {
    "title": "Medical Clerk (Volunteer)",
    "duration": "Feb 2022 - Jun 2022 · 5 mos",
    "description": "Volunteered at the National Children's Medical Center of Tashkent, assisting with patient vital signs, sterilization processes, instrument packaging, and digital record management.",
    "skills": [
      "Medical Data Entry",
      "Patient Care Assistance",
      "Sterilization & Instrument Packaging",
      "Hospital Information Systems (HIS)",
      "Problem Solving"
    ],
    "images": ["/projects/volunteer_cert1.png"]
  }
];

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState(experiences[0]);
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

  const experienceItemVariants = {
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
      id="section-3" 
      className="flex flex-col md:flex-row w-full text-[#F8ECE4] p-6 md:p-12 gap-10 mt-14"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Left: Experience List */}
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
          Experience
        </motion.h3>
        
        <motion.ul 
          className="divide-y divide-[#FFF7D6]/50"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.li
              key={index}
              custom={index}
              variants={experienceItemVariants}
              onClick={() => {setSelectedExp(exp); setShowAllImages(false)}}
              className={`cursor-pointer flex items-center gap-4 py-4 transition-all duration-300 hover:bg-[#FFF7D6]/5 hover:px-2 rounded-lg ${
                selectedExp.title === exp.title 
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
                  src={`/icons/exp${index + 1}.png`}
                  alt={exp.title || "Experience Icon"}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="font-medium">{exp.title}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Right: Experience Details */}
        <motion.div
          key={selectedExp.title}
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
              words={[selectedExp.title]}
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
              words={[selectedExp.duration]}
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
              words={[selectedExp.description]}
              loop={1}
              cursor={false}
              typeSpeed={10}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </motion.p>

          {Array.isArray(selectedExp.Links) && selectedExp.Links.length > 0 && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-2">Project Link:</h4>
              {selectedExp.Links.map((link, index) => (
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
              {selectedExp.skills.map((skill, index) => (
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
          {selectedExp.images && selectedExp.images.length > 0 && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="font-semibold mb-2">Project Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence mode="wait">
                  {selectedExp.images
                    .slice(0, showAllImages ? selectedExp.images.length : 2)
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
                {selectedExp.images.length > 2 && !showAllImages && (
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
                      Show all {selectedExp.images.length} media
                    </motion.span>
                  </motion.div>
                )}

                {/* Show less button */}
                {selectedExp.images.length > 2 && showAllImages && (
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

export default ExperienceSection;