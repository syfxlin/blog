export const isAbs: (url: string) => boolean;
export const layout: (slug: string, layout: string, siteUrl?: string) => string;
export const post: (slug: string, siteUrl?: string) => string;
export const page: typeof post;
export const category: typeof post;
export const tag: typeof post;
export const archive: typeof post;
export const join: (...paths: (number | string | null | undefined)[]) => string;
