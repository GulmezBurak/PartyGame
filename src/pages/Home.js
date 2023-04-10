import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const refMessages = collection(firestore, "rooms");
  const navigate = useNavigate();
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);
  const [showJoinGamePopup, setShowJoinGamePopup] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [gameType, setGameType] = useState("");
  // const [redirectToRoom, setRedirectToRoom] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState("");
  const handleClose = () => {
    setShowJoinGamePopup(false);
    setShowNewGamePopup(false);
  };

  // const handleJoinRoom = () => {
  //   if (roomKey.trim()) {
  //     setRedirectToRoom(true);
  //     setShowNewGamePopup(false);
  //     setShowJoinGamePopup(false);
  //   }
  // };

  // oyun tipine göre sayafaya gitmeyi handle create room da yap!

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const roomId = uuidv4();
    const roomPath = `/rooms/${roomId}`;
    navigate(roomPath);

    const room = {
      roomId: roomId,
      gameType: gameType,
      roomName: roomName,
    };
    try {
      addDoc(refMessages, room);
      console.log(room);
    } catch (error) {
      console.log(error);
    }
    setRooms([]);
    setRoomId("");
    setRoomName("");
    const q = query(
      collection(firestore, "rooms"),
      where("roomId", "==", roomId)
    );
    // if (roomName.trim()) {
    //   // Create new room with roomName
    //   setRedirectToRoom(true);
    //   setShowNewGamePopup(false);
    //   setShowJoinGamePopup(false);
    // }

    // const handleSubmit = (e) => {
    //   e.preventDefault();

    //   if (!questionInput || !categoryId) {
    //     toast.error("Kategori ve soru boş bırakılamaz!");
    //     return;
    //   }
    //   const data = {
    //     question: questionInput,
    //     categoryId: categoryId,
    //   };
    //   try {
    //     addDoc(refMessages, data);
    //     console.log(data);
    //     toast.success("Soru kaydedildi.");
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   setQuestions([]);
    //   setCategoryId("");
    //   setQuestionInput("");
    // };
  };
  return (
    <div>
      <div>
        <Modal show={showNewGamePopup} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Hoş Geldiniz!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Oyun modu seçin</p>
            <Button
              variant={
                selectedGameType === "faceToFace"
                  ? "success"
                  : "outline-success"
              }
              onClick={() => setSelectedGameType("faceToFace")}
            >
              Play Face to Face
            </Button>
            <Button
              variant={
                selectedGameType === "online" ? "success" : "outline-success"
              }
              onClick={() => setSelectedGameType("online")}
            >
              Play Online
            </Button>
            <p>Devam etmek için bir oda oluşturun.</p>
            <div>
              <input
                type="text"
                placeholder="Oda Adı"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <Button variant="primary" onClick={handleCreateRoom}>
                Oda Oluştur
              </Button>
            </div>
            <div>
              <br />
              <Button
                variant="secondary"
                value={gameType}
                required
                onClick={() =>
                  selectedGameType === "faceToFace"
                    ? navigate("/FaceToFace")
                    : selectedGameType === "online"
                    ? navigate("/PlayOnline")
                    : toast.error("Oyun Modu seçin !")
                }
              >
                Oda Kurmadan Devam Et
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal show={showJoinGamePopup} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Hoş Geldiniz!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Devam etmek için mevcut bir odaya katılın.</p>
            <div>
              <input
                type="text"
                placeholder="Oda Key Numarası"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Button variant="primary">Odaya Katıl</Button>
              <br />
            </div>
          </Modal.Body>
        </Modal>
      </div>
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
        <button className="homeButton" onClick={setShowNewGamePopup}>
          New Game
        </button>

        <button className="homeButton" onClick={setShowJoinGamePopup}>
          Join Room
        </button>
      </div>
    </div>
  );
}
