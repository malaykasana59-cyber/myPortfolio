/**
 * Motion Tokens specification adhering to ECC motion-ui standard
 */
export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
    sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
    bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
  spring: {
    snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
    bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
    gentle: { type: "spring" as const, stiffness: 150, damping: 25 },
    slider: { type: "spring" as const, stiffness: 380, damping: 32 },
  },
  distance: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};
