import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FaceToFace from "./pages/FaceToFace";
import PlayOnline from "./pages/PlayOnline";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FaceToFace" element={<FaceToFace />} />
        <Route path="/PlayOnline" element={<PlayOnline />} />
      </Routes>
    </div>
  );
}

export default App;
