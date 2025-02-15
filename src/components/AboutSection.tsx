"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="flex justify-center items-center w-full text-[#F8ECE4] p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative border-t border-l border-[#FFF7D6] border-b-[10px] border-r-[10px] border-[#FFF7D6] p-6 md:p-10 flex flex-col items-center md:items-start w-full max-w-4xl shadow-lg rounded-xl"
      >
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#F8ECE4]">About</h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl leading-relaxed">
          I&apos;m a full-stack web developer with a background in data analysis, digital creation, and entrepreneurship.
          I specialize in <span className="font-semibold">React, Node.js, API integration, SQL,</span> and cloud services, 
          building efficient and engaging web applications. I’ve completed <span className="font-semibold">100+ hours</span> of hands-on IT training, 
          developing projects like <span className="font-semibold">CaseClicker.online</span> and <span className="font-semibold">Pollution Zero</span>—an 
          award-winning game that secured <span className="font-semibold">1st Place at FireHacks Fall 2024</span> for its AI-driven approach to 
          environmental awareness.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mt-6">
          With experience in project management, video editing, and digital marketing, 
          I combine technical expertise with creativity to build impactful digital solutions. 
          Open to web development opportunities!
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
