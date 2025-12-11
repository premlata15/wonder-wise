import { Router } from "express";
import {
  createBaggage,
  findAllBaggages,
  findBaggageById,
  updateBaggageById,
} from "../services/baggage.js";
const BAGGAGE_ROUTER = Router();

BAGGAGE_ROUTER.post("/", async (req, res) => {
  const baggage = await createBaggage(req.body);
  res.status(201).json(baggage);
});
BAGGAGE_ROUTER.get("/", async (req, res) => {
  // optionally support filter via query: /api/baggage?trip=...
  const filter = {};
  if (req.query.trip) filter.trip = req.query.trip;
  const baggages = await findAllBaggages(filter);
  res.status(200).json(baggages);
});
BAGGAGE_ROUTER.get("/:id", async (req, res) => {
  const baggage = await findBaggageById(req.params.id);
  res.status(200).json(baggage);
});
BAGGAGE_ROUTER.patch("/:id", async (req, res) => {
  const baggage = await updateBaggageById(req.params.id, req.body);
  res.status(200).json(baggage);
});

export default BAGGAGE_ROUTER;