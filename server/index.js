import express from "express";
import users from "./users.js";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors(), express.static("build"));

app.use("/users", users);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
