// pages/api/saveSettings.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { app, module, id, settings } = req.body;

      // Construct the path to save the settings file
      const basePath = path.join(
        process.cwd(),
        "..",
        "..",
        "custom",
        app,
        module,
        "doc",
        id
      );

      const settingsJsonPath = path.join(basePath, "settings.json");

      // Ensure the directory exists
      fs.mkdirSync(basePath, { recursive: true });

      // Write the data to the settings.json file
      fs.writeFileSync(settingsJsonPath, JSON.stringify(settings, null, 2));

      res.status(200).json({ message: "Settings saved successfully" });
    } catch (error) {
      console.error("Error saving settings:", error);
      res.status(500).json({ error: "Error saving settings" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
