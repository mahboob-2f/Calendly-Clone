import express from 'express';
import dotenv from 'dotenv';
import { eventRouter } from './src/routes/eventRoutes.js';
import { availabilityRouter } from './src/routes/availabilityRoutes.js';
import bookingRouter from './src/routes/bookingRoutes.js';
import { meetingRouter } from './src/routes/meetingRoutes.js';
dotenv.config({path:'./.env'})
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;



app.get('/',(req,res)=>{
    res.send('Server in running...');
});


app.use('/api/event-types',eventRouter);
app.use('/api/availability',availabilityRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/meeting',meetingRouter);



app.listen(port,()=>{
    console.log("server is listening on port :" + port);
});