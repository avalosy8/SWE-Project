import './App.css';
import Login from "./Components/Login";
import GoogleCalendar from "./Components/GoogleCalendar";
import React, { useEffect, useState } from 'react';
import Sidebar from "./Components/Sidebar";

function App() {

  return (
    <div className="App">
      <Sidebar />
      <Login />
      {/* <GoogleCalendar/> */}
    </div>
  );
}

export default App;