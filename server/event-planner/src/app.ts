import express from "express";
import eventRoutes from "./routes/event";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send(true);
});

app.use("/event", eventRoutes);

console.log(`Server starting at port 8080`);
app.listen(8080);
