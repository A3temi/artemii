"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollVelocity from '@/components/ScrollVelocity';
import data from "@/components/data.json";

interface Experience {
  id: number;
  title: string;
  subtitle: string;
  fullTitle: string;
  duration: string;
  description: string;
  links?: string[]; // Optional string array
  skills: string[];
  images: string[];
}

const InfiniteCarousel = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(0.5); // pixels per frame
  const position = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const experiences = data.experiences;

  // Load liked/saved posts from localStorage on mount
  useEffect(() => {
    try {
      const storedLiked = localStorage.getItem('carousel_liked');
      const storedSaved = localStorage.getItem('carousel_saved');
      
      if (storedLiked) {
        setLikedPosts(new Set(JSON.parse(storedLiked)));
      }
      if (storedSaved) {
        setSavedPosts(new Set(JSON.parse(storedSaved)));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever likes/saves change
  useEffect(() => {
    try {
      localStorage.setItem('carousel_liked', JSON.stringify(Array.from(likedPosts)));
      localStorage.setItem('carousel_saved', JSON.stringify(Array.from(savedPosts)));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [likedPosts, savedPosts]);

  // Quintuple the experiences for extra smooth infinite looping
  const multipliedExperiences = [
    ...experiences,
    ...experiences,
    ...experiences,
    ...experiences,
    ...experiences
  ];

  useEffect(() => {
    const cardWidth = 320;
    const gap = 40;
    const singleSetWidth = (cardWidth + gap) * experiences.length;

    const animate = () => {
      if (!isPaused && containerRef.current) {
        position.current -= velocity.current;
        
        // Reset position seamlessly when we've moved one full set
        if (Math.abs(position.current) >= singleSetWidth) {
          position.current = position.current + singleSetWidth;
        }
        
        containerRef.current.style.transform = `translateX(${position.current}px)`;
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPaused]);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSave = (id: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden text-white">
        <ScrollVelocity
          texts={['Experience']} 
          velocity={80} 
          // Styling the text: Bebas font, huge size, uppercase
          className="font-bebas text-[12vw] font-bold uppercase leading-[0.85] tracking-wide text-[#F8ECE4] md:text-[10rem]"
          numCopies={4}
        />
      </div>
      <div className="w-full py-20 bg-[#2A272A] flex items-center justify-center overflow-hidden relative">
        {/* Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#2A272A] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#2A272A] to-transparent pointer-events-none" />

        {/* Moving Track */}
        <div
          ref={containerRef}
          className="flex gap-10"
          style={{ willChange: 'transform' }}
        >
          {multipliedExperiences.map((experience, index) => (
            <Card
              key={`${experience.id}-${index}`}
              experience={experience}
              iconIndex={((index % experiences.length) % 4) + 1}
              isLiked={likedPosts.has(experience.id)}
              isSaved={savedPosts.has(experience.id)}
              onLike={() => toggleLike(experience.id)}
              onSave={() => toggleSave(experience.id)}
              onHover={(hovering) => setIsPaused(hovering)}
              onClick={() => setSelectedExperience(experience)}
            />
          ))}
        </div>
      </div>

      {/* Overlay Modal */}
      {selectedExperience && (
        <ExperienceOverlay
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </>
  );
};

const Card = ({ 
  experience, 
  iconIndex, 
  isLiked, 
  isSaved, 
  onLike, 
  onSave,
  onHover,
  onClick
}: { 
  experience: Experience;
  iconIndex: number;
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
  onHover: (hovering: boolean) => void;
  onClick: () => void;
}) => {
  const borderColor = "#FFF7D6";
  const textColor = "#F8ECE4";
  const bgColor = "#2A272A";
  const displayImage = experience.images.length > 0 ? experience.images[0] : null;

  return (
    <div
      className="shrink-0 w-[320px] h-[500px] rounded-3xl border-[3px] flex flex-col relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
      style={{ borderColor: borderColor, backgroundColor: bgColor }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b-[3px]" style={{ borderColor: borderColor }}>
        <div
          className="w-10 h-10 rounded-full border-2 overflow-hidden shrink-0 relative"
          style={{ borderColor: borderColor }}
        >
          <Image
            src={`/icons/exp${iconIndex}.png`}
            alt="icon"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-sm truncate leading-tight" style={{ color: textColor }}>
            {experience.title}
          </h3>
          <p className="text-xs opacity-80 truncate" style={{ color: textColor }}>
            {experience.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-[#2A272A] p-5 flex items-center justify-center">
        {displayImage ? (
          <div className="relative w-full h-full border-2 rounded-xl overflow-hidden" style={{ borderColor: borderColor }}>
            <Image
              src={displayImage}
              alt={experience.title}
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden" style={{ borderColor: borderColor }}>
            {/* Casual Emoji */}
            <span className="text-4xl mb-1">😢</span>
            
            {/* Casual Title */}
            <h4 className="text-lg font-bold z-10" style={{ color: textColor }}>
              Sorry, no image
            </h4>
            <p className="text-xs opacity-70 z-10" style={{ color: textColor }}>
              {experience.description.substring(0, 60)}...
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="h-14 flex items-center justify-between px-5 pb-2">
        <button 
          className="group"
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={isLiked ? borderColor : "none"}
            stroke={borderColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110 group-active:scale-90"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <button 
          className="group"
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={isSaved ? borderColor : "none"}
            stroke={borderColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110 group-active:scale-90"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

const ExperienceOverlay = ({ experience, onClose }: { experience: Experience; onClose: () => void }) => {
  const borderColor = "#FFF7D6";
  const textColor = "#F8ECE4";
  const bgColor = "#2A272A";
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#2A272A] rounded-3xl border-[3px] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          style={{ borderColor }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="sticky top-0 bg-[#2A272A] border-b-[3px] p-4 flex justify-between items-center z-10" style={{ borderColor }}>
            <h2 className="text-2xl font-bold" style={{ color: textColor }}>{experience.fullTitle}</h2>
            <button onClick={onClose} className="text-3xl hover:scale-110 transition-transform" style={{ color: borderColor }}>×</button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Duration */}
            <div>
              <p className="text-sm opacity-70" style={{ color: textColor }}>{experience.duration}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: borderColor }}>Description</h3>
              <p className="leading-relaxed" style={{ color: textColor }}>{experience.description}</p>
            </div>

            {/* Links */}
            {experience.links && experience.links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: borderColor }}>Links</h3>
                <div className="space-y-2">
                  {experience.links.map((link: string, idx: number) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block underline hover:opacity-70 transition-opacity"
                      style={{ color: textColor }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: borderColor }}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm border-2"
                    style={{ borderColor, color: textColor, backgroundColor: bgColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            {experience.images.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: borderColor }}>Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.images.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="relative h-64 border-2 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" 
                      style={{ borderColor }}
                      onClick={() => setFullscreenImage(img)}
                    >
                      <Image src={img} alt={`${experience.title} ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={fullscreenImage} 
                alt="Fullscreen view" 
                fill 
                className="object-contain"
              />
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-4 right-4 text-white text-4xl hover:scale-110 transition-transform bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InfiniteCarousel;