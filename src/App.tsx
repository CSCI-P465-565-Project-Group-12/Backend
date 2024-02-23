import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";
import AllEventsPage from "./pages/AllEventsPage/AllEventsPage";
import UpdateEventPage from "./pages/UpdateEventPage/UpdateEventPage";

function App() {
  return (
    <>
      <h1 id="logo">BashBoss</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-events" element={<AllEventsPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/update-event" element={<UpdateEventPage />} />
      </Routes>
    </>
  );
}

export default App;
