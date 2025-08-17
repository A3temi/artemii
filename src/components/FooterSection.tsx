"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "@fontsource/aboreto";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
      id="section-5"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.1 } : {}}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.08 } : {}}
          transition={{ duration: 2.5, delay: 0.8 }}
          className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-3xl"
        />
        
        {/* New looped glare animation */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)"
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Geometric decorative elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        animate={isInView ? { opacity: 0.05, rotate: 0 } : {}}
        transition={{ duration: 3, delay: 1 }}
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#F8ECE4] rotate-45"
      />
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        animate={isInView ? { opacity: 0.03, rotate: 0 } : {}}
        transition={{ duration: 3.5, delay: 1.2 }}
        className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-[#F8ECE4] rounded-full"
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Decorative top line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: "100px", opacity: 0.6 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-[#F8ECE4] to-transparent mx-auto mb-12"
        />

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-[#F8ECE4] font-aboreto mb-8 leading-tight"
        >
          MAKE TODAY
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F8ECE4] to-[#F8ECE4] font-aboreto mb-12"
        >
          WORK FOR TOMORROW
        </motion.h3>

        {/* Decorative middle line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: "200px", opacity: 0.4 } : {}}
          transition={{ duration: 2, delay: 1.3 }}
          className="h-px bg-gradient-to-r from-transparent via-[#F8ECE4] to-transparent mx-auto mb-16"
        />

        {/* Subtitle or additional content */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl text-[#F8ECE4]/80 font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
        >
          Transforming vision into reality through strategic innovation and thoughtful execution
        </motion.p>

        {/* Call-to-action or contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <motion.a
            href="mailto:artemiibakharev@gmail.com"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(248, 236, 228, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-[#F8ECE4]/30 text-[#F8ECE4] font-light tracking-wide transition-all duration-300 hover:border-[#F8ECE4]/60"
          >
            Get in Touch
          </motion.a>
          <div className="flex space-x-6">
            <motion.a
              href="https://www.linkedin.com/in/a3temii/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 0.7, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="text-[#F8ECE4]/70 hover:text-[#F8ECE4] transition-all duration-300 text-sm tracking-wide"
            >
              LinkedIn
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: "80px", opacity: 0.3 } : {}}
          transition={{ duration: 2, delay: 2.5 }}
          className="h-px bg-gradient-to-r from-transparent via-[#F8ECE4] to-transparent mx-auto mt-20"
        />
      </div>

      {/* Subtle corner accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ duration: 2, delay: 2.2 }}
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#F8ECE4]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ duration: 2, delay: 2.4 }}
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#F8ECE4]"
      />
    </motion.footer>
  );
};

export default FooterSection;