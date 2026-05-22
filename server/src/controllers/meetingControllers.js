import db from "../db/db.js";


export const getUpComingMeetings =async(req,res)=>{
    try {
    const query = `
        SELECT
        meetings.*,
        event_types.title
        FROM meetings
        JOIN event_types
        ON meetings.event_type_id = event_types.id
    `;

    const [meetings] = await db.execute(query);

    if(meetings.length==0){
        return res.status(404)
            .json({
                message:"No meetings found"
            })
    }

    return res.status(200).json(meetings);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch meetings",
    });
  }
}


export const deleteMeeting = async(req,res)=>{
    try {
    const { id } = req.params;
    if(!id){
        return res.status(400)
            .json({
                message:'missing meeting id'
            })
    }

    const query = `
      DELETE FROM meetings
      WHERE id = ?
    `;

    await db.execute(query, [id]);

    return res.status(200).json({
      message: "Meeting cancelled successfully",
    });

  } catch (error) {

    console.log(error); 

    return res.status(500).json({
      message: "Failed to cancel meeting",
    });
  }
}