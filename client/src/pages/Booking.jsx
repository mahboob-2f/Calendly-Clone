


import { useEffect, useContext } from "react";
import { useParams } from "react-router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Clock3, CalendarDays } from "lucide-react";

import { BookingContext } from "../context/BookingContext";
import { generateSlots } from "../utils/generatorSlots";
import BookingForm from "../components/BookingForm";

function Booking() {
  const { slug } = useParams();

  const {
    eventDetails,
    getEventBySlug,
    selectedDate,
    setSelectedDate,
    availableSlots,
    setAvailableSlots,
    getAvailabilityByDay,
    selectedTime,
    setSelectedTime,
    bookingSuccess,
  } = useContext(BookingContext);

  useEffect(() => {
    getEventBySlug(slug);
  }, [slug]);

  useEffect(() => {
    const loadSlots =
      async () => {
        if (!selectedDate ||!eventDetails)
          return;

        const day =selectedDate.getDay();

        const availability =
          await getAvailabilityByDay(day );

        if (!availability.length) {
          setAvailableSlots([]);
          return;
        }

        const slots =generateSlots(
            availability[0].start_time,
            availability[0].end_time,
            eventDetails.duration
          );

        setAvailableSlots(slots);
      };

    loadSlots();
  }, [selectedDate,eventDetails,]);

  if (!eventDetails) {
    return (
      <h2 className="text-center mt-20 text-xl">
        Loading...
      </h2>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10 max-w-lg w-full text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            Meeting Scheduled
          </h1>

          <p className="text-gray-500 mt-4">
            Your booking has
            been confirmed.
          </p>

          <div className="mt-8 space-y-2">
            <h2 className="text-xl font-medium">
              {
                eventDetails.title
              }
            </h2>

            <p className="text-gray-600">
              {
                selectedDate?.toDateString()
              }
            </p>

            <p className="text-gray-600">
              {selectedTime}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex justify-center p-6">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm max-w-6xl w-full grid lg:grid-cols-3 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="p-8 border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {eventDetails.title}
          </h2>

          <div className="mt-5 space-y-4 text-gray-600">
            <div className="flex items-center gap-3">
              <Clock3 size={18} />
              <span>
                {
                  eventDetails.duration
                }{" "}
                mins
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays
                size={18}
              />
              <span>
                Google Meet
              </span>
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="p-8 border-r border-gray-200">
          <h2 className="font-semibold text-lg mb-4">
            Select Date
          </h2>

          <Calendar
            value={
              selectedDate
            }
            onChange={
              setSelectedDate
            }
            minDate={
              new Date()
            }
          />
        </div>

        {/* RIGHT */}
        <div className="p-8">
          <h2 className="font-semibold text-lg mb-4">
            Select Time
          </h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {availableSlots.length ===
            0 ? (
              <p className="text-gray-500">
                No slots
                available
              </p>
            ) : (
              availableSlots.map(
                (slot) => (
                  <button
                    key={slot}
                    onClick={() =>
                      setSelectedTime(
                        slot
                      )
                    }
                    className={`w-full border rounded-xl py-3 transition ${
                      selectedTime ===
                      slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:border-blue-500"
                    }`}
                  >
                    {slot}
                  </button>
                )
              )
            )}
          </div>

          {selectedTime && (
            <div className="mt-8">
              <BookingForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;