export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }).map((a, i) => start + i);
};

export const random = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};
