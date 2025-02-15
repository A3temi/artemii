"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const HeroSection = () => {

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
    const updateSize = () => {
        setWindowSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
    }, []);
    
    const [showAchievements, setShowAchievements] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);
    const { width, height } = windowSize;

  useEffect(() => {
    if (showAchievements) {
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 5000); // Confetti lasts for 2 seconds
    }
  }, [showAchievements]);

  return (
    <section className="flex items-center justify-center w-full text-[#F8ECE4] px-4 sm:px-6 md:px-12">
      {confettiActive && (
        <Confetti
        width={width}
        height={height}
        numberOfPieces={100}
        recycle={false}
        colors={["#FFD700", "#FFEC8B", "#FFF5CC"]}
        drawShape={(ctx) => {
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, 2 * Math.PI);
          ctx.fill();
        }}
        confettiSource={{ x: 0, y: 0, w: width, h: height }} // Ensures confetti spawns within the visible area
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row flex-wrap items-center md:items-stretch text-center md:text-left w-full max-w-7xl"
      >
        {/* Sidebar (Navigation) */}
        <nav className="text-[#FFEACF] text-lg sm:text-xl md:text-2xl font-bold flex flex-col justify-center space-y-6 md:space-y-8 md:pr-12 w-full md:w-1/4 mb-6 md:mb-0">
          {["1. Here", "2. About", "3. Experience", "4. Projects", "5. Certifications", "6. Volunteering"].map((item, index) => (
            <motion.p
              key={index}
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="cursor-pointer"
            >
              {item}
            </motion.p>
          ))}
        </nav>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative border-t border-l border-[#FFF7D6] border-b-[10px] border-r-[10px] border-[#FFF7D6] px-6 sm:px-8 md:px-10 py-6 sm:py-8 flex flex-col items-center md:items-start w-full md:w-3/4 max-w-3xl shadow-lg rounded-xl"
        >
          {/* Achievements Text Link (Minimalistic) */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
            <p
              className="text-lg font-semibold text-[#FFD700] cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowAchievements(!showAchievements)}
            >
              Achievements {showAchievements ? "▲" : "▼"}
            </p>
            <AnimatePresence>
              {showAchievements && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute right-0 mt-1 text-[#FFD700] text-base space-y-1 min-w-[300px] sm:min-w-[350px] bg-[#222] bg-opacity-90 rounded-lg p-2"
                >
                  <li>
                    <a
                      href="https://devpost.com/software/pollution-zero"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      🏆 FireHacks Fall 2024 - 1st Place Overall Best Project
                    </a>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Image
              src="/profile.webp"
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover mb-4"
            />
          </motion.div>

          {/* Name & Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8ECE4]">Artemii Bakharev</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#FFEACF]">Full-Stack Web Developer</p>

          {/* Info */}
          <div className="mt-4 space-y-2 text-base sm:text-lg w-full">
            {[
              { label: "Location", value: "Greater Kuala Lumpur, Malaysia" },
              { label: "LinkedIn", value: "https://www.linkedin.com/in/a3temii", isLink: true },
              { label: "Languages", value: "English / Russian" },
              { label: "Total experience", value: "0.5 years" },
              { label: "Education", value: "Current UCSI Computer Science Data Science Student" }
            ].map((info, index) => (
              <p key={index}>
                <span className="text-[#FFEACF] font-semibold">{info.label}:</span>{" "}
                {info.isLink ? (
                  <a href={info.value} className="underline hover:text-[#FFF7D6] transition-colors">{info.value}</a>
                ) : (
                  info.value
                )}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
