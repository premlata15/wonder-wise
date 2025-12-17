import Itinerary from "../models/Itinerary.js";
import NotFoundError from "../errors/not-found-error.js";
import ValidationError from "../errors/validation-error.js";
import { getTripById } from "./trips.js";

export const createItinerary = async (itineraryData) => {
  const trip = await getTripById(itineraryData.trip, itineraryData.user);
  if (
    new Date(itineraryData.Date) > new Date(trip.startDate) ||
    new Date(itineraryData.Date) < new Date(trip.endDate)
  ) {
    throw new ValidationError("Itinerary date must be within the trip dates");
  }
  const itinerary = await Itinerary.create(itineraryData);
  return itinerary;
};
export const getAllItineraries = async (tripId) => {
  await getTripById(tripId, userId);
  const itineraries = await Itinerary.find({ trip: tripId });
  return itineraries;
};
export const getItineraryById = async (id, userId, tripId) => {
  await getTripById(tripId, userId);
  const itinerary = await Itinerary.findOne({
    _id: id,
    trip: tripId,
  });
  if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }
  return itinerary;
};
export const updateItinerary = async (id, userId, tripId, itineraryData) => {
  await getTripById(tripId, userId);
  if (
    new Date(itineraryData.Date) > new Date(trip.endDate) ||
    new Date(itineraryData.Date) < new Date(trip.startDate)
  ) {
    throw new ValidationError("Itinerary date must be within the trip dates");
  }
  const itinerary = await Itinerary.findOneAndUpdate(
    { _id: id, trip: tripId },
    itineraryData,
    { new: true }
  );
  if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }
  return itinerary;
};
export const deleteItinerary = async (id, userId, tripId) => {
  await getTripById(tripId, userId);
  const itinerary = await Itinerary.findOneAndDelete({
    _id: id,
    trip: tripId,
  });
  if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }
  return itinerary;
};
