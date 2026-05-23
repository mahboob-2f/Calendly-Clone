import { useState, useContext } from "react";
import { BookingContext } from "../context/BookingContext";

function BookingForm() {
  const { selectedDate, selectedTime, eventDetails, createBooking } = useContext(BookingContext);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startTime = new Date(selectedDate);

    const [time, meridian] = selectedTime.split(" ");

    let [hours, minutes] = time.split(":");

    hours = Number(hours);

    if (meridian === "PM" && hours !== 12) {
      hours += 12; // converted PM time
    }

    if (meridian === "AM" && hours === 12) {
      hours = 0; // converted midnight
    }

    startTime.setHours(hours);
    startTime.setMinutes(Number(minutes));
    startTime.setSeconds(0);


    const endTime = new Date(
      startTime.getTime() +
      eventDetails.duration * 60 * 1000 // calculated meeting end time
    );


    //=> converting start and end time to mysql format

    const formattedStartTime = new Date(start_time);
    const formattedEndTime = new Date(end_time);



    await createBooking({
      guest_name: guestName,
      guest_email: guestEmail,

      start_time: formattedStartTime,
      end_time: formattedEndTime,

      user_id: 1,
      event_type_id: eventDetails.id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Your Email"
        value={guestEmail}
        onChange={(e) => setGuestEmail(e.target.value)}
      />

      <button type="submit">
        Schedule Event
      </button>
    </form>
  );
}

export default BookingForm;