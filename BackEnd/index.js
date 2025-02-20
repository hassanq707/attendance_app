require('dotenv').config()

const express = require("express");
const connectToMongo = require("./Connection");
const cors = require("cors");
const app = express()
const userRoute = require('./routes/user')
const dataRoute = require('./routes/data')
const cookieParser = require("cookie-parser")
const {restrictToLogin, checkForAuth} = require('./middleware');
const USER = require("./models/users");
const USER_DATA = require('./models/data');

const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin:FRONTEND_URL,
    credentials: true,
  })
);

app.use(checkForAuth)


app.get("/allUsers", restrictToLogin(["admin"]) ,async (req, res) => {
  const allUsers = await USER_DATA.find().populate("user")
  res.json({
      allUsers,
      admin : req.user
  });
});

app.get("/", restrictToLogin(["employee"]) , async (req, res) => {
    const user = await USER.findOne({
        fullname : req.user.fullname
    })
    const data = await USER_DATA.findOne({
        user : req.user._id
    })
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    res.json({user,data});
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
});


connectToMongo(process.env.DB_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/",dataRoute)

app.use("/user",userRoute)


app.listen(PORT,()=>{
    console.log("Server is listening to PORT: " + PORT)
})  