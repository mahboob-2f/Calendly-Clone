import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'})


const app = express();
app.use(express.json());
app.use(cors());




app.get('/',(req,res)=>{
    res.send('Server in running...');
});






const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server is listening on port :" + port);
});