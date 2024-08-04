const chokidar = require("chokidar");
const fs = require("fs-extra");
const path = require("path");

const customFolder = path.resolve(__dirname, "../../custom");
const pagesFolder = path.resolve(__dirname, "src/pages");
const templatesFolder = path.resolve(__dirname, "src/templates");

// Watcher to monitor changes in the custom folder
const watcher = chokidar.watch(customFolder, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

// Function to generate the page files from templates
const generatePageFiles = (routePath, importPath, importSettingsPath) => {
  const files = ["edit.js", "index.js"];
  files.forEach((file) => {
    const src = path.join(templatesFolder, file);
    const dest = path.join(pagesFolder, routePath, file);
    try {
      let content = fs.readFileSync(src, "utf8");
      const importStatements = `import { fields } from "${importPath}";\nimport settings from "${importSettingsPath}";\n\n`;
      content = importStatements + content;
      fs.outputFileSync(dest, content);
    } catch (error) {
      console.error(`Error processing ${file} for ${dest}:`, error);
    }
  });
};

const generatePageFiles1 = (routePath, importPath, importSettingsPath) => {
  const files = ["new.js", "list.js", "[id].js"];
  files.forEach((file) => {
    if (file === "list.js") {
      const src = path.join(templatesFolder, "list.js");
      const dest = path.join(pagesFolder, routePath, "index.js");
      try {
        let content = fs.readFileSync(src, "utf8");
        const importStatements = `import fields from "${importPath}";\nimport settings from "${importSettingsPath}";\n\n`;
        content = importStatements + content;
        fs.outputFileSync(dest, content);
      } catch (error) {
        console.error(`Error processing index.js for ${dest}:`, error);
      }
    } else {
      const src = path.join(templatesFolder, file);
      const dest = path.join(pagesFolder, routePath, file);
      try {
        let content = fs.readFileSync(src, "utf8");
        const importStatements = `import { fields } from "${importPath}";\nimport settings from "${importSettingsPath}";\n\n`;
        content = importStatements + content;
        fs.outputFileSync(dest, content);
      } catch (error) {
        console.error(`Error processing ${file} for ${dest}:`, error);
      }
    }
  });
};

// Function to update the routes
const updateRoutes = () => {
  const processDirectory = (currentPath, relativePath) => {
    fs.readdirSync(currentPath).forEach((item) => {
      const itemPath = path.join(currentPath, item);
      const itemRelativePath = path.join(relativePath, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        if (path.basename(itemPath) === "doc") {
          fs.readdirSync(itemPath).forEach((docName) => {
            const docRoutePath = path.join("documents", docName);
            const importPath = path
              .relative(
                path.join(pagesFolder, docRoutePath),
                path.join(itemPath, docName, "fields.js")
              )
              .replace(/\\/g, "/");
            const importSettingsPath = path
              .relative(
                path.join(pagesFolder, docRoutePath),
                path.join(itemPath, docName, "settings.json")
              )
              .replace(/\\/g, "/");
            generatePageFiles(docRoutePath, importPath, importSettingsPath);

            const docRoutePath1 = path.join(relativePath, "..", docName);
            const importPath1 = path
              .relative(
                path.join(pagesFolder, docRoutePath1),
                path.join(itemPath, docName, "fields.js")
              )
              .replace(/\\/g, "/");
            const importSettingsPath1 = path
              .relative(
                path.join(pagesFolder, docRoutePath1),
                path.join(itemPath, docName, "settings.json")
              )
              .replace(/\\/g, "/");
            generatePageFiles1(docRoutePath1, importPath1, importSettingsPath1);
          });
        } else {
          processDirectory(itemPath, itemRelativePath);
        }
      }
    });
  };

  processDirectory(customFolder, "");
};

// Watch for directory additions and deletions
watcher.on("addDir", updateRoutes).on("unlinkDir", updateRoutes);

// Initial run to setup routes
updateRoutes();
