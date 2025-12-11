import NotFoundError from "../errors/not-found-error.js";
import Baggage from "../models/baggage.js";
/**
 * Create a new Baggage.
 * Expects baggageData to contain at least: trip, name, completed (completed is boolean)
 */
const createBaggage = async (baggageData) => {
  const normalized = {
    ...(baggageData.trip && { trip: baggageData.trip }),
    ...(baggageData.name && { name: baggageData.name }),
    ...(typeof baggageData.completed === "boolean" && {
      completed: baggageData.completed,
    }),
  };
  const baggage = await Baggage.create(normalized);
  return baggage.toObject();
};
/**
 * Find all baggages.
 * Optionally you can pass a filter object (e.g. { trip: tripId }) in the future.
 *  */
const findAllBaggages = async (filter = {}) => {
  // exclude nothing here (baggages usually don't have a password). Optionally populate trip.
  const baggages = await Baggage.find(filter).populate(
    "trip",
    "destination startDate endDate"
  );
  return baggages;
};
/**
 * Find a baggage by id.
 * Throws NotFoundError if not found.
 */
const findBaggageById = async (id) => {
  const baggage = await Baggage.findById(id).populate(
    "trip",
    "destination startDate endDate"
  );
  if (!baggage) {
    throw new NotFoundError("Baggage not found");
  }
  return baggage;
};
/**
 * Update a baggage by id.
 * Accepts partial baggageData. Runs schema validators.
 * */
const updateBaggageById = async (id, baggageData) => {
  // Build update object only with allowed fields
  const update = {
    ...(baggageData.name && { name: baggageData.name }),
    ...(typeof baggageData.completed === "boolean" && {
      completed: baggageData.completed,
    }),
    // trip typically shouldn't be changed via update, but if you want:
    ...(baggageData.trip && { trip: baggageData.trip }),
  };
  const baggage = await Baggage.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!baggage) {
    throw new NotFoundError("Baggage not found");
  }
  return baggage;
};
export { createBaggage, findAllBaggages, findBaggageById, updateBaggageById };
