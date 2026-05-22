import express from 'express'; 
import { deleteMeeting, getUpComingMeetings } from '../controllers/meetingControllers.js';


const meetingRouter= express.Router();

meetingRouter.get("/", getUpComingMeetings);

meetingRouter.delete("/:id", deleteMeeting);
export {meetingRouter};