"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import data from "@/components/data.json";

const HeroSection = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const medals = data.achievements;

  const navItems = ['Here', 'Achievements', 'About', 'Experience', 'Projects', 'Quote'];

  const handleNavClick = (index: number) => {
    if (index === 0) {
      // "Here" button - show portfolio
      setShowAchievements(false);
      const element = document.getElementById(`section-1`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else if (index === 1) {
      // "Achievements" button - show achievements
      setShowAchievements(true);
      const element = document.getElementById(`section-1`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      // Other buttons - scroll to respective sections
      const element = document.getElementById(`section-${index + 1}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    setMobileMenuOpen(false);
  };

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

      {/* Mobile Menu Button - Fixed */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-50 bg-[#2A272A] border-2 border-[#FFF7D6] rounded-lg p-3 shadow-lg"
        whileTap={{ scale: 0.95 }}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-[#FFF7D6]" />
        ) : (
          <Menu className="w-6 h-6 text-[#FFF7D6]" />
        )}
      </motion.button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-30"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-64 bg-[#2A272A] border-l-4 border-[#FFF7D6] z-40 shadow-2xl"
            >
              <nav className="flex flex-col items-start px-8 pt-24 space-y-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleNavClick(index)}
                    className="text-[#FFEACF] text-2xl font-semibold hover:text-[#FFF7D6] transition-colors w-full text-left"
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row flex-wrap items-center md:items-stretch text-center md:text-left w-full max-w-7xl"
      >

        {/* Desktop Sidebar (Navigation) - Hidden on mobile */}
        <nav className="hidden md:flex text-[#FFEACF] text-lg sm:text-xl md:text-2xl font-bold flex-col justify-center space-y-8 md:pr-12 w-1/4">
          {navItems.map((item, index) => (
            <motion.p
              key={index}
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="cursor-pointer"
              onClick={() => handleNavClick(index)}
            >
              {item}
            </motion.p>
          ))}
        </nav>

        {/* Main Content with Browser Tabs */}
        <motion.div 
          className="w-full md:w-3/4 max-w-3xl"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2
          }}
        >
          {/* Browser Tabs */}
          <div className="flex mb-0">
            <motion.div
              key={0}
              className="inline-flex items-center justify-center min-w-[260px] sm:min-w-[300px] px-8 sm:px-10 py-3 sm:py-4 rounded-t-lg transition-all cursor-default bg-[#2A272A] text-[#FFF7D6] border-t border-l border-r border-[#FFF7D6] z-10 -mb-px overflow-hidden relative"
            >
              <div className="relative w-full h-full flex items-center justify-center min-h-[2rem] sm:min-h-[2.5rem]">
                <AnimatePresence mode="sync">
                  {!showAchievements ? (
                    <motion.span
                      key="portfolio"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      className="absolute text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold"
                    >
                      Portfolio
                    </motion.span>
                  ) : (
                    <motion.span
                      key="achievements"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      className="absolute text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold"
                    >
                      Achievements
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Main Content Card */}
          <motion.div 
            className="relative border-t border-l border-[#FFF7D6] border-b-[10px] border-r-[10px] border-[#FFF7D6] bg-[#2A272A] px-6 sm:px-8 md:px-10 py-6 sm:py-8 shadow-lg rounded-b-xl rounded-tr-xl overflow-hidden"
            animate={{ 
              height: showAchievements ? "auto" : "auto" 
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <AnimatePresence mode="sync">
              {!showAchievements ? (
                <motion.div
                  key="portfolio-content"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0, position: "absolute" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="w-full"
                >
                  {/* Profile Image and Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.4,
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="flex flex-col items-center md:items-start mb-6"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.5,
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      >
                        <Image 
                          src="/profile.webp"
                          alt="Profile Picture"
                          width={128}
                          height={128}
                          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full"
                        />
                      </motion.div>
                      
                      <div className="flex flex-col items-center md:items-start">
                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 0.6,
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8ECE4] mb-1"
                        >
                          Artemii Bakharev
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 0.7,
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="text-lg sm:text-xl md:text-2xl text-[#FFEACF] mb-3"
                        >
                          Full-Stack Web Developer / Founder
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Info */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.8,
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="mt-4 space-y-2 text-base sm:text-lg w-full mb-12"
                  >
                    {[
                      { label: "Location", value: "Greater Kuala Lumpur, Malaysia" },
                      { label: "LinkedIn", value: "https://www.linkedin.com/in/a3temii", isLink: true },
                      { label: "Languages", value: "English / Russian" },
                      { label: "Total experience", value: "2.3 years" },
                      { label: "Education", value: "Current UCSI Computer Science Data Science Student" }
                    ].map((info, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.9 + (index * 0.1),
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      >
                        <span className="text-[#FFEACF] font-semibold">{info.label}:</span>{" "}
                        {info.isLink ? (
                          <a href={info.value} className="underline hover:text-[#FFF7D6] transition-colors">{info.value}</a>
                        ) : (
                          info.value
                        )}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="achievements-content"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0, position: "absolute" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="w-full"
                >
                  {/* Achievements Container */}
                  <div className="overflow-x-auto overflow-y-hidden pb-4 mb-12 scrollbar-custom">
                    <div className="flex gap-6 min-w-min">
                      {medals.map((medal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.2 + (index * 0.15),
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="flex-shrink-0 w-80 border-2 border-[#FFF7D6] rounded-lg p-4 hover:border-[#FFEACF] transition-colors"
                        >
                          {/* Achievement Image */}
                          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden border border-[#FFF7D6]">
                            <Image 
                              src={medal.src}
                              alt={medal.title}
                              width={320}
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Achievement Title */}
                          <h3 className="text-xl font-bold text-[#F8ECE4] mb-2">
                            {medal.title}
                          </h3>

                          {/* Achievement Description */}
                          <p className="text-sm text-[#FFEACF] mb-2 font-semibold">
                            {medal.desc}
                          </p>

                          {/* Achievement Details */}
                          <p className="text-sm text-[#F8ECE4] mb-4 leading-relaxed">
                            {medal.details}
                          </p>

                          {/* Link */}
                          {medal.link && (
                            <a 
                              href={medal.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-sm text-[#FFEACF] underline hover:text-[#FFF7D6] transition-colors"
                            >
                              View Proof →
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Scrollbar Styles */}
                  <style jsx global>{`
                    .scrollbar-custom {
                      scrollbar-width: thin;
                      scrollbar-color: #FFF7D6 transparent;
                    }
                    
                    .scrollbar-custom::-webkit-scrollbar {
                      height: 8px;
                    }
                    
                    .scrollbar-custom::-webkit-scrollbar-track {
                      background: transparent;
                      border-radius: 10px;
                    }
                    
                    .scrollbar-custom::-webkit-scrollbar-thumb {
                      background: #FFF7D6;
                      border-radius: 10px;
                    }
                    
                    .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                      background: #FFEACF;
                    }
                  `}</style>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Action Buttons */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
              {/* Resume PDF Button - Left */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.4,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFF7D6] text-[#2A272A] rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-transparent hover:text-[#FFF7D6] hover:border hover:border-[#FFF7D6]"
                onClick={async () => {
                  setIsGeneratingPDF(true);
                  const { generateResumePDF } = await import('@/lib/generateResumePDF');
                  await generateResumePDF({
                    ...data.resume,
                    about: data.about,
                    experiences: data.experiences,
                    achievements: data.achievements,
                    projects: data.projects
                  });
                  setIsGeneratingPDF(false);
                }}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Making resume...</span>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Resume PDF</span>
                  </>
                )}
              </motion.button>

              {/* Achievements Toggle Button - Right */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.4,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="flex items-center gap-3"
              >
                <motion.p
                  className="text-[#FFEACF] text-sm font-light cursor-pointer transition-all duration-200"
                  whileHover={{ fontStyle: "italic" }}
                  onClick={() => setShowAchievements(!showAchievements)}
                >
                  {showAchievements ? "Back to Portfolio!" : "View Achievements!"}
                </motion.p>
                
                <motion.div
                  className="w-12 h-12 cursor-pointer"
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{ rotate: 0 }}
                  onClick={() => setShowAchievements(!showAchievements)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full group"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="#FFF7D6"
                      strokeWidth="1"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      className="transition-all duration-200 [.group:hover_&]:fill-transparent [.group:hover_&]:opacity-0"
                    />
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="#FFF7D6"
                      strokeWidth="3"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      fill="none"
                      className="transition-all duration-200 opacity-0 [.group:hover_&]:opacity-100"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;