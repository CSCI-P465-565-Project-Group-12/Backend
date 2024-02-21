import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
function App() {
  return (
    <>
      <h1 id="logo">BashBoss</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
