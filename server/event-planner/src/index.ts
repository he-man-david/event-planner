import express from "express";
import eventRoutes from "./routes/event";
import threadRoutes from "./routes/thread";

const app = express();

app.get("/admin/health", (_, res) => {
  res.send(true);
});

app.use("/event", eventRoutes);
app.use("/thread", threadRoutes);

console.log(`Server starting at port 8080`);
app.listen(8080);
