import client from "../client";

const endpoint = "/bookings";

type BookingDetailsType = {
  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  totalAmount: number;
  userId: string;
  carId: string;
  carName: string;
  pricePerDay: number;
  transactionId?: string;
  transactionRef: string;
};

const createBooking = (bookingData: BookingDetailsType) =>
  client.post(`${endpoint}/create`, bookingData);

const getUserBookings = (userId: string) =>
  client.get(`${endpoint}/user/${userId}`);

export { createBooking, getUserBookings };
