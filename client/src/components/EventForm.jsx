import { useState } from "react";
import { EventContext } from '../context/EventContext.jsx'
import { useContext } from "react";
 

function EventForm() {
  const { createEvent } = useContext(EventContext);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    duration: "",
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev,[name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        // =>    user_id =1, because default user is logged in 
      await createEvent({...formData,user_id: 1  });


      setFormData({title: "", slug: "", duration: ""});  

    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Event Name"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="slug"
        placeholder="event-url"
        value={formData.slug}
        onChange={handleChange}
      />

      <input
        type="number"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
      />

      <button type="submit">
        Create Event
      </button>
    </form>
  );
}

export default EventForm;