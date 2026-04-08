"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Image from "next/image";
import ScrollVelocity from "@/components/ScrollVelocity";
import data from "@/components/data.json";

interface Experience {
  id: number;
  title: string;
  subtitle: string;
  fullTitle: string;
  duration: string;
  description: string;
  links?: string[];
  skills: string[];
  images: string[];
}

const DESKTOP_CARD_WIDTH = 320;
const DESKTOP_CARD_GAP = 40;

const InfiniteCarousel = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(0.5);
  const position = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const experiences = [...data.experiences].sort((left, right) => right.id - left.id);
  const multipliedExperiences = Array.from({ length: 5 }, () => experiences).flat();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDeviceMode = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateDeviceMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateDeviceMode);
      return () => mediaQuery.removeEventListener("change", updateDeviceMode);
    }

    mediaQuery.addListener(updateDeviceMode);
    return () => mediaQuery.removeListener(updateDeviceMode);
  }, []);

  useEffect(() => {
    try {
      const storedLiked = localStorage.getItem("carousel_liked");
      const storedSaved = localStorage.getItem("carousel_saved");

      if (storedLiked) {
        setLikedPosts(new Set(JSON.parse(storedLiked)));
      }

      if (storedSaved) {
        setSavedPosts(new Set(JSON.parse(storedSaved)));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("carousel_liked", JSON.stringify(Array.from(likedPosts)));
      localStorage.setItem("carousel_saved", JSON.stringify(Array.from(savedPosts)));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [likedPosts, savedPosts]);

  useEffect(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    if (isMobile || selectedExperience || !containerRef.current) {
      return;
    }

    const singleSetWidth = (DESKTOP_CARD_WIDTH + DESKTOP_CARD_GAP) * experiences.length;

    const animate = () => {
      if (!containerRef.current) {
        return;
      }

      position.current -= velocity.current;

      if (Math.abs(position.current) >= singleSetWidth) {
        position.current += singleSetWidth;
      }

      containerRef.current.style.transform = `translateX(${position.current}px)`;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [experiences.length, isMobile, selectedExperience]);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
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
    setSavedPosts((prev) => {
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
          texts={["Experience"]}
          velocity={80}
          className="font-bebas text-[12vw] font-bold uppercase leading-[0.85] tracking-wide text-[#F8ECE4] md:text-[10rem]"
          numCopies={4}
        />
      </div>

      <div className="relative flex w-full items-center justify-center overflow-x-hidden overflow-y-visible bg-[#2A272A] py-20 md:py-24">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-20 bg-gradient-to-r from-[#2A272A] to-transparent md:block" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-20 bg-gradient-to-l from-[#2A272A] to-transparent md:block" />

        <div className="w-full md:hidden">
          <div
            className="no-scrollbar overflow-x-auto overflow-y-visible px-4 pb-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex w-max gap-4 pr-4">
              {experiences.map((experience) => (
                <Card
                  key={`mobile-${experience.id}`}
                  experience={experience}
                  iconIndex={experience.id}
                  isLiked={likedPosts.has(experience.id)}
                  isSaved={savedPosts.has(experience.id)}
                  onLike={() => toggleLike(experience.id)}
                  onSave={() => toggleSave(experience.id)}
                  onClick={() => setSelectedExperience(experience)}
                  compactMobile
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden w-full overflow-x-hidden overflow-y-visible md:block">
          <div
            ref={containerRef}
            className="flex gap-10"
            style={{ willChange: "transform" }}
          >
            {multipliedExperiences.map((experience, index) => (
              <Card
                key={`${experience.id}-${index}`}
                experience={experience}
                iconIndex={experience.id}
                isLiked={likedPosts.has(experience.id)}
                isSaved={savedPosts.has(experience.id)}
                onLike={() => toggleLike(experience.id)}
                onSave={() => toggleSave(experience.id)}
                onClick={() => setSelectedExperience(experience)}
              />
            ))}
          </div>
        </div>
      </div>

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
  onClick,
  compactMobile = false,
}: {
  experience: Experience;
  iconIndex: number;
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
  onClick: () => void;
  compactMobile?: boolean;
}) => {
  const borderColor = "#FFF7D6";
  const textColor = "#F8ECE4";
  const bgColor = "#2A272A";
  const likedColor = "#FF6B6B";
  const cardControls = useAnimationControls();
  const displayImage = experience.images.length > 0 ? experience.images[0] : null;
  const widthClass = compactMobile ? "w-[280px]" : "w-[320px]";
  const endYear = getExperienceEndYear(experience.duration);

  const triggerCardBounce = () => {
    void cardControls.start({
      y: [0, -6, 0],
      scale: [1, 1.015, 1],
      transition: {
        duration: 0.32,
        ease: "easeOut",
      },
    });
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      animate={cardControls}
      className={`relative flex h-[500px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl border-[3px] ${widthClass} ${compactMobile ? "snap-start" : ""}`}
      style={{ borderColor, backgroundColor: bgColor }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-3 border-b-[3px] p-4" style={{ borderColor }}>
        <div
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2"
          style={{ borderColor }}
        >
          <Image
            src={`/icons/exp${iconIndex}.png`}
            alt={`${experience.title} icon`}
            fill
            className="object-contain"
          />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="truncate text-sm font-bold leading-tight" style={{ color: textColor }}>
            {experience.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-xs opacity-80" style={{ color: textColor }}>
              {experience.subtitle}
            </p>
            <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-none opacity-90" style={{ borderColor, color: textColor }}>
              {endYear}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#2A272A] p-5">
        <ExperiencePreview
          src={displayImage}
          title={experience.title}
          description={experience.description}
          borderColor={borderColor}
          textColor={textColor}
        />
      </div>

      <div className="mt-auto flex h-14 items-center justify-between px-5 pb-3">
        <motion.button
          type="button"
          aria-label={isLiked ? "Unlike experience" : "Like experience"}
          aria-pressed={isLiked}
          className="group"
          whileTap={{ scale: 0.92 }}
          onClick={(event) => {
            event.stopPropagation();
            onLike();
            triggerCardBounce();
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={isLiked ? likedColor : "none"}
            stroke={isLiked ? likedColor : borderColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          aria-label={isSaved ? "Unsave experience" : "Save experience"}
          aria-pressed={isSaved}
          className="group"
          whileTap={{ scale: 0.92 }}
          onClick={(event) => {
            event.stopPropagation();
            onSave();
            triggerCardBounce();
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
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const getExperienceEndYear = (duration: string) => {
  const dateRange = duration.split("·")[0] ?? duration;
  const endPart = dateRange.split("-").at(-1)?.trim() ?? dateRange.trim();
  const yearMatch = endPart.match(/\d{4}|Present/i);

  return yearMatch ? yearMatch[0] : "";
};

const ExperiencePreview = ({
  src,
  title,
  description,
  borderColor,
  textColor,
}: {
  src: string | null;
  title: string;
  description: string;
  borderColor: string;
  textColor: string;
}) => {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-6 text-center"
        style={{ borderColor }}
      >
        <span className="mb-1 text-4xl">😢</span>
        <h4 className="z-10 text-lg font-bold" style={{ color: textColor }}>
          Sorry, no image
        </h4>
        <p className="z-10 text-xs opacity-70" style={{ color: textColor }}>
          {description.substring(0, 60)}...
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl border-2"
      style={{ borderColor }}
    >
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const ExperienceOverlay = ({
  experience,
  onClose,
}: {
  experience: Experience;
  onClose: () => void;
}) => {
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-[3px] bg-[#2A272A]"
          style={{ borderColor }}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="sticky top-0 z-10 flex items-center justify-between border-b-[3px] bg-[#2A272A] p-4"
            style={{ borderColor }}
          >
            <h2 className="text-2xl font-bold" style={{ color: textColor }}>
              {experience.fullTitle}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-3xl transition-transform hover:scale-110"
              style={{ color: borderColor }}
            >
              ×
            </button>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <p className="text-sm opacity-70" style={{ color: textColor }}>
                {experience.duration}
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold" style={{ color: borderColor }}>
                Description
              </h3>
              <p className="leading-relaxed" style={{ color: textColor }}>
                {experience.description}
              </p>
            </div>

            {experience.links && experience.links.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: borderColor }}>
                  Links
                </h3>
                <div className="space-y-2">
                  {experience.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block underline transition-opacity hover:opacity-70"
                      style={{ color: textColor }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-3 text-lg font-semibold" style={{ color: borderColor }}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border-2 px-3 py-1 text-sm"
                    style={{ borderColor, color: textColor, backgroundColor: bgColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {experience.images.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold" style={{ color: borderColor }}>
                  Gallery
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {experience.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-64 cursor-pointer overflow-hidden rounded-xl border-2 transition-opacity hover:opacity-80"
                      style={{ borderColor }}
                      onClick={() => setFullscreenImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`${experience.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95 p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative h-[min(88vh,900px)] w-[min(92vw,1400px)]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={fullscreenImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                sizes="92vw"
              />
              <button
                type="button"
                onClick={() => setFullscreenImage(null)}
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-black bg-opacity-50 text-4xl text-white transition-transform hover:scale-110"
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
