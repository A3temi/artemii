"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const experiences = [
  {
    title: "CaseClicker.online – Full-Stack Developer",
    duration: "Aug 2024 - Nov 2024 · 4 mos",
    description:
      "CaseClicker.online is my personal web project, where I've built and managed both the frontend and backend functionalities. The platform integrates various APIs for a range of services, including ad management, data storage, authentication, encryption, and cloud infrastructure. Each component has been developed to ensure a smooth, secure, and engaging user experience, making CaseClicker a fully realized, production-grade web application.",
    skills: [
      "Backend Development",
      "Frontend Development",
      "API Integration",
      "Data Security",
      "Cloud Management",
    ],
    images: ["/projects/caseclicker1.png", "/projects/caseclicker2.png"],
  },
  {
    title: "Information Technology Assistant / HR",
    duration: "Previous Experience",
    description:
      "Assisted with IT-related tasks and HR management, ensuring smooth technical operations and employee support.",
    skills: ["IT Support", "HR Assistance", "Technical Troubleshooting"],
    images: ["/projects/it_assistant1.png"]
  },
  {
    title: "Video Editor/Designer Intern",
    duration: "Previous Experience",
    description:
      "Worked on video editing and graphic design projects, enhancing digital content for marketing and media purposes.",
    skills: ["Video Editing", "Graphic Design", "Content Creation"],
    images: ["/projects/video_editor1.png"]
  },
];

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState(experiences[0]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const refRight = useRef(null);
  const isInViewRight = useInView(refRight, { once: true, margin: "-100px" });

  return (
    <section className="flex flex-col md:flex-row w-full text-[#F8ECE4] p-6 md:p-12 gap-10 mt-14">
      {/* Left: Experience List */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full md:w-1/3 p-6"
      >
        <h3 className="text-3xl font-bold text-center mb-6">Experience</h3>
        <ul className="divide-y divide-[#FFF7D6]/50">
          {experiences.map((exp, index) => (
            <li
              key={index}
              onClick={() => {setSelectedExp(exp); setShowAllImages(false)}}
              className={`cursor-pointer flex items-center gap-4 py-4 transition-all duration-300 ${
                selectedExp.title === exp.title ? "text-[#FFF7D6]" : "hover:text-[#FFF7D6]/70"
              }`}
            >
              <img
                src={`/icons/exp${index + 1}.png`}
                alt={exp.title || "Experience Icon"}
                className="w-12 h-12 object-contain"
              />
              <span>{exp.title}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Right: Experience Details */}
        <motion.div
          ref={refRight}
          key={selectedExp.title}
          initial={{ opacity: 0, y: -50 }}
          animate={isInViewRight ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full md:w-2/3 border-l border-[#FFF7D6] p-6"
        >
          {/* Title */}
          <h3 className="text-3xl font-bold mb-2">
            <Typewriter
              words={[selectedExp.title]}
              loop={1}
              cursor={false}
              typeSpeed={1}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </h3>

          {/* Duration */}
          <p className="text-[#FFF7D6]/70 mb-4">
            <Typewriter
              words={[selectedExp.duration]}
              loop={1}
              cursor={false}
              typeSpeed={1}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </p>

          {/* Description */}
          <p className="text-lg leading-relaxed mb-4">
            <Typewriter
              words={[selectedExp.description]}
              loop={1}
              cursor={false}
              typeSpeed={10}
              deleteSpeed={15}
              delaySpeed={150}
            />
          </p>

          {/* Skills */}
          <h4 className="font-semibold mt-4">Skills:</h4>
          <ul className="list-disc pl-5 mb-4">
            {selectedExp.skills.map((skill, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>

          {/* Project Images */}
          {selectedExp.images && selectedExp.images.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Project Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence mode="wait">
                  {selectedExp.images
                    .slice(0, showAllImages ? selectedExp.images.length : 2)
                    .map((img, index) => (
                      <motion.div
                        key={img}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
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
                {selectedExp.images.length > 2 && !showAllImages && (
                  <div className="w-40 md:w-48 h-40 md:h-48 flex items-center justify-center">
                    <span
                      className="px-4 py-2 text-lg font-semibold text-[#FFF7D6] underline hover:no-underline cursor-pointer transition"
                      onClick={() => setShowAllImages(true)}
                    >
                      Show all {selectedExp.images.length} media
                    </span>
                  </div>
                )}

                {/* Show less button */}
                {selectedExp.images.length > 2 && showAllImages && (
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

export default ExperienceSection;
