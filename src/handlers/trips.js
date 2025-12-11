import { Router } from "express";
import {
  createTrip,
  findAllTrips,
  findTripById,
  updateTripById,
  deleteTripById,
} from "../services/trip.js";

const TRIP_ROUTER = Router();

TRIP_ROUTER.post("/", async (req, res) => {
  const trip = await createTrip(req.body);
  res.status(201).json(trip);
});

TRIP_ROUTER.get("/", async (req, res) => {
  // optionally support filter via query: /api/trips?user=... 
  const filter = {};
  if (req.query.user) filter.user = req.query.user;
  const trips = await findAllTrips(filter);
  res.status(200).json(trips);
});

TRIP_ROUTER.get("/:id", async (req, res) => {
  const trip = await findTripById(req.params.id);
  res.status(200).json(trip);
});

TRIP_ROUTER.patch("/:id", async (req, res) => {
  const trip = await updateTripById(req.params.id, req.body);
  res.status(200).json(trip);
});

TRIP_ROUTER.delete("/:id", async (req, res) => {
  const result = await deleteTripById(req.params.id);
  res.status(200).json(result);
});

export default TRIP_ROUTER;
