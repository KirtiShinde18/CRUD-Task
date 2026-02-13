const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")

mongoose.connect(process.env.MONGO_URL)

const app = express()


// app.use(limiter)
app.use(cors({
origin: process.env.NODE_ENV === 'production'
? 'https://crud-task-client.vercel.app'
: 'http://localhost:3000',
credentials: true
}));

app.use(express.json()) // for req.body

app.use("/api/todo", require("./routes/todo.routes.js"))

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, console.log("server running..."))
})

module.exports = app;

