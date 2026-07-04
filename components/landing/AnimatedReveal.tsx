"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedReveal
 * Reusable scroll-triggered entrance animation wrapper.
 *
 * LOGIC:
 * - `direction="left"`  -> element starts shifted LEFT (x: -80) and slides
 *    rightward into place. Use this for content/images positioned on the
 *    LEFT side of a section (matches "comes from left to right" on scroll).
 * - `direction="right"` -> element starts shifted RIGHT (x: 80) and slides
 *    leftward into place. Use this for content/images positioned on the
 *    RIGHT side of a section.
 * - `direction="up"`    -> element starts shifted DOWN (y: 60) and fades
 *    upward. Use this for centered content (e.g. gallery grids) that isn't
 *    clearly left- or right-aligned.
 *
 * `whileInView` + `viewport={{ once: true }}` means the animation fires
 * once, the first time the element scrolls into the viewport — it won't
 * replay if the user scrolls back up and down again.
 *
 * Requires: npm install framer-motion
 */

type Direction = "left" | "right" | "up";

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
  up: { x: 0, y: 60 },
};

const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) => {
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedReveal;
