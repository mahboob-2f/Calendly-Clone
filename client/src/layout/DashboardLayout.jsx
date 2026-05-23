

import { Outlet, NavLink } from "react-router";
import {Calendar,Clock3,CalendarDays,Settings,Menu,} from "lucide-react";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] bg-white border-r border-gray-200 flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="h-20 px-8 flex items-center border-b">
            <h1 className="text-3xl font-bold text-blue-600">
              Calendly
            </h1>
          </div>

          {/* Create Button */}
          <div className="px-4 py-5">
            <button className="w-full rounded-full border border-gray-300 py-3 font-medium hover:bg-gray-50 transition">
              + Create
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2 px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Calendar size={20} />
              Scheduling
            </NavLink>

            <NavLink
              to="/meetings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Clock3 size={20} />
              Meetings
            </NavLink>

            <NavLink
              to="/availability"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <CalendarDays size={20} />
              Availability
            </NavLink>
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
            <Settings size={18} />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b h-20 px-6 flex items-center justify-between">
          <button className="md:hidden">
            <Menu />
          </button>

          <div></div>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-sm font-semibold text-orange-600">
              M
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;