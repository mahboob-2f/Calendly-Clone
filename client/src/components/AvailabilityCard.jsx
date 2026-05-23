


import { useContext } from "react";
import { useState } from "react";
import {
  Pencil,
  Trash2,
  Clock3,
} from "lucide-react";

import { AvailabilityContext } from "../context/AvailabilityContext";

function AvailabilityCard({
  item,
}) {
  const {updateAvailability,deleteAvailability,} = useContext(AvailabilityContext);

  const [isEditing, setIsEditing] =useState(false);

  const [editData, setEditData] =
    useState({
      day_of_week:item.day_of_week,
      start_time:item.start_time,
      end_time:item.end_time,
      timezone:item.timezone,
    });

  const handleUpdate =
    async () => {
      await updateAvailability(item.id,editData);

      setIsEditing(false);
    };

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
      {isEditing ? (
        <div className="grid md:grid-cols-4 gap-4">
          <select
            value={
              editData.day_of_week
            }
            onChange={(e) =>
              setEditData({
                ...editData,
                day_of_week:
                  e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          >
            {days.map(
              (
                day,
                index
              ) => (
                <option
                  key={index}
                  value={index}
                >
                  {day}
                </option>
              )
            )}
          </select>

          <input
            type="time"
            value={
              editData.start_time
            }
            onChange={(e) =>
              setEditData({
                ...editData,
                start_time:
                  e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="time"
            value={
              editData.end_time
            }
            onChange={(e) =>
              setEditData({
                ...editData,
                end_time:
                  e.target.value,
              })
            }
            className="border rounded-xl px-4 py-3"
          />

          <button
            onClick={
              handleUpdate
            }
            className="bg-blue-600 text-white rounded-xl px-5 py-3"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {
                days[
                  item.day_of_week
                ]
              }
            </h3>

            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Clock3 size={16} />

              <span>
                {
                  item.start_time
                }{" "}
                -{" "}
                {
                  item.end_time
                }
              </span>
            </div>

            <p className="text-gray-500 mt-2 text-sm">
              {
                item.timezone
              }
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setIsEditing(
                  true
                )
              }
              className="p-3 rounded-full hover:bg-gray-100"
            >
              <Pencil
                size={18}
              />
            </button>

            <button
              onClick={() =>
                deleteAvailability(
                  item.id
                )
              }
              className="p-3 rounded-full hover:bg-red-50 text-red-500"
            >
              <Trash2
                size={18}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailabilityCard;