const express = require('express')
const { generateContent, generateColors } = require('./controllers/openaiControllers')

// app setup
const app = express()
const PORT = 3000 || process.env.PORT

app.listen(PORT, () => console.log(`listening to for request on port ${PORT}`))

// middleware - able to destruct object on controller
app.use(express.json())
app.use(express.static('public'))

// routes
app.post('/api/content', generateContent)