import Trip from "../models/trip.js";
export const createTrip = async (tripData) => {
  const trip = await Trip.create(tripData);
  return trip;
};

export const getAllTrips = async (userId) => {
  const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });
  return trips;
};

export const getTripById = async (tripId, userId) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  return trip;
};

export const updateTrip = async (tripId, userId, tripData) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  if (!trip) return null;

  if (tripData.title) trip.title = tripData.title;
  if (tripData.description) trip.description = tripData.description;
  if (tripData.startDate) trip.startDate = tripData.startDate;
  if (tripData.endDate) trip.endDate = tripData.endDate;
  if (tripData.destinations) trip.destinations = tripData.destinations;

  if (tripData.budget?.total !== undefined) {
    trip.budget.total = tripData.budget.total;
  }

  if (tripData.budget?.expenses) {
    trip.budget.expenses = tripData.budget.expenses;
  }

  await trip.save(); // triggers pre("save")
  return trip;
};

export const addExpense = async (tripId, userId, expense) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  if (!trip) return null;

  trip.budget.expenses.push(expense);
  await trip.save(); // recalculates spent

  return trip;
};

export const deleteExpense = async (tripId, userId, expenseId) => {
  const trip = await Trip.findOne({ _id: tripId, user: userId });
  if (!trip) return null;

  trip.budget.expenses = trip.budget.expenses.filter(
    (e) => e._id.toString() !== expenseId
  );

  await trip.save();
  return trip;
};

export const deleteTrip = async (tripId, userId) => {
  const trip = await Trip.findOneAndDelete({ _id: tripId, user: userId });
  return trip;
};
