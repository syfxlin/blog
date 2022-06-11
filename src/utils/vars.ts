export const vars = (
  str: string | undefined | null,
  map: Record<string, (value?: string) => string>
): string => {
  if (str === undefined || str === null) {
    return "";
  }
  const regexp = /{([^:}]+):?([^}]*)}/g;
  let text = str;
  let match;
  do {
    match = regexp.exec(text);
    if (match) {
      const [full, name, value] = match;
      text = text.replace(full, map[name]?.(value) ?? "");
    }
  } while (match);
  return text;
};
