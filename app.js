const express = require('express')
const { generateContent } = require('./controllers/openaiControllers')

// app setup
const app = express()
const PORT = 3000 || process.env.PORT

app.listen(PORT, () => console.log(`listening to request on port ${PORT}`))

// middleware
app.use(express.json())
app.use(express.static('public'))

// routes
app.post('/api/content', generateContent)