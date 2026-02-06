import { Router } from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  inviteCollaborator,
  acceptInvitation,
  addExpenses,
} from "../services/trips.js";
import {
  createTripValidator,
  updateTripValidator,
} from "../validators/trip.js";
import useValidator from "../middlewares/useValidator.js";

const TRIP_ROUTER = Router();

TRIP_ROUTER.post(
  "/",
  useValidator(createTripValidator),
  async (req, res, next) => {
    try {
      const trip = await createTrip({ ...req.body, user: req.user.userId });
      res.status(201).json(trip);
    } catch (error) {
      next(error);
    }
  },
);

TRIP_ROUTER.get("/", async (req, res, next) => {
  try {
    const trips = await getTrips(req.user.userId);
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const trip = await getTripById(req.params.id, req.user.userId);
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.patch(
  "/:id",
  useValidator(updateTripValidator),
  async (req, res, next) => {
    try {
      const trip = await updateTrip(req.params.id, req.body, req.user.userId);
      res.status(200).json(trip);
    } catch (error) {
      next(error);
    }
  },
);

TRIP_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    await deleteTrip(req.params.id, req.user.userId);
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.post("/:id/invite", async (req, res, next) => {
  try {
    const result = await inviteCollaborator(
      req.params.id,
      req.user.userId,
      req.body.collaboratorEmails,
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.get("/:id/invite/accept", async (req, res, next) => {
  try {
    const result = await acceptInvitation(req.query.token, req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.post("/expenses/:id", async (req, res, next) => {
  try {
    const result = await addExpenses(req.user.userId, req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default TRIP_ROUTER;
