



import { useContext } from "react";
import { useState } from "react";
import { AvailabilityContext } from "../context/AvailabilityContext";

function AvailabilityForm() {
  const { createAvailability } =useContext(AvailabilityContext);

  const [formData, setFormData] =
    useState({
      day_of_week: "",
      start_time: "",
      end_time: "",
      timezone:"Asia/Kolkata",
    });

  const handleSubmit = async (e)=> {
    e.preventDefault();

    await createAvailability({...formData,user_id: 1,});

    setFormData({
      day_of_week: "",
      start_time: "",
      end_time: "",
      timezone:"Asia/Kolkata",
    });
  };

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-5">
        Add Availability
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-4"
      >
        {/* Day */}
        <select
          value={
            formData.day_of_week
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              day_of_week:
                e.target.value,
            })
          }
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            Select Day
          </option>

          {days.map(
            (day, index) => (
              <option
                key={index}
                value={index}
              >
                {day}
              </option>
            )
          )}
        </select>

        {/* Start Time */}
        <input
          type="time"
          value={
            formData.start_time
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              start_time:
                e.target.value,
            })
          }
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* End Time */}
        <input
          type="time"
          value={
            formData.end_time
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              end_time:
                e.target.value,
            })
          }
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl px-5 py-3 hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AvailabilityForm;