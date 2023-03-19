import express from "express";
import eventRoutes from "./routes/event";
import threadRoutes from "./routes/thread";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send(true);
});

app.get("/event/:eventId", (_, res) => {
  console.log("Received event get request!");
  const result = {
    title: "DUMMY",
    description: "DUMMY DESCRIPTION",
    author: "David",
    id: Math.random(),
  };
  console.log("Returning", result);
  res.send(result);
});

app.use("/event", eventRoutes);
app.use("/thread", threadRoutes);

console.log(`Server starting at port 8080`);
app.listen(8080);
