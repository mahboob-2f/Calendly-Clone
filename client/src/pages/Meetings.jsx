

import { useEffect, useState } from "react";
import MeetingCard from "../components/MeetingCard";
import { useContext } from "react";
import { MeetingContext } from "../context/MeetingContext";

function Meetings() {
  const {meetings,getMeetings,} = useContext(MeetingContext);

  const [activeTab, setActiveTab] =useState("upcoming");

  useEffect(() => {
    getMeetings();
  }, []);

  const upcomingMeetings =
    meetings.filter((meeting) =>new Date(meeting.start_time) > new Date());

  const pastMeetings =
    meetings.filter((meeting) =>new Date(meeting.start_time) < new Date());

  const displayedMeetings =activeTab === "upcoming"? upcomingMeetings: pastMeetings;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Meetings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your scheduled
          meetings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200">
        <button
          onClick={() =>
            setActiveTab(
              "upcoming"
            )
          }
          className={`pb-4 font-medium transition ${
            activeTab ===
            "upcoming"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Upcoming
        </button>

        <button
          onClick={() =>
            setActiveTab("past")
          }
          className={`pb-4 font-medium transition ${
            activeTab ===
            "past"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Past
        </button>
      </div>

      {/* Meetings */}
      <div className="space-y-4">
        {displayedMeetings.length ===
        0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <h3 className="text-xl font-medium text-gray-700">
              No meetings found
            </h3>

            <p className="text-gray-500 mt-2">
              Meetings will appear
              here.
            </p>
          </div>
        ) : (
          displayedMeetings.map(
            (meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default Meetings;