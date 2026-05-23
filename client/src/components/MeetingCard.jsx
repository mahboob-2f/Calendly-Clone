

import { useContext } from "react";
import {CalendarDays,Clock3,Mail,User,} from "lucide-react";

import { MeetingContext } from "../context/MeetingContext";

function MeetingCard({ meeting }) {
  const { cancelMeeting } =useContext(MeetingContext);

  const isUpcoming =new Date(meeting.start_time) > new Date();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {meeting.title}
          </h2>

          <div className="flex items-center gap-2 text-gray-600">
            <User size={16} />

            <span>
              {meeting.guest_name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={16} />

            <span>
              {meeting.guest_email}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays
              size={16}
            />

            <span>
              {new Date(
                meeting.start_time
              ).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock3 size={16} />

            <span>
              {new Date(
                meeting.start_time
              ).toLocaleTimeString(
                [],
                {
                  hour:
                    "2-digit",
                  minute:
                    "2-digit",
                }
              )}
            </span>
          </div>
        </div>

        {/* Right Side */}
        {isUpcoming && (
          <button
            onClick={() =>
              cancelMeeting(
                meeting.id
              )
            }
            className="border border-red-300 text-red-500 px-5 py-3 rounded-xl hover:bg-red-50 transition"
          >
            Cancel Meeting
          </button>
        )}
      </div>
    </div>
  );
}

export default MeetingCard;