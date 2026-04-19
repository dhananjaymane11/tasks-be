const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db");
const auth = require("./middleware/auth");
const loginRoutes = require("./routes/loginRoutes");
const taskRoutes = require("./routes/tasksRoutes");
const notesRoutes = require("./routes/notesRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api", auth);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", notesRoutes);

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } else {
    console.log("Database connection error:", err);
  }
});
