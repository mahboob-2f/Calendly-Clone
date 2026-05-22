import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const BookingContext = createContext();

export const BookingContextProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const getEventBySlug = async (slug) => {
    try {
      const response = await api.get(`/event-types/slug/${slug}`);

      setEventDetails(response.data);  
    } catch (error) {
      console.log(error);
    }
  };

  const createBooking = async (bookingData) => {
    try {
      await api.post("/bookings", bookingData);

      setBookingSuccess(true); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        eventDetails,
        selectedDate,
        selectedTime,
        bookingSuccess,

        setSelectedDate,
        setSelectedTime,

        getEventBySlug,
        createBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
