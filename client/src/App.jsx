import React from 'react';
import { Routes,Route } from 'react-router';
import DashboardLayout from './layout/DashboardLayout';
import EventTypes from './pages/EventTypes';
import Availability from './pages/Availability';
import Meetings from './pages/Meetings';
import Booking from './pages/Booking';

const App = () => {
  return (
    <div>
      

      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<EventTypes />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/meetings" element={<Meetings />}/>
        </Route>

        <Route path="/book/:slug" element={<Booking />}/>
      </Routes>
    </div>
  );
};

export default App;