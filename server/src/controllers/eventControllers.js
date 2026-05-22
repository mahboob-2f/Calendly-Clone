import db from "../db/db.js";



export const getEventTypes= async(req,res)=>{
    try {
        const query = "SELECT * FROM event_types";

        const[events]= await db.execute(query);

        if(events.length==0){
            return res.status(404)
                .json({message:"Events not found"});
        }

        return res.status(200)
            .json(events);        
        
    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({message:"Failed to fetch events"});  
    }
}

export const createEventType=async(req,res)=>{
    try{
    const { title, slug, duration, user_id } = req.body;

    if([title,slug,duration,user_id].some(field => !field)){
        return res.status(400)
            .json({message:'missing fields'});
    }


    const query = `
      INSERT INTO event_types
      (title, slug, duration, user_id)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(query,[title,slug,duration,user_id]);

    return res.status(201)
        .json('Event type created successfully');

    }catch(error){
        console.log(error);
        return res.status(500)
        .json({message:"failed to create event type"}); 
    }
}

export const updateEventType=async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,slug,duration}=req.body;

        if([title,slug,duration].some((field)=>!field)){
            return res.status(400)
                .json({message:'missing fields'});            
        }

        const query = `
            UPDATE event_types
            SET title = ?, slug = ?, duration = ?
            WHERE id = ?
        `;


        await db.execute(query,[title,slug,duration,id]);

        return res.status(200)
            .json({message:'Event type update successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({message:"failed to update event type"}); 
    }
}

export const deleteEventType = async(req,res)=>{
    try {
        const {id}= req.params;
        if(!id){
            return res.status(400)
                .json({message:'missing id'});
        }
        const query = `
            DELETE FROM event_types
            WHERE id = ?
        `;

        await db.execute(query,[id]);

        return res.status(200)
            .json({message:'event type deleted successfully'});

    } catch (error) {
        console.log(error);
        return res.status(500)
        .json({message:"failed to delete the event type"}); 
    }
}

export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const query = `
      SELECT *
      FROM event_types
      WHERE slug = ?
    `;

    const [events] = await db.execute(
      query,
      [slug]
    );

    if (events.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json(events[0]);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch event",
    });
  }
};