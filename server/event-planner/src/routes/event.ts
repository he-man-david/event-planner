import { Router } from "express";
import { v4 } from "uuid";
// import {
//   getEventDetails,
//   saveNewEventDetails,
// } from "../repositories/event_planner";

const router = Router();

router.get("/:eventId", async (req, res) => {
  // const result = await getEventDetails(req.params.eventId);
  const result = {
    title: "DUMMY",
    description: "DUMMY DESCRIPTION",
    author: "David",
    id: Math.random(),
  };
  res.send(result);
});

router.post("/", async (req, res) => {
  console.log(`req is ${req.body}`);
  const title = String(req.body.title || "");
  const description = String(req.body.description || "");
  const author = String(req.body.author || "");
  // const result = await saveNewEventDetails({ title, description, author });
  const result = {
    title,
    description,
    author,
    id: Math.random(),
  };
  res.send(result);
});

router.put("/:eventId", (req, res) => {
  res.status(500);
  res.send("Not implemented yet!");
});

export default router;
