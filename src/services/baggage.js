import Baggage from "../models/baggage.js";
import NotFoundError from "../errors/not-found-error.js";

export const createBaggage = async (baggageData) => {
  await getTripById(baggageData.trip, baggageData.user);
  const baggage = await Baggage.create(baggageData);
  return baggage;
};

export const getAllBaggages = async (tripId, userId) => {
  const baggages = await Baggage.find({ trip: tripId, user: userId });
  return baggages;
};

export const getBaggageById = async (id, userId, tripId) => {
  const baggage = await Baggage.findOne({
    _id: id,
    user: userId,
    trip: tripId,
  });
  if (!baggage) {
    throw new NotFoundError("Baggage not found");
  }
  return baggage;
};

export const updateBaggage = async (id, userId, tripId, baggageData) => {
  await getTripById(tripId, userId);
  const baggage = await Baggage.findOneAndUpdate(
    { _id: id, user: userId, trip: tripId },
    baggageData,
    {
      new: true,
    }
  );
  if (!baggage) {
    throw new NotFoundError("Baggage not found");
  }
  return baggage;
};

export const deleteBaggage = async (id, userId, tripId) => {
  const baggage = await Baggage.findOneAndDelete({
    _id: id,
    user: userId,
    trip: tripId,
  });
  if (!baggage) {
    throw new NotFoundError("Baggage not found");
  }
  return baggage;
};
