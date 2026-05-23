
import { useEffect, useContext } from "react";
import { Search } from "lucide-react";

import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import { EventContext } from "../context/EventContext";

function EventTypes() {
  const { events, getEvents } =useContext(EventContext);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Scheduling
          </h1>

          <div className="flex gap-8 mt-5 border-b">
            <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">
              Event types
            </button>

            <button className="pb-3 text-gray-500">
              Single-use links
            </button>

            <button className="pb-3 text-gray-500">
              Meeting polls
            </button>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
          + Create
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search event types"
          className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-medium text-orange-600">
          M
        </div>

        <h2 className="font-semibold text-gray-900">
          My Events
        </h2>
      </div>

      {/* Event Form */}
      <EventForm />

      {/* Event Cards */}
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

export default EventTypes;