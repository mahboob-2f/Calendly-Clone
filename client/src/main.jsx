import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MeetingContextProvider } from './context/MeetingContext.jsx'
import { AvailabilityContextProvider } from './context/AvailabilityContext.jsx'
import { EventContextProvider } from './context/EventContext.jsx'
import { BrowserRouter } from 'react-router'
import { BookingContextProvider } from './context/BookingContext.jsx'


import "react-calendar/dist/Calendar.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <EventContextProvider>
      <AvailabilityContextProvider>
        <MeetingContextProvider>
          <BookingContextProvider>

          <App />
          </BookingContextProvider>
        </MeetingContextProvider>
      </AvailabilityContextProvider>
    </EventContextProvider>
  </BrowserRouter>


)
