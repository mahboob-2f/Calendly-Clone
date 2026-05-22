import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const MeetingContext = createContext();

export const MeetingContextProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);

  const getMeetings = async () => {
    try {
      const response = await api.get("/meetings");

      setMeetings(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const cancelMeeting = async (id) => {
    try {
      await api.delete(`/meetings/${id}`);

      await getMeetings(); 
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    meetings,
    getMeetings,
    cancelMeeting,
  };

  return (
    <MeetingContext.Provider value={value}>
      {children}
    </MeetingContext.Provider>
  );
};

