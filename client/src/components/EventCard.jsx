


import { useContext, useState } from "react";
import {Copy,Pencil,Trash2,Link,Clock3,} from "lucide-react";

import { EventContext } from "../context/EventContext";

function EventCard({ event }) {
  const {deleteEvent,updateEvent,} = useContext(EventContext);

  const [isEditing, setIsEditing] =useState(false);

  const [editData, setEditData] =
    useState({
      title: event.title,
      slug: event.slug,
      duration: event.duration,
    });

  const handleUpdate = async () => {
    try {
      await updateEvent(event.id,editData);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://calendly-backend-8kb6.onrender.com/book/${event.slug}`
    );

    alert("Link copied!");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Color Strip */}
        <div className="w-2 bg-purple-500"></div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {isEditing ? (
            <div className="space-y-4">
              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full border rounded-xl p-3"
                placeholder="Title"
              />

              <input
                value={editData.slug}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    slug: e.target.value,
                  }))
                }
                className="w-full border rounded-xl p-3"
                placeholder="Slug"
              />

              <input
                value={editData.duration}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                className="w-full border rounded-xl p-3"
                placeholder="Duration"
              />

              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900">
                {event.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  <span>
                    {event.duration} min
                  </span>
                </div>

                <span>•</span>

                <span>
                  Google Meet
                </span>

                <span>•</span>

                <span>
                  One-on-One
                </span>
              </div>

              <p className="mt-3 text-gray-500">
                Weekdays, 9 am - 5 pm
              </p>

              <p className="mt-2 text-sm text-blue-600">
                /book/{event.slug}
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-3 px-6 py-4 border-t lg:border-t-0 lg:border-l border-gray-200">
            <button
              onClick={copyLink}
              className="flex items-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-50"
            >
              <Link size={16} />
              Copy Link
            </button>

            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="p-3 rounded-full hover:bg-gray-100"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() =>
                deleteEvent(event.id)
              }
              className="p-3 rounded-full hover:bg-red-50 text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;