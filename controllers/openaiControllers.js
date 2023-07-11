const openai = require('../config/openaiConfig');

const generateContent = async (req, res) => {

    const { content } = req.body;

    const answer = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system", 
                content: "You are a helpful assistant to help user to check English."
            },
            {
                role: 'user',
                content: `Correct grammar and refine the following sentences.: ${content}`
            }
        ],
        temperature: 1,
        max_tokens: 500
    })

    res.status(200).json({
        answer: answer.data.choices[0].message.content,
    })
}


module.exports = { generateContent }