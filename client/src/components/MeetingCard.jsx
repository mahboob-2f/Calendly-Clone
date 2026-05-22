import { useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";


function MeetingCard({ meeting }) {
  const { cancelMeeting } = useContext(MeetingContext);

  return (
    <div className="border p-4 rounded mb-3">
      <h3>{meeting.guest_name}</h3>

      <p>{meeting.guest_email}</p>

      <p>{meeting.title}</p>

      <p>
        {new Date(meeting.start_time).toLocaleString()}
      </p>

      <button
        onClick={() => cancelMeeting(meeting.id)}
      >
        Cancel Meeting
      </button>
    </div>
  );
}

export default MeetingCard;