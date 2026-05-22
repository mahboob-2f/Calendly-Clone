import { useContext } from "react";
import { useState } from "react"; 
import { AvailabilityContext } from "../context/AvailabilityContext";

function AvailabilityForm() {
  const { createAvailability } =useContext(AvailabilityContext);

  const [formData, setFormData] = useState({
    day_of_week: "",
    start_time: "",
    end_time: "",
    timezone: "Asia/Kolkata",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAvailability({
      ...formData,
      user_id: 1,
    });

    setFormData({
      day_of_week: "",
      start_time: "",
      end_time: "",
      timezone: "Asia/Kolkata",
    });  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Day (0-6)"
        value={formData.day_of_week}
        onChange={(e) =>
          setFormData({
            ...formData,
            day_of_week: e.target.value,
          })
        }
      />

      <input
        type="time"
        value={formData.start_time}
        onChange={(e) =>
          setFormData({
            ...formData,
            start_time: e.target.value,
          })
        }
      />

      <input
        type="time"
        value={formData.end_time}
        onChange={(e) =>
          setFormData({
            ...formData,
            end_time: e.target.value,
          })
        }
      />

      <button type="submit">
        Save Availability
      </button>
    </form>
  );
}

export default AvailabilityForm;