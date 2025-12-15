import { Router } from "express";
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addExpense,
  deleteExpense,
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
      const trip = await createTrip({
        ...req.body,
        user: req.user.userId,
      });

      res.status(201).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }
);
TRIP_ROUTER.get("/", async (req, res, next) => {
  try {
    const trips = await getAllTrips(req.user.userId);

    res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const trip = await getTripById(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
});
TRIP_ROUTER.patch(
  "/:id",
  useValidator(updateTripValidator),
  async (req, res, next) => {
    try {
      const trip = await updateTrip(req.params.id, req.user.userId, req.body);

      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      next(error);
    }
  }
);

TRIP_ROUTER.post("/:id/expenses", async (req, res, next) => {
  try {
    const trip = await addExpense(req.params.id, req.user.userId, req.body);

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.delete("/:id/expenses/:expenseId", async (req, res, next) => {
  try {
    const trip = await deleteExpense(
      req.params.id,
      req.user.userId,
      req.params.expenseId
    );

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
});

TRIP_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const trip = await deleteTrip(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default TRIP_ROUTER;
