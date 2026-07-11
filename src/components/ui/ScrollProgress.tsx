import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[3px] w-full origin-left z-[60]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #4d6bff, #8ea2ff)",
        boxShadow: "0 0 12px rgba(77,107,255,0.6)",
      }}
    />
  );
}
