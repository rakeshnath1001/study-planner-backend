import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT;

  app.use(express.json());
app.use(cors())

  // Gemini API setup (lazy)
  let genAI: GoogleGenAI | null = null;
  const getGenAI = () => {
    if (!genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined");
      }
      genAI = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return genAI;
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // write here the backend route
  // Example: simple test route returning JSON
  app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend", time: new Date().toISOString() });
  });

  app.post("/api/ai/generate-plan", async (req, res) => {
    try {
      const { goal, startDate, endDate } = req.body;
      const ai = getGenAI();
      
      const prompt = `Create a study plan for the goal: "${goal}" from ${startDate} to ${endDate}. 
      Give me a list of daily study topics and approximate duration (in minutes) for each day.
      The goal and dates should be respected.
      Return the response ONLY as a JSON array of objects, with NO markdown code blocks. 
      Schema: [{ "date": "YYYY-MM-DD", "title": "Topic Name", "duration": 60 }]`;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      const text = result.text;
      
      // Attempt to parse JSON safely
      let jsonStr = text?.trim();
      if (jsonStr?.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```(json)?\n/, '').replace(/\n```$/, '');
      }
      
      res.json(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("AI Generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });



  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
