import { useEffect } from "react";
import { useParams } from "react-router";
import Calendar from "react-calendar";
import { useContext } from "react";
import { BookingContext } from "../context/BookingContext.jsx";
import { generateSlots } from "../utils/generatorSlots.js";
import BookingForm from "../components/BookingForm.jsx";


function Booking() {
    const { slug } = useParams();

    const { eventDetails, getEventBySlug, selectedDate, setSelectedDate, availableSlots, setAvailableSlots, getAvailabilityByDay, selectedTime, setSelectedTime, bookingSuccess } = useContext(BookingContext);

    useEffect(() => {
        getEventBySlug(slug);
    }, [slug]);


    useEffect(() => {
        const loadSlots = async () => {
            if (!selectedDate || !eventDetails) return;

            const day = selectedDate.getDay();

            const availability =
                await getAvailabilityByDay(day);

            if (!availability.length) {
                setAvailableSlots([]); // cleared slots
                return;
            }

            const slots = generateSlots(
                availability[0].start_time,
                availability[0].end_time,
                eventDetails.duration
            );

            setAvailableSlots(slots); // updated slots
        };

        loadSlots();

    }, [selectedDate, eventDetails]);
    if (!eventDetails) {
        return <h2>Loading...</h2>;
    }
    // if (bookingSuccess) {
    //     return (
    //         <div>
    //             <h1>Meeting Scheduled</h1>
    //             <p>Your booking was successful.</p>
    //         </div>
    //     );
    // }
    if (bookingSuccess) {
        return (
            <div>
                <h1>Meeting Scheduled</h1>

                <p>
                    Your booking has been confirmed.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1>{eventDetails.title}</h1>

            <p>
                Duration: {eventDetails.duration} mins
            </p>

            <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
            />
            <h3>Available Slots</h3>

            {
                availableSlots.length === 0 ? (
                    <p>No slots available</p>
                ) : (
                    availableSlots.map((slot) => (
                        <button
                            key={slot}
                            onClick={() =>
                                setSelectedTime(slot)
                            }
                        >
                            {slot}
                        </button>
                    ))
                )
            }

            {selectedDate && (
                <p>
                    Selected Date:
                    {" "}
                    {selectedDate.toDateString()}
                </p>
            )}
            {
                selectedTime && (
                    <h4>
                        Selected Slot: {selectedTime}
                    </h4>
                )
            }
            {selectedTime && <BookingForm />}
        </div>
    );
}

export default Booking;