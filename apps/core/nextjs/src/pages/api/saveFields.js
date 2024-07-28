// pages/api/saveFields.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { app, module, id, canvasItems } = req.body;

      // Construct the path to save the file, moving back two folders from the root
      const filePath = path.join(
        process.cwd(),
        "..", // Move up one folder
        "..", // Move up another folder
        "custom",
        app,
        module,
        "doc",
        id,
        "fields.js"
      );

      // Prepare the data to be written to the file
      const data = `export const fields = ${JSON.stringify(
        canvasItems,
        null,
        2
      )};`;

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Write the data to the file
      fs.writeFileSync(filePath, data);

      res.status(200).json({ message: "File saved successfully" });
    } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).json({ error: "Error saving file" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
