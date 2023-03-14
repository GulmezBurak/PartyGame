import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-center text-3xl font-bold py-8">PARTY GAME</h2>
      <br />
      <button onClick={() => navigate("/FaceToFace")}>Play Face to Face</button>
      <button onClick={() => navigate("/PlayOnline")}>Play Online</button>
    </div>
  );
}
