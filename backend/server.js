const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const Message = require("./models/Message");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// 🔹 Connect to MongoDB
mongoose.connect("mongodb+srv://folarinwilson_db_user:xD9dAJbjXrVfEhAY@cluster0.ai4dhfh.mongodb.net/")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// 🔹 CREATE Message
app.post("/api/message", async (req, res) => {
  try {
    const newMessage = new Message({
      text: req.body.text
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET All Messages
app.get("/api/message", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
