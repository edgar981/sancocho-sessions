import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fade + rise on scroll-into-view. Mirrors the design's IntersectionObserver
 * reveal (threshold ~0.18, once). Falls back to a plain element when the user
 * asked for reduced motion.
 */
export default function Reveal({ children, as = 'div', style, id, delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return (
      <Tag id={id} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      id={id}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
