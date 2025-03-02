"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useInView, useTransform, useScroll } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Prevent horizontal scrollbar by limiting movement range
  const rawX = useTransform(scrollYProgress, [0, 0.3, 1], ["calc(100vw - 100%)", "0vw", "0vw"]);
  const x = useSpring(rawX, { stiffness: 50, damping: 20 });

  // Experience Counter Animation
  const count = useMotionValue(0);
  const animatedCount = useSpring(count, { stiffness: 100, damping: 10 });
  const [displayCount, setDisplayCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        count.set(0.8); // Start animation after 0.5s delay
      }, 500);

      animatedCount.on("change", (val) => {
        setDisplayCount(parseFloat(val.toFixed(1))); // Ensure it's a number
      });
    }
  }, [isInView, count, animatedCount]);

  return (
    <motion.section
      ref={ref}
      style={{ x }}
      className="flex flex-col md:flex-row justify-between items-center w-full text-[#F8ECE4] p-6 md:p-12 gap-10 mt-14 overflow-hidden"
    >
      {/* Left: About Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative border-t border-l border-[#FFF7D6] border-b-[10px] border-r-[10px] border-[#FFF7D6] p-6 md:p-10 flex flex-col items-center md:items-start w-full md:w-2/3 shadow-lg rounded-xl"
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

      {/* Right: Animated Years of Experience */}
      <div
        ref={counterRef}
        className="flex flex-col justify-center items-center p-6 md:p-10 rounded-xl w-full md:w-1/3"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-[#FFF7D6] mb-4">Experience</h3>
        <motion.p
          className="text-5xl md:text-6xl font-extrabold text-[#F8ECE4]"
          style={{ scale: 1.1 }}
        >
          {displayCount} <span className="text-2xl">years</span>
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutSection;
