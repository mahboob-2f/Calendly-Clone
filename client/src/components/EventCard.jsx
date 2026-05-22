import { useContext } from "react";
import { useState } from "react";
import { EventContext } from "../context/EventContext";


function EventCard({ event }) {
  const { deleteEvent, updateEvent } = useContext(EventContext);

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: event.title,
    slug: event.slug,
    duration: event.duration,
  });

  const handleUpdate = async () => {
    try {
      await updateEvent(event.id, editData);

      setIsEditing(false);  
    } catch (error) {
      console.log(error); 
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/book/${event.slug}`
    ); 
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({...prev,title: e.target.value, }))
            }
          />

          <input
            value={editData.slug}
            onChange={(e) =>
              setEditData((prev) => ({...prev,slug: e.target.value, }))
            }
          />

          <input
            value={editData.duration}
            onChange={(e) =>
              setEditData((prev) => ({...prev,duration: e.target.value, }))
            }
          />

          <button onClick={handleUpdate}>
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{event.title}</h3>

          <p>{event.duration} mins</p>

          <p>{event.slug}</p>
        </>
      )}

      <button onClick={() => setIsEditing(!isEditing)}>
        Edit
      </button>

      <button onClick={() => deleteEvent(event.id)}>
        Delete
      </button>

      <button onClick={copyLink}>
        Copy Link
      </button>
    </div>
  );
}

export default EventCard;