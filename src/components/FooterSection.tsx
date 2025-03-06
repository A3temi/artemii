"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "@fontsource/aboreto"; // Ensure this import is present if using the package

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      id="section-5"
      className="w-full h-full text-center py-40 bg-transparent"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-xl md:text-2xl font-light tracking-wide text-[#F8ECE4] font-aboreto"
      >
        MAKE TODAY WORK FOR TOMORROW.
      </motion.p>
    </motion.footer>
  );
};

export default FooterSection;
