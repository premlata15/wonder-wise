import Trip from "../models/trip.js";

export const createTrip = async (tripData) => {
  const trip = await Trip.create(tripData);
  return trip;
};
