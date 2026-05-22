import { useEffect } from "react";

import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import { useContext } from "react";
import { EventContext } from "../context/EventContext";



function EventTypes() {
  const { events, getEvents }=useContext(EventContext);

  useEffect(() => {
    getEvents(); // initial fetch
  }, []);

  return (
    <div>
      <h1>Event Types</h1>

      <EventForm />

      <div>
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