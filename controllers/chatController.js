const OpenAI = require("openai");
const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

exports.chatBotController = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.userId; // set by jwtMiddleware

        if (!message) return res.status(400).json({ error: "Message is required" });

        // Fetch limited, safe data
        const jobs = await Job.find({ status: "active" })
            .select("title location category")
            .limit(5);

        const applications = await Application.find({ userId })
            .select("jobTitle status");

        // System prompt: rules for the AI
        const systemPrompt = `
            You are JOBIFY's official assistant.
            You know about:
            - Active jobs and their title, location, category.
            - User applications and their status.
            - User profile info (if available).
            Answer clearly, concisely, and politely.
            If the user asks about jobs/applications, you can include a JSON action for navigation:
            {
            "reply": "...",
            "action": { "type": "navigate", "url": "/some-page" }
            }
            If info is not available, say so.
        `;

        // Context: current jobs + user applications
        const context = `
Available Jobs:
${jobs.length ? jobs.map(j => `- ${j.title} (${j.location}) [${j.category}]`).join("\n") : "No jobs available"}

User Applications:
${applications.length
                ? applications.map(a => `- ${a.jobTitle || "Unknown Job"}: ${a.status}`).join("\n")
                : "No applications found"}
`;

        // Call AI
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b:free",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "system", content: context },
                { role: "user", content: message },
            ],
        });

        // Try to parse JSON action if included
        let reply = response.choices[0].message.content;
        let parsed = { reply };
        try {
            const jsonStart = reply.indexOf("{");
            if (jsonStart !== -1) {
                parsed = JSON.parse(reply.slice(jsonStart));
            }
        } catch (err) {
            parsed = { reply };
        }

        res.status(200).json(parsed);

    } catch (error) {
        console.error("Chatbot Error:", error.message);
        res.status(500).json({ error: "Chatbot failed" });
    }
};
