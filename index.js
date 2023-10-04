const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3003

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(session({
    secret: "secretKey",
    saveUninitialized: false,
    resave: false,
    maxAge: 3600000 
}))
app.use(express.static('public'))
app.use(expressLayouts)

app.set('layout', './layouts/main')
app.set("view engine", "ejs")

app.use((req, res, next) => {
    const userSession = req.session.adminId || req.session.clientId || req.session.caregiverId;
    res.locals.userSession = userSession; 
    next();
});

const homeRoutes = require('./server/routes/HomeRoutes.js')
const authRoutes = require('./server/routes/AuthRoutes.js')
const appRoutes = require('./server/routes/AppRoutes.js')
const adminRoutes = require('./server/routes/AdminRoutes.js')

app.use("/", homeRoutes)
app.use("/auth", authRoutes)
app.use("/app", appRoutes)
app.use("/admin", adminRoutes)

app.listen(port, ()=> console.log(`listening to port ${port}`))