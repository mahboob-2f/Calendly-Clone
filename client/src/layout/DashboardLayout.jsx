import { Link, Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div>
      <aside>
        <Link to="/">Event Types</Link>

        <Link to="/availability">Availability</Link>

        <Link to="/meetings">Meetings</Link>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;