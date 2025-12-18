const parseResume = require("../utils/resumeParser");

exports.scanResumeController = async (req, res) => {
    try {
        const filePath = req.file.path;

        const parsedData = await parseResume(filePath);

        res.status(200).json({
            success: true,
            data: parsedData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Resume parsing failed" });
    }
};
