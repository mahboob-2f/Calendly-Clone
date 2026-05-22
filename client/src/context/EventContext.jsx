import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await api.get("/event-types");

      setEvents(response.data);  
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (eventData) => {
    try {
      await api.post("/event-types", eventData);

      await getEvents();  
    } catch (error) {
      console.log(error);
    }
  };
  const updateEvent = async (id, eventData) => {
  try {
    await api.put(`/event-types/${id}`, eventData);  

    await getEvents();  
  } catch (error) {
    console.log(error); 
  }
};

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/event-types/${id}`);

      await getEvents();  
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    events,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

