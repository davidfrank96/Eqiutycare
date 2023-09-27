const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")

const app = express()
const port = process.env.PORT || 3003

require('dotenv').config()

app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "secretKey",
    saveUninitialized: false,
    resave: false,
    maxAge: 60 * 1000
}))
app.use(express.static('public'))
app.use(expressLayouts)

app.set('layout', './layouts/main')
app.set("view engine", "ejs")

const homeRoutes = require('./server/routes/HomeRoutes.js')
const authRoutes = require('./server/routes/AuthRoutes.js')
const appRoutes = require('./server/routes/AppRoutes.js')

app.use("/", homeRoutes)
app.use("/auth", authRoutes)
app.use("/app", appRoutes)

app.listen(port, ()=> console.log(`listening to port ${port}`))