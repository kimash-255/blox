// utils/pathUtils.js
export const createNewPath = (currentPath, newPart) => {
  const pathParts = currentPath.split("/").filter(Boolean); // Remove empty parts
  pathParts.pop(); // Remove the last part
  pathParts.push(newPart); // Add the new part
  return "/" + pathParts.join("/");
};
