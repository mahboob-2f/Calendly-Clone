import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const AvailabilityContext = createContext();

export const AvailabilityContextProvider = ({ children }) => {
    const [availability, setAvailability] = useState([]);

    const getAvailability = async () => {
        try {
            const response = await api.get("/availability");

            setAvailability(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createAvailability = async (availabilityData) => {
        try {
            await api.post("/availability", availabilityData);

            await getAvailability();
        } catch (error) {
            console.log(error);
        }
    };
    const updateAvailability = async (id, availabilityData) => {
        try {
            await api.put(`/availability/${id}`,availabilityData);  

            await getAvailability();  

        } catch (error) {
            console.log(error);
        }
    };

    const deleteAvailability = async (id) => {
        try {
            await api.delete(`/availability/${id}`);

            await getAvailability();

        } catch (error) {
            console.log(error);
        }
    };

    const value = {

        availability,
        getAvailability,
        createAvailability,
        updateAvailability,
        deleteAvailability,
    }

    return (
        <AvailabilityContext.Provider value={value}>
            {children}
        </AvailabilityContext.Provider>
    );
};

