


import { useEffect } from "react";
import { useContext } from "react";
import { AvailabilityContext } from "../context/AvailabilityContext";

import AvailabilityForm from "../components/AvailabilityForm";
import AvailabilityCard from "../components/AvailabilityCard";

function Availability() {
  const {availability,getAvailability,} = useContext( AvailabilityContext);

  useEffect(() => {
    getAvailability();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Availability
        </h1>

        <p className="text-gray-500 mt-2">
          Set when you are available
          for meetings
        </p>
      </div>

      {/* Form */}
      <AvailabilityForm />

      {/* Availability Cards */}
      <div className="space-y-4">
        {availability.length ===
        0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <h3 className="text-xl font-medium text-gray-700">
              No availability set
            </h3>

            <p className="text-gray-500 mt-2">
              Add your available time
              slots.
            </p>
          </div>
        ) : (
          availability.map((item) => (
            <AvailabilityCard
              key={item.id}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Availability;