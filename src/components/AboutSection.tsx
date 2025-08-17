"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useInView, useTransform, useScroll } from "framer-motion";

const AboutSection = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent horizontal overflow on the body/html
  useEffect(() => {
    // Ensure no horizontal overflow is possible
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Also prevent horizontal scrolling via CSS
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        overflow-x: hidden !important;
        max-width: 100vw !important;
      }
      * {
        max-width: 100% !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
      document.head.removeChild(style);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Only apply horizontal scroll animation on desktop
  const rawX = useTransform(
    scrollYProgress, 
    [0, 0.3, 1], 
    isMobile ? ["0vw", "0vw", "0vw"] : ["calc(100vw - 100%)", "0vw", "0vw"]
  );
  const x = useSpring(rawX, { stiffness: 500, damping: 200 });

  // Experience Counter Animation
  const count = useMotionValue(0);
  const animatedCount = useSpring(count, { stiffness: 20, damping: 10 });
  const [displayCount, setDisplayCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        count.set(2.3); // keep your animated counter
      }, 500);
      animatedCount.on("change", (val) => {
        setDisplayCount(parseFloat(val.toFixed(1)));
      });
    }
  }, [isInView, count, animatedCount]);

  return (
    <div className="w-full overflow-hidden">
      <motion.section
        ref={ref}
        style={{ x: isMobile ? 0 : x }} // Disable horizontal animation on mobile
        id="section-2"
        className="flex flex-col md:flex-row justify-between items-center w-full text-[#F8ECE4] p-4 md:p-12 gap-6 md:gap-10 mt-14 min-w-full"
      >
        {/* Left: About Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative border-t border-l border-[#FFF7D6] border-b-[10px] border-r-[10px] border-[#FFF7D6] p-4 md:p-10 flex flex-col items-center md:items-start w-full md:w-2/3 shadow-lg rounded-xl"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-[#F8ECE4] text-center md:text-left">
            About
          </h2>
          
          {/* New Description */}
          <p className="text-base md:text-xl leading-relaxed text-center md:text-left">
            I am a full-stack web developer with <span className="font-semibold text-[#FFF7D6]">+2 years of combined experience</span> in web development, IT support, digital creation, and entrepreneurship. 
            My expertise includes <span className="font-semibold text-[#FFF7D6]">React, Node.js, API integration, SQL,</span> and cloud services, with a proven track record of building and deploying high-performance web applications.
          </p>

          <p className="text-base md:text-xl leading-relaxed mt-4 md:mt-6 text-center md:text-left">
            I&apos;ve completed <span className="font-semibold text-[#FFF7D6]">over 100 hours of hands-on IT training</span> and delivered award-winning projects, 
            such as <span className="font-semibold text-[#FFF7D6]">Pollution Zero</span> (1st Place – FireHacks Fall 2024) and <span className="font-semibold text-[#FFF7D6]">CollabCode</span> (Top 50% – The Dev Challenge). 
            My portfolio ranges from business platforms (<span className="font-semibold text-[#FFF7D6]">StartupSeed</span>) to real-time multiplayer games (<span className="font-semibold text-[#FFF7D6]">Turn of Life</span>).
          </p>

          <p className="text-base md:text-xl leading-relaxed mt-4 md:mt-6 text-center md:text-left">
            Beyond coding, I bring experience in project management, UI/UX design, video editing, and digital marketing, enabling me to deliver solutions that are both technically sound and user-focused. 
            I&apos;m driven by problem-solving, innovation, and creating tools that make processes more efficient and engaging.
            <span className="block mt-2 font-semibold text-[#FFF7D6]">📍 Open to opportunities in web development and software engineering.</span>
          </p>
        </motion.div>

        {/* Right: Animated Years of Experience */}
        <div
          ref={counterRef}
          className="flex flex-col justify-center items-center p-4 md:p-10 rounded-xl w-full md:w-1/3"
        >
          <h3 className="text-2xl md:text-4xl font-bold text-[#FFF7D6] mb-2 md:mb-4 text-center">
            Experience
          </h3>
          <motion.p
            className="text-4xl md:text-6xl font-extrabold text-[#F8ECE4] text-center"
            style={{ scale: 1.1 }}
          >
            {displayCount} <span className="text-xl md:text-2xl">years</span>
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutSection;