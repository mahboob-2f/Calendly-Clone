import { useContext } from "react";
import { useState } from "react";
import { AvailabilityContext } from "../context/AvailabilityContext";

function AvailabilityCard({ item }) {
  const {updateAvailability,deleteAvailability,} = useContext(AvailabilityContext);

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    day_of_week: item.day_of_week,
    start_time: item.start_time,
    end_time: item.end_time,
    timezone: item.timezone,
  });

  const handleUpdate = async () => {
    await updateAvailability(item.id,editData);

    setIsEditing(false); // closed edit mode
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={editData.day_of_week}
            onChange={(e) =>
              setEditData({
                ...editData,
                day_of_week: e.target.value,  
              })
            }
          />

          <input
            type="time"
            value={editData.start_time}
            onChange={(e) =>
              setEditData({
                ...editData,
                start_time: e.target.value,  
              })
            }
          />

          <input
            type="time"
            value={editData.end_time}
            onChange={(e) =>
              setEditData({
                ...editData,
                end_time: e.target.value, 
              })
            }
          />

          <button onClick={handleUpdate}>
            Save
          </button>
        </>
      ) : (
        <>
          <p>{item.day_of_week}</p>

          <p>
            {item.start_time} - {item.end_time}
          </p>

          <p>{item.timezone}</p>
        </>
      )}

      <button
        onClick={() => setIsEditing(!isEditing)}
      >
        Edit
      </button>

      <button
        onClick={() => deleteAvailability(item.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default AvailabilityCard;