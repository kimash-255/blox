// pages/api/saveFields.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { app, module, id, canvasItems } = req.body;

      // Construct the paths to save the files, moving back two folders from the root
      const basePath = path.join(
        process.cwd(),
        "..", // Move up one folder
        "..", // Move up another folder
        "custom",
        app,
        module,
        "doc",
        id
      );

      const fieldsJsPath = path.join(basePath, "fields.js");
      const fieldsJsonPath = path.join(basePath, "fields.json");

      // Prepare the data to be written to the fields.js file
      const fieldsJsData = `export const fields = ${JSON.stringify(
        canvasItems,
        null,
        2
      )};\n`;

      // Extract fields ignoring tabs and sections
      const extractFields = (obj) => {
        let fieldsList = [];

        // Function to recursively extract fields from any object
        const extract = (item) => {
          if (Array.isArray(item)) {
            item.forEach(extract);
          } else if (typeof item === "object") {
            if (item.fields) {
              fieldsList = fieldsList.concat(
                item.fields.map(({ icon, ...rest }) => rest)
              ); // Remove icons
            }
            Object.values(item).forEach(extract);
          }
        };

        extract(obj);
        return fieldsList;
      };

      const fieldsJsonData = extractFields(canvasItems);

      // Ensure the directory exists
      fs.mkdirSync(basePath, { recursive: true });

      // Write the data to the fields.js file
      fs.writeFileSync(fieldsJsPath, fieldsJsData);

      // Write the data to the fields.json file
      fs.writeFileSync(fieldsJsonPath, JSON.stringify(fieldsJsonData, null, 2));

      res.status(200).json({ message: "Files saved successfully" });
    } catch (error) {
      console.error("Error saving files:", error);
      res.status(500).json({ error: "Error saving files" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
