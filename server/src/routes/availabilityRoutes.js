import express from 'express'; 
import { createAvailability, deleteAvailability, getAvailability, getAvailabilityByDay, updateAvailability } from '../controllers/availabilityControllers.js';



const availabilityRouter= express.Router();

availabilityRouter.get("/", getAvailability);
availabilityRouter.post("/", createAvailability);
availabilityRouter.put('/:id',updateAvailability);
availabilityRouter.delete('/:id',deleteAvailability);
availabilityRouter.get('/day/:day',getAvailabilityByDay);


export {availabilityRouter};