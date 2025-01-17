const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db");
const taskRouter = require("./Routes/taskRouter");
const cors = require("cors");
const PORT = process.env.PORT || 6000;

// Middleware to parse JSON data
app.use(express.json()); 

app.use(cors());
// Middleware to parse URL-encoded data (for forms)
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("Api Working");
})
app.use("/task",taskRouter)



app.listen(PORT,()=>{
    console.log(`server is running in port PORT ${PORT}`);
})



