


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
    const formattedStartTime =
      startTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); // fixed MySQL datetime format

    const formattedEndTime =
      endTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); // fixed MySQL datetime format
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
  <div className="border-t border-gray-200 pt-6 mt-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Enter Details
    </h3>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={guestName}
          onChange={(e) =>
            setGuestName(
              e.target.value
            )
          }
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={guestEmail}
          onChange={(e) =>
            setGuestEmail(
              e.target.value
            )
          }
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Selected Slot */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Selected Time
        </p>

        <h4 className="font-semibold text-gray-900 mt-1">
          {selectedDate?.toDateString()}
        </h4>

        <p className="text-gray-600">
          {selectedTime}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
        >
        Schedule Event
      </button>
    </form>
  </div>
);
}
export default BookingForm;