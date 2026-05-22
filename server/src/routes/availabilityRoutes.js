import express from 'express'; 
import { createAvailability, deleteAvailability, getAvailability, updateAvailability } from '../controllers/availabilityControllers.js';



const availabilityRouter= express.Router();

availabilityRouter.get("/", getAvailability);
availabilityRouter.post("/", createAvailability);
availabilityRouter.put('/:id',updateAvailability);
availabilityRouter.delete('/:id',deleteAvailability);


export {availabilityRouter};