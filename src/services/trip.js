import NotFoundError from "../errors/not-found-error.js";
import Trip from "../models/trip.js";

/**
 * Create a new Trip.
 * Expects tripData to contain at least: user, destination, startDate, endDate (dates may be strings)
 */
const createTrip = async (tripData) => {
  // normalize/convert date strings to Date objects if present
  const normalized = {
    ...(tripData.user && { user: tripData.user }),
    ...(tripData.destination && { destination: tripData.destination }),
    ...(tripData.startDate && { startDate: new Date(tripData.startDate) }),
    ...(tripData.endDate && { endDate: new Date(tripData.endDate) }),
    ...(tripData.participants && { participants: tripData.participants }),
    ...(tripData.notes && { notes: tripData.notes }),
    ...(tripData.status && { status: tripData.status }),
  };

  const trip = await Trip.create(normalized);
  return trip.toObject();
};

/**
 * Find all trips.
 * Optionally you can pass a filter object (e.g. { user: userId }) in the future.
 */
const findAllTrips = async (filter = {}) => {
  // exclude nothing here (trips usually don't have a password). Optionally populate user.
  const trips = await Trip.find(filter).populate("user", "name email");
  return trips;
};

/**
 * Find a trip by id.
 * Throws NotFoundError if not found.
 */
const findTripById = async (id) => {
  const trip = await Trip.findById(id).populate("user", "name email");
  if (!trip) {
    throw new NotFoundError("Trip not found");
  }
  return trip;
};

/**
 * Update a trip by id.
 * Accepts partial tripData. Runs schema validators.
 */
const updateTripById = async (id, tripData) => {
  // Build update object only with allowed fields
  const update = {
    ...(tripData.destination && { destination: tripData.destination }),
    ...(tripData.startDate && { startDate: new Date(tripData.startDate) }),
    ...(tripData.endDate && { endDate: new Date(tripData.endDate) }),
    ...(tripData.participants && { participants: tripData.participants }),
    ...(tripData.notes && { notes: tripData.notes }),
    ...(tripData.status && { status: tripData.status }),
    // user typically shouldn't be changed via update, but if you want:
    ...(tripData.user && { user: tripData.user }),
  };

  const trip = await Trip.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    context: "query", // helps some validators that rely on query context
  }).populate("user", "name email");

  if (!trip) {
    throw new NotFoundError("Trip not found");
  }

  return trip.toObject();
};

/**
 * Delete a trip by id.
 */
const deleteTripById = async (id) => {
  const trip = await Trip.findByIdAndDelete(id);
  if (!trip) {
    throw new NotFoundError("Trip not found");
  }
  return { message: "Trip deleted successfully" };
};

export {
  createTrip,
  findAllTrips,
  findTripById,
  updateTripById,
  deleteTripById,
};
