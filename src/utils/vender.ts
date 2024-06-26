export function ago(before: Date, after: Date) {
  const day = 24 * 60 * 60 * 1000;
  return Math.ceil(Math.abs((after.getTime() - before.getTime()) / day));
}

export function date(time: Date) {
  const year = time.getFullYear();
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }).map((a, i) => start + i);
}

export function random(start: number, end: number) {
  return Math.random() * (end - start) + start;
}

export function stars(count: number) {
  if (count >= 5000) {
    return `${(count / 1000).toFixed(1).replace(/[0.]+$/, "")}k`;
  }
  return count;
}

export function shuffle<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export function image(src: string, size: number) {
  return `/_next/image?w=${size}&q=75&url=${src}`;
}

// prettier-ignore
export function resolve(...paths: (string | number | undefined | null)[]) {
  const ps = paths.filter(p => p !== null && p !== undefined).map(p => typeof p === "string" ? p.trim() : String(p)).filter(p => p);
  if (!ps.length) {
    return "/";
  }
  if (/^(?:https?:)?\/\//i.test(ps[0])) {
    const prefix = `${ps[0].replace(/\/+$/g, "")}/`;
    const suffix = ps.slice(1).map(p => p.replace(/(^\/+|\/+$|\/{2,})/g, "")).join("/").replace(/(^\/+|\/+$|\/{2,})/g, "");
    return `${prefix}${suffix}`.toLowerCase();
  } else {
    const prefix = "/";
    const suffix = ps.map(p => p.replace(/(^\/+|\/+$|\/{2,})/g, "")).join("/").replace(/(^\/+|\/+$|\/{2,})/g, "");
    return `${prefix}${suffix}`.toLowerCase();
  }
}
