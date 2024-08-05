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

export const toCamelCase = (str) => {
  return str
    .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
    .toLowerCase() // Convert the whole string to lowercase
    .replace(/\s+(.)/g, (match, char) => char.toUpperCase()) // Capitalize the first letter after spaces
    .replace(/^\w/, (char) => char.toUpperCase()) // Capitalize the very first letter of the result
    .replace(/\s+/g, ""); // Remove all spaces
};
