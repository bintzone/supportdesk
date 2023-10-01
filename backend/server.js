const path = require("path");
const express = require("express");

const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleWare/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//  conmect to db
connectDB();
const app = express();
// getting bodyjson
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//  serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to bintGO Api" });
  });
}

// errorHandler
app.use(errorHandler);
app.listen(PORT, () => console.log(`server started on port${PORT}`));
