import { Router } from "express";
import USER_ROUTER from "./users.js";
import TRIP_ROUTER from "./trip.js";
import BAGGAGE_ROUTER from "./baggages.js";
import ITINERARY_ROUTER from "./itinerary.js";
import AUTH_ROUTER from "./auth.js";

const HANDLERS = Router();

HANDLERS.use("/users", USER_ROUTER);
HANDLERS.use("/trips", TRIP_ROUTER);
HANDLERS.use("/:tripId/baggages", BAGGAGE_ROUTER);
HANDLERS.use("/itineraries", ITINERARY_ROUTER);
HANDLERS.use("/auth", AUTH_ROUTER);

export default HANDLERS;
