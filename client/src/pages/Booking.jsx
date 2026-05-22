import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BookingContext } from "../context/BookingContext";


function Booking() {
  const { slug } = useParams();

  const {eventDetails,getEventBySlug,} = useContext(BookingContext);

  useEffect(() => {
    getEventBySlug(slug);
  }, [slug]);

  if (!eventDetails) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{eventDetails.title}</h1>

      <p>
        Duration: {eventDetails.duration} mins
      </p>
    </div>
  );
}

export default Booking;