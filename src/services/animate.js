export const logoAnimation = {
  hidden: {
    y: -200,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
  exit: {
    y: -200,
    transition: {
      duration: 0.5,
    },
  },
};
export const loginSectionAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 2,
    transition: { duration: 1, ease: "easeInOut" },
  },
};
