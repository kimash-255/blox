export const toTitleCase = (str) => {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const toUnderscoreLowercase = (str) => {
  return str
    .replace(/[\s-]/g, "_") // Replace spaces and hyphens with underscores
    .toLowerCase(); // Convert the entire string to lowercase
};
