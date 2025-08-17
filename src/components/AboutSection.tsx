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
        // 27 months = 2.25 years (displayed as 2.3 after rounding to 1 decimal)
        count.set(2.25);
      }, 500);
      animatedCount.on("change", (val) => {
        setDisplayCount(parseFloat(val.toFixed(1)));
      });
    }
  }, [isInView, count, animatedCount]);

  // Mobile-specific animations
  const mobileVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={ref}
      style={{ x: isMobile ? 0 : x }}
      id="section-2"
      className="w-full text-[#F8ECE4] px-4 md:p-12 mt-8 md:mt-14"
      initial={isMobile ? "hidden" : undefined}
      whileInView={isMobile ? "visible" : undefined}
      viewport={isMobile ? { once: true, margin: "-10%" } : undefined}
      variants={isMobile ? mobileVariants : undefined}
    >
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 md:gap-10">
        {/* Left: About Section */}
        <motion.div
          initial={isMobile ? undefined : { opacity: 0, y: 50 }}
          animate={isMobile ? undefined : { opacity: 1, y: 0 }}
          transition={isMobile ? undefined : { duration: 0.8, ease: "easeOut" }}
          variants={isMobile ? mobileItemVariants : undefined}
          className="relative border-t border-l border-[#FFF7D6] border-b-4 md:border-b-[10px] border-r-4 md:border-r-[10px] border-[#FFF7D6] p-6 md:p-10 flex flex-col items-center md:items-start w-full md:w-2/3 shadow-lg rounded-xl"
        >
          {/* Title */}
          <motion.h2 
            variants={isMobile ? mobileItemVariants : undefined}
            className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-[#F8ECE4] text-center md:text-left"
          >
            About
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            variants={isMobile ? mobileItemVariants : undefined}
            className="text-sm md:text-xl leading-relaxed text-center md:text-left mb-4 md:mb-0"
          >
            I&apos;m a full-stack web developer with specialization in <span className="font-semibold text-[#FFF7D6]">React, Node.js, API integration, SQL,</span> and cloud services,
            building efficient and engaging web applications. I&apos;ve completed <span className="font-semibold text-[#FFF7D6]">100+ hours</span> of hands-on IT training,
            and worked on projects like <span className="font-semibold text-[#FFF7D6]">CaseClicker.online</span> and <span className="font-semibold text-[#FFF7D6]">Pollution Zero</span> — the latter took <span className="font-semibold text-[#FFF7D6]">1st Place at FireHacks Fall 2024</span>.
          </motion.p>
          
          <motion.p 
            variants={isMobile ? mobileItemVariants : undefined}
            className="text-sm md:text-xl leading-relaxed mt-3 md:mt-6 text-center md:text-left"
          >
            Alongside development, I bring experience in project management, UI/UX design, video editing, and digital marketing — combining technical skills with a product-focused mindset to deliver practical, user-centered solutions.
            <span className="block mt-2 font-semibold text-[#FFF7D6]">Open to web development opportunities!</span>
          </motion.p>
        </motion.div>

        {/* Right: Animated Years of Experience */}
        <motion.div
          ref={counterRef}
          variants={isMobile ? mobileItemVariants : undefined}
          className="flex flex-col justify-center items-center p-6 md:p-10 rounded-xl w-full md:w-1/3 min-h-[160px] md:min-h-auto"
        >
          <motion.h3 
            variants={isMobile ? mobileItemVariants : undefined}
            className="text-xl md:text-4xl font-bold text-[#FFF7D6] mb-3 md:mb-4 text-center"
          >
            Experience
          </motion.h3>
          <motion.div
            className="text-center"
            variants={isMobile ? mobileItemVariants : undefined}
            whileInView={isMobile ? { scale: [1, 1.05, 1] } : undefined}
            transition={isMobile ? { duration: 0.5, delay: 0.8 } : undefined}
          >
            <motion.span
              className="text-4xl md:text-6xl font-extrabold text-[#F8ECE4] block"
              style={{ scale: isMobile ? 1 : 1.1 }}
            >
              {displayCount}
            </motion.span>
            <span className="text-lg md:text-2xl text-[#FFF7D6] font-medium">years</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
