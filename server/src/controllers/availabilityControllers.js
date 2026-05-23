import db from "../db/db.js";

export const getAvailability = async(req,res)=>{
    try {
    const query = `
      SELECT * FROM availability
    `;

    const [availability] = await db.execute(query);
    if(availability.length===0){
        return res.status(404).json({
            message:"No availability found"
        });
    }

    res.status(200).json(availability);

  } catch (error) {

    console.log(error);     

    res.status(500).json({
      message: "Failed to fetch availability",
    });
  }
}

export const createAvailability = async(req,res)=>{
    try {
    const {day_of_week,start_time,end_time,timezone,user_id,} = req.body;

    if([day_of_week,start_time,end_time,timezone,user_id].some((field)=>!field)){
        return res.status(400)
            .json({
                message:'missing fields'
            })
    }
    const query = `
      INSERT INTO availability
      (day_of_week,start_time,end_time,timezone,user_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [day_of_week,start_time,end_time,timezone,user_id,]);

    return res.status(201)
        .json({
        message: "Availability created successfully",
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      message: "Failed to create availability",
    });
  }
}

export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const {day_of_week,start_time,end_time,timezone,} = req.body;

    if([day_of_week,start_time,end_time,timezone].some((field)=>!field)){
        return res.status(400)
            .json({
                message:'missing fields'
            })
    }

    const query = `
      UPDATE availability
      SET
      day_of_week = ?,
      start_time = ?,
      end_time = ?,
      timezone = ?
      WHERE id = ?
    `;

    await db.execute(query, [day_of_week,start_time,end_time,timezone,id,]);

    return res.status(200).json({
      message: "Availability updated successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to update availability",
    });
  }
};

export const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM availability WHERE id = ?",
      [id]
    );

    return res.status(200).json({
      message: "Availability deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to delete availability",
    });
  }
};

export const getAvailabilityByDay = async (req, res) => {
  try {
    const { day } = req.params;

    const query = `
      SELECT *
      FROM availability
      WHERE day_of_week = ?
    `;

    const [availability] = await db.execute(query, [day]);

    if(availability.length===0){
        return res.status(404).json({
            message:"No availability found for the specified day"
        });
    }
    return res.status(200).json(availability);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch availability",
    });
  }
};