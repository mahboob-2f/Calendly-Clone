import express from 'express'; 
import { createAvailability, getAvailability } from '../controllers/availabilityControllers.js';



const availabilityRouter= express.Router();

availabilityRouter.get("/", getAvailability);
availabilityRouter.post("/", createAvailability);


export {availabilityRouter};