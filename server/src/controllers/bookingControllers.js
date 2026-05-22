import db from "../db/db.js";

export const createBooking = async (req, res) => {
    try {
        const { guest_name,guest_email, start_time, end_time, user_id, event_type_id } = req.body;

        if ([
            guest_name, guest_email, start_time, end_time, user_id, event_type_id
        ].some((field) => !field)) {
            return res.status(400)
                .json({
                    message: 'missing fields'
                })
        }
        const checkQuery = `
        SELECT * FROM meetings
        WHERE start_time = ?
        AND event_type_id = ?
        `;

        const [existingMeetings] = await db.execute(
            checkQuery,
            [start_time, event_type_id]
        );

        // => checking if time slot is booked or not

        if (existingMeetings.length > 0) {
            return res.status(400).json({
                message: "Time slot already booked",
            });
        }

        // =>  if not booked then create the booking
        const insertQuery = `
      INSERT INTO meetings
      (guest_name,guest_email,start_time,end_time,user_id,event_type_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        await db.execute(insertQuery, [
            guest_name,
            guest_email,
            start_time,
            end_time,
            user_id,
            event_type_id,
        ]);

        return res.status(201)
            .json({
                message: "Meeting booked successfully",
            });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create booking",
        });
    }
}