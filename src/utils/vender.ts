export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }).map((a, i) => start + i);
};

export const random = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};

export const shuffle = <T>(a: T[]): T[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};
