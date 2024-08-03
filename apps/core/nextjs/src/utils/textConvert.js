export const toTitleCase = (str) => {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
