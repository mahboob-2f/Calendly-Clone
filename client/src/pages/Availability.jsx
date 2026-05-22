import { useEffect } from "react";

import AvailabilityForm from "../components/AvailabilityForm";
import AvailabilityCard from "../components/AvailabilityCard";
import { useContext } from "react";
import { AvailabilityContext } from "../context/AvailabilityContext";

function Availability() {
  const {availability,getAvailability,} = useContext(AvailabilityContext);

  useEffect(() => {
    getAvailability();
  }, []);

  return (
    <div>
      <h1>Availability</h1>

      <AvailabilityForm />

      {availability.map((item) => (
        <AvailabilityCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default Availability;