"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const medals = [
  {
    src: "/icons/medal1.png",
    desc: "1st Place - FireHacks 2024",
    link: "https://devpost.com/software/pollution-zero",
  },
  {
    src: "/icons/medal2.png",
    desc: "Top 50% - The Dev Challenge 2025",
    link: "https://devchallenge.devpost.com",
  },
];

const HeroSection = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [achievementClicks, setAchievementClicks] = useState(0);
    const [showIntro, setShowIntro] = useState(true);

    const handleAchievementClick = (link: string) => {
      setAchievementClicks((prev) => (prev + 1) % 8); // Reset to 0 after 7 clicks
      setShowAchievements((prev) => !prev);
      window.open(link, "_blank");
    };

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
    const { width, height } = windowSize;
    const [confettiInstances, setConfettiInstances] = useState<number[]>([]);

    useEffect(() => {
      if (showAchievements) {
          const id = Date.now(); // Unique ID for each confetti instance
          setConfettiInstances((prev) => [...prev, id]);

          const timeout = setTimeout(() => {
              setConfettiInstances((prev) => prev.filter((confettiId) => confettiId !== id));
          }, 5000); // Confetti lasts 5 seconds

          return () => clearTimeout(timeout);
      }
  }, [showAchievements]);

  return (
    <section id="section-1" className="flex items-center justify-center w-full text-[#F8ECE4] px-4 sm:px-6 md:px-12 mt-24">
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          onAnimationComplete={() => setShowIntro(false)}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#2A272A] z-50"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-white text-4xl md:text-6xl font-bold"
          >
            Hey
          </motion.h1>
        </motion.div>
      )}

      {confettiInstances.map((id) => (
        <Confetti
          key={id}
          width={width}
          height={height}
          numberOfPieces={achievementClicks === 7 ? 1000 : 100}
          recycle={false}
          colors={["#FFD700", "#FFEC8B", "#FFF5CC"]}
          drawShape={(ctx) => {
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, 2 * Math.PI);
            ctx.fill();
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row flex-wrap items-center md:items-stretch text-center md:text-left w-full max-w-7xl"
      >

        {/* Sidebar (Navigation) */}
        <nav className="text-[#FFEACF] text-lg sm:text-xl md:text-2xl font-bold flex flex-row md:flex-col justify-center space-x-6 md:space-x-0 space-y-0 md:space-y-8 md:pr-12 w-full md:w-1/4 mb-6 md:mb-0">
          {["Here", "About", "Experience", "Projects", "Quote"].map((item, index) => (
            <motion.p
              key={index}
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="cursor-pointer"
              onClick={() => {
                document.getElementById(`section-${index + 1}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
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
          {/* Profile Image and Achievements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Image
              src="/profile.webp"
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded-full"
            />
            {/* Achievements List */}
            <div className="flex space-x-1 mt-2">
              {medals.map((medal, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative cursor-pointer group"
                  onClick={() => handleAchievementClick(medal.link)}
                >
                  <Image
                    src={medal.src}
                    alt={medal.desc}
                    width={100}
                    height={100}
                    className="w-16 h-16 sm:w-15 sm:h-15 object-contain p-1 rounded-lg"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-4 py-1 rounded-md whitespace-nowrap invisible group-hover:visible"
                  >
                    {medal.desc}
                  </motion.div>
                </motion.div>
              ))}
            </div>
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
              { label: "Total experience", value: "1.4 years" },
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
