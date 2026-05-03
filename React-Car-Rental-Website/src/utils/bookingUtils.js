// src/utils/bookingUtils.js
export const BOOKING_STORAGE_KEY = 'carBookings';

// Get all bookings from localStorage
export const getBookings = () => {
  try {
    const saved = localStorage.getItem(BOOKING_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading bookings:', error);
    return [];
  }
};

// Save bookings to localStorage
export const saveBookings = (bookings) => {
  try {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings:', error);
  }
};

// Add new booking
export const addBooking = (carId, dates, userInfo = {}) => {
  const bookings = getBookings();
  const newBooking = {
    id: Date.now(),
    carId: carId,
    dates: dates,
    userInfo: userInfo,
    paymentMethod: userInfo.paymentMethod || 'unknown',
    proof: userInfo.proof || null,
    timestamp: new Date().toISOString(),
    status: 'pending_proof',
  };

  const updatedBookings = [...bookings, newBooking];
  saveBookings(updatedBookings);
  return newBooking;
};

// Check if car is available for selected dates
export const isCarAvailable = (carId, selectedDates) => {
  const bookings = getBookings();
  const carBookings = bookings.filter((booking) => booking.carId === carId);

  return !carBookings.some((booking) =>
    booking.dates.some((date) => selectedDates.includes(date))
  );
};

// Get booked dates for a car
export const getBookedDates = (carId) => {
  const bookings = getBookings();
  const carBookings = bookings.filter((booking) => booking.carId === carId);
  return carBookings.flatMap((booking) => booking.dates);
};

// Cancel booking
export const cancelBooking = (bookingId) => {
  const bookings = getBookings();
  const filteredBookings = bookings.filter(
    (booking) => booking.id !== bookingId
  );
  saveBookings(filteredBookings);
  return filteredBookings;
};

// Get user's bookings
export const getUserBookings = (userId) => {
  const bookings = getBookings();
  return bookings.filter((booking) => booking.userInfo.id === userId);
};
