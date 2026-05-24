# Calendly Clone: Scheduling Platform

This project is a lightweight scheduling application inspired by Calendly. It lets a host create event types, define weekly availability, share a booking link, and accept guest bookings without back-and-forth messages.

## Features

- Create, edit, and delete event types
- Set availability by weekday and time range
- Generate shareable booking links using event slugs
- Let guests choose a date and available time slot
- Prevent double-booking for the same event and start time
- View and cancel scheduled meetings

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS 4
- Axios
- Lucide React
- React Calendar

### Backend

- Node.js
- Express 5
- MySQL using `mysql2`
- CORS
- dotenv

## Project Structure

```text
Calendly/
|-- client/   # React + Vite frontend
|-- server/   # Express + MySQL backend
|-- readme.md
```

## Local Setup

### 1. Clone the project

```bash
git clone <your-repo-url>
cd Calendly
```

### 2. Install dependencies

Install client dependencies:

```bash
cd client
npm install
```

Install server dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create `server/.env`:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
VITE_FRONTEND_URL=http://localhost:5173
```

### 4. Prepare the database

This project expects a MySQL database with these tables:

- `event_types`
- `availability`
- `meetings`

The backend reads and writes directly against those tables, so they must already exist before starting the app.

### 5. Run the backend

From the `server` folder:

```bash
npm run dev
```

The backend starts on `http://localhost:4000` by default.

### 6. Run the frontend

From the `client` folder:

```bash
npm run dev
```

The frontend starts on `http://localhost:5173`.

## Available Scripts

### Client

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

### Server

- `npm run dev` starts the backend with Nodemon
- `npm start` starts the backend with Node

## API Summary

Main backend route groups:

- `/api/event-types`
- `/api/availability`
- `/api/booking`
- `/api/meetings`

Public booking pages are handled by the frontend route:

- `/book/:slug`

## Assumptions Made In This Project

- The app currently behaves like a single-user scheduler. New events, availability entries, and bookings are submitted with `user_id: 1` from the frontend.
- There is no authentication or authorization flow yet.
- Availability is stored by weekday and used to generate bookable time slots for that day.
- The default timezone in the availability form is `Asia/Kolkata`.
- Meetings are labeled as `Google Meet` in the UI, but there is no actual video-conference integration yet.
- The copied booking link depends on `VITE_FRONTEND_URL` being set correctly in the client environment.
- The backend assumes the MySQL schema already exists and does not include migrations or seed scripts.
- Slot conflict protection currently checks for the same `start_time` and `event_type_id`.

## Deployment Notes

- The frontend includes a `vercel.json` rewrite so direct visits to routes like `/book/some-slug` load the React app correctly.
- The backend is configured with CORS support for `CLIENT_URL` and local development on `http://localhost:5173`.

## Future Improvements

- Add authentication and real multi-user support
- Add migrations and seed data for MySQL
- Add host-specific availability filtering instead of using a fixed user
- Add Google Meet or Zoom integration
- Add booking confirmation emails
- Improve timezone handling across host and guest flows
