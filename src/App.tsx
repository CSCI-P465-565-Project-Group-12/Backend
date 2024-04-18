import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";
import AllEventsPage from "./pages/AllEventsPage/AllEventsPage";
import UpdateEventPage from "./pages/UpdateEventPage/UpdateEventPage";
import AuthCallbackHandlerPage from "./pages/AuthCallbackHandlerPage/AuthCallbackHandlerPage";
import VenueOwnerProfilePage from "./pages/VenueOwnerProfilePage/VenueOwnerProfilePage";
import CreateVenuePage from "./pages/CreateVenuePage/CreateVenuePage";
import AllVenuesPage from "./pages/AllVenuesPage/AllVenuesPage";
import UpdateVenuePage from "./pages/UpdateVenuePage/UpdateVenuePage";
import EventParticipantsPage from "./pages/EventParticipantsPage/EventParticipantsPage";

function App() {
  return (
    <>
      <h1 id="logo">BashBoss</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-events" element={<AllEventsPage />} />
        <Route path="/all-venues" element={<AllVenuesPage />} />
        <Route path="/create-venue" element={<CreateVenuePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/update-venue" element={<UpdateVenuePage />} />
        <Route path="/update-event" element={<UpdateEventPage />} />
        <Route path="/event-participants" element={<EventParticipantsPage />} />
        <Route
          path="/post-auth-callback"
          element={<AuthCallbackHandlerPage />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/profile" element={<VenueOwnerProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
