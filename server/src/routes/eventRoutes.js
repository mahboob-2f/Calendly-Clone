import express from 'express';
import { createEventType, deleteEventType, getEventBySlug, getEventTypes, updateEventType } from '../controllers/eventControllers.js';

const eventRouter = express.Router();

eventRouter.get('/hey',(req,res)=>{
    res.send('Hey there!');
})
eventRouter.get('/',getEventTypes);
eventRouter.post('/',createEventType)
eventRouter.put('/:id',updateEventType);
eventRouter.delete('/:id',deleteEventType);
eventRouter.get('/slug/:slug',getEventBySlug);

export {eventRouter};