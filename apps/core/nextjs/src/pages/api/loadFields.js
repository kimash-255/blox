// pages/api/loadFields.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const filePath = path.join(
        process.cwd(), // Project root
        "..", // Move up one directory
        "..", // Move up another directory
        req.query.filePath // Dynamic file path
      );
      console.log(filePath);

      if (fs.existsSync(filePath)) {
        console.log(filePath);
        const data = fs.readFileSync(filePath, "utf8");
        res.status(200).json({ content: data });
      } else {
        console.log(99999);
        res.status(404).json({ error: "File not found" });
      }
    } catch (error) {
      console.error("Error loading file:", error);
      res.status(500).json({ error: "Error loading file" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
