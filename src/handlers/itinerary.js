import { Router } from "express";
import {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
} from "../services/itinerary.js";
import useValidator from "../middlewares/usevalidator.js";
import {
  createItineraryValidator,
  updateItineraryValidator,
} from "../validators/itinerary.js";

const ITINERARY_ROUTER = Router({ mergeParams: true });

ITINERARY_ROUTER.post(
  "/",
  useValidator(createItineraryValidator),
  async (req, res, next) => {
    try {
      const itinerary = await createItinerary(req.body);
      res.status(201).json(itinerary);
    } catch (error) {
      next(error);
    }
  }
);

ITINERARY_ROUTER.get("/", async (req, res, next) => {
  try {
    const itineraries = await getAllItineraries(
      req.params.tripId,
      req.user._id
    );
    res.json(itineraries);
  } catch (error) {
    next(error);
  }
});

ITINERARY_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const itinerary = await getItineraryById(
      req.params.id,
      req.user._id,
      req.params.tripId
    );
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

ITINERARY_ROUTER.patch(
  "/:id",
  useValidator(updateItineraryValidator),
  async (req, res, next) => {
    try {
      const itinerary = await updateItinerary(
        req.params.id,
        req.user._id,
        req.params.tripId,
        req.body
      );
      res.json(itinerary);
    } catch (error) {
      next(error);
    }
  }
);

ITINERARY_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const itinerary = await deleteItinerary(
      req.params.id,
      req.user._id,
      req.params.tripId
    );
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});
export default ITINERARY_ROUTER;
