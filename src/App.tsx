import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";

function App() {
  return (
    <>
      <h1 id="logo">BashBoss</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </>
  );
}

export default App;
