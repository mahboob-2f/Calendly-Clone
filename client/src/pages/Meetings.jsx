import { useEffect } from "react";

import MeetingCard from "../components/MeetingCard";
import { useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";

function Meetings() {
  const {meetings, getMeetings,cancelMeeting} = useContext(MeetingContext);

  useEffect(() => {
    getMeetings();
  }, []);

  const upcomingMeetings = meetings.filter(
    (meeting) =>
      new Date(meeting.start_time) > new Date()
  );

  const pastMeetings = meetings.filter(
    (meeting) =>
      new Date(meeting.start_time) < new Date()
  );

  return (
    <div>
      <h1>Meetings</h1>
 

      <h2>Upcoming Meetings</h2>

      {upcomingMeetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
        />
      ))}

      <h2>Past Meetings</h2>

      {pastMeetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
        />
      ))}
    </div>
  );
}

export default Meetings;