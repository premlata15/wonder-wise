import Trip from "../models/trip.js";
import NotFoundError from "../errors/not-found-error.js";
import ConflictError from "../errors/conflict-error.js";
import sendMail from "../utils/send-mail.js";
import jwt from "jsonwebtoken";
export const createTrip = async (tripData) => {
  const trip = await Trip.create(tripData);
  return trip;
};

export const getTrips = async (userId) => {
  const trips = await Trip.find({ user: userId });
  return trips;
};

export const getTripById = async (id, userId) => {
  const trip = await Trip.findOne({ _id: id, user: userId })
    .populate("collaborators")
    .populate("user", "name");
  if (!trip) {
    throw new NotFoundError("Trip not found");
  }
  return trip;
};

export const updateTrip = async (id, tripData, userId) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: id, user: userId },
    tripData,
    { new: true }
  );
  if (!trip) {
    throw new NotFoundError("Trip not found");
  }
  return trip;
};

export const deleteTrip = async (id, userId) => {
  const trip = await Trip.findOneAndDelete({ _id: id, user: userId });
  if (!trip) {
    throw new NotFoundError("Trip not found");
  }
  return trip;
};
export const inviteCollaborator = async (id, userId, collaboratorEmails) => {
  const trip = await getTripById(id, userId);
  if (
    trip.collaborators?.some((collaborator) =>
      collaboratorEmails.includes(collaborator.email)
    )
  ) {
    throw new ConflictError("Collaborator already invited");
  }
  const token = jwt.sign({ tripId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  const invitationLink = `${process.env.FRONTEND_URL}/trips/${id}/invite/accept-invite?token=${token}`;

  await sendMail(collaboratorEmails.join(","), "Trip Invitation to join", {
    link: invitationLink,
    title: trip.title,
    startDate: trip.startDate.toDateString(),
    endDate: trip.endDate.toDateString(),
    name: trip.user.name,
  });
  return { message: "Invitation sent successfully to collaborators" };
};
