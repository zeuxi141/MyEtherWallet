const express = require('express')
const { StatusCodes } = require('http-status-codes')
const Moralis = require('moralis').default
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = 8017



app.use(cors())
app.use(express.json())


app.get('/getTokens', function (req, res) {
    res.status(StatusCodes.OK).json({});
})

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
}).then(() => {
    app.listen(port, hostname, () => {
        console.log(`Listening for API calls`)
    })
})
