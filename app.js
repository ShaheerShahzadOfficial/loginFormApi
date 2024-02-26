import express from "express";
import { authRoute } from "./route.js";

const app = express();
app.use(express.json())
app.use("/user", authRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use((req, res) => {
  res.status(404).send("URL Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Some thing Broke ${err} `);
});

export default app;
