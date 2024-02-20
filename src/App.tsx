import { Route, Routes } from "react-router";
import VenueOwnerPage from "./pages/VenueOwnerPage/VenueOwnerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VenueOwnerPage />} />
    </Routes>
  );
}

export default App;
