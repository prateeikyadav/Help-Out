import { GoogleGenAI } from '@google/genai';
import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  try {
    // 1. Fetch transcript from YouTube
    let transcriptItems;
    try {
      transcriptItems = await YoutubeTranscript.fetchTranscript(url);
    } catch (err) {
      console.error("Transcript Error:", err);
      return res.status(400).json({ error: "Could not fetch transcript. The video might be private, have no captions, or be age-restricted." });
    }

    // Combine all transcript pieces into one giant string
    const fullTranscript = transcriptItems.map(item => item.text).join(' ');

    // Prevent token limits by cutting off extremely long videos (e.g., limit to ~30k chars)
    const truncatedTranscript = fullTranscript.slice(0, 30000);

    // 2. Send transcript to Gemini for summarization
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Please extract the key educational insights from the following YouTube video transcript and summarize it into structured lecture notes. Use beautiful markdown formatting with clear headings, bullet points, and bold text for important terms.\n\nTranscript:\n${truncatedTranscript}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert academic tutor. Distill the provided transcript into a concise, highly readable summary. Extract the most important concepts and definitions. Return ONLY the markdown formatted summary, no conversational filler.",
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
}
