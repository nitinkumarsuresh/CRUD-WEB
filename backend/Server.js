const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()
const routes = require("./routes/TaskRoute")
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log(err));

app.use("/api",routes)

const PORT = process.env.PORT| 5000
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));