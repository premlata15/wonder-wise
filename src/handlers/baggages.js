import { Router } from "express";
import {
  createBaggage,
  getAllBaggages,
  getBaggageById,
  updateBaggage,
  deleteBaggage,
} from "../services/baggage.js";
import useValidator from "../middlewares/usevalidator.js";
import {
  createBagaggeValidator,
  updateBagaggeValidator,
} from "../validators/baggage.js";

const BAGGAGE_ROUTER = Router({ mergeParams: true });

BAGGAGE_ROUTER.post(
  "/",
  useValidator(createBagaggeValidator),
  async (req, res, next) => {
    try {
      const baggage = await createBaggage({
        ...req.body,
        user: req.user.userId,
        trip: req.params.tripId,
      });
      res.status(201).json(baggage);
    } catch (error) {
      next(error);
    }
  }
);

BAGGAGE_ROUTER.get("/", async (req, res, next) => {
  try {
    const baggages = await getAllBaggages(req.params.tripId, req.user.userId);
    res.status(200).json(baggages);
  } catch (error) {
    next(error);
  }
});

BAGGAGE_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const baggage = await getBaggageById(
      req.params.id,
      req.user.userId,
      req.params.tripId
    );
    res.status(200).json(baggage);
  } catch (error) {
    next(error);
  }
});

BAGGAGE_ROUTER.patch(
  "/:id",
  useValidator(updateBagaggeValidator),
  async (req, res, next) => {
    try {
      const baggage = await updateBaggage(
        req.params.id,
        req.user.userId,
        req.params.tripId,
        req.body
      );
      res.status(200).json(baggage);
    } catch (error) {
      next(error);
    }
  }
);

BAGGAGE_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const baggage = await deleteBaggage(
      req.params.id,
      req.user.userId,
      req.params.tripId
    );
    res.status(200).json(baggage);
  } catch (error) {
    next(error);
  }
});

export default BAGGAGE_ROUTER;
