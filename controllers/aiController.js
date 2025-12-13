const OpenAI = require("openai");
const User = require("../models/userModel");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.aiChatController = async (req, res) => {
    try {
        const email = req.payload; // from JWT middleware
        const { message } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json("User not found");
        }

        // PERSONALIZED SYSTEM PROMPT
        const systemPrompt = `
                            You are JOBIFY AI Assistant.

                            User details:
                            Name: ${user.username}
                            Role: ${user.role}
                            Skills: ${user.skills?.join(", ")}

                            Rules:
                            - Be friendly and professional
                            - Answer shortly and clearly
                            - Focus on jobs, applications, hiring, career help
                            `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
        });

        const reply = completion.choices[0].message.content;

        res.status(200).json({ reply });

    } catch (err) {
        console.error("AI ERROR:", err?.error?.code);

        if (err.status === 429) {
            return res.status(200).json({
                reply:
                    "I’m temporarily unavailable due to usage limits. Please try again later."
            });
        }

        res.status(500).json({
            reply: "Something went wrong with the AI assistant."
        });
    }
};
