const express = require("express");
const app = express();

// import routes
const authRoutes = require("./routes/auth");
// route middlewares
app.use(express.json()); // for body parser

app.use("/eSamudaay", authRoutes);
app.listen(3000, () => console.log("server is running..."));