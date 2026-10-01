"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

// Respects prefers-reduced-motion by checking the hook
function useVariants(full: object, reduced: object) {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : full;
}

/* ─── FadeIn ─────────────────────────────────────────── */
interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 0.4, ...props }: FadeInProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
      animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── SlideUp ────────────────────────────────────────── */
export function SlideUp({ children, delay = 0, duration = 0.5, ...props }: FadeInProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
      animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerContainer ───────────────────────────────── */
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.07,
  ...props
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={
        prefersReduced
          ? {}
          : {
              hidden: {},
              show: {
                transition: { staggerChildren: staggerDelay },
              },
            }
      }
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : "show"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem ────────────────────────────────────── */
export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={
        prefersReduced
          ? {}
          : {
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── InView (scroll reveal) ─────────────────────────── */
interface InViewProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function InView({ children, delay = 0, ...props }: InViewProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScaleOnHover ───────────────────────────────────── */
export function ScaleOnHover({ children, ...props }: HTMLMotionProps<"div">) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      whileHover={prefersReduced ? {} : { scale: 1.02 }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── AnimatePresenceChild ───────────────────────────── */
export function AnimatePresenceChild({ children, ...props }: HTMLMotionProps<"div">) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
      animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
      exit={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
