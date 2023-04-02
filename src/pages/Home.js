import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="summary">
        <h2>Nasıl oynanır ?</h2>
        <hr />
        <p>
          <span>Oyun 3 kategoriden oluşur.</span>
          <br />
          <span>1-Bu kim? :</span> Birine ait bir özelliği adını vermeden yaz.
          Bakalım bu kim?
          <br />
          <span>2-Sorular Gelsin :</span> Merak ettiğin soruları anonim bir
          şekilde sor.
          <br />
          <span>3-Cesaret bizim işimiz :</span> Arkadaşlarının cesaretini sına.
          <br /> Yeni soru butonuyla oyuna kategorisine göre sorular ekleyin.
          <br />
          Kategori seçin ve soru getir butonu ile kategoriye uygun rastgele
          sorular ile oyunun keyfini çıkarın !
        </p>
      </div>
      <br />
      <div>
        <button className="homeButton" onClick={() => navigate("/FaceToFace")}>
          Play Face to Face
        </button>
        <button className="homeButton" onClick={() => navigate("/PlayOnline")}>
          Play Online
        </button>
      </div>
    </div>
  );
}
