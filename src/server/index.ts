import path from "path";
import express from "express";
import { api } from "./routes/api";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve("src/client/dist")));

app.get("/", (_, res) => {
  res.sendFile(path.resolve("src/client/dist/index.html"));
});

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
