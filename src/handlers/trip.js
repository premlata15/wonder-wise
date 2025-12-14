import { Router } from "express";
import { createTrip } from "../services/trips.js";
import { createTripValidator } from "../validators/trip.js";
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
  }
);
export default TRIP_ROUTER;
