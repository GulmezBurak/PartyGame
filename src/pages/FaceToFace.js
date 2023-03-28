import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
const refMessages = collection(firestore, "questions");

export default function FacetoFace() {
  // Soruyu Firebase Gönder
  const [questions, setQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // const [show, setShow] = useState(false);
  // Ayarlar
  const [option, setOption] = useState(false);
  const handleClose = () => setOption(false);
  const handleOption = () => {
    setOption(true);
    setCategoryId("");
  };
  // Oyun Oyna
  const [game, setGame] = useState(false);
  const handleCloseGame = () => setGame(false);
  const handleGame = () => setGame(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!questionInput || !categoryId) {
      alert("Kategori ve soru boş bırakılamaz");
      return;
    }
    const data = {
      question: questionInput,
      categoryId: categoryId,
    };
    try {
      addDoc(refMessages, data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setQuestions([]);
    setCategoryId("");
    setQuestionInput("");
  };

  // Soruyu Firebase'den Oku

  const readQuestions = async () => {
    const q = query(
      collection(firestore, "questions"),
      where("categoryId", "==", categoryId)
    );
    const data = await getDocs(q);

    setQuestions(data.docs.map((doc) => doc.data()));
  };
  console.log(questions);
  // useEffect(() => {
  //   readQuestions();
  // }, []);

  return (
    <>
      <Button variant="primary" onClick={handleOption}>
        Ayarlar
      </Button>
      <br />
      <hr />

      <Button variant="primary" onClick={handleGame}>
        Oyun Oyna
      </Button>

      <Modal show={game} onHide={handleCloseGame}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select
              value={categoryId}
              required
              id={"categoryIdSelect"}
              onChange={(e) => setCategoryId(e.target.value)}
              aria-label="Default select example"
              placeholder="Kategori Seç"
            >
              <option value="">Kategori Seç</option>
              <option value="1">Dökül Bakalım</option>
              <option value="2">Sorular Gelsin</option>
              <option value="3">Cesaret Bizim İşimiz</option>
            </Form.Select>
            <br />
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <button onClick={readQuestions} type="button">
                Soru Getir
              </button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {questions[Math.floor(Math.random() * questions.length)]?.question}
        </Modal.Footer>
      </Modal>

      <Modal show={option} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ayarlar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select
                value={categoryId}
                required
                id={"categoryIdSelect"}
                onChange={(e) => setCategoryId(e.target.value)}
                aria-label="Default select example"
                placeholder="Kategori Seç"
              >
                <option value="">Kategori Seç</option>
                <option value="1">Dökül Bakalım</option>
                <option value="2">Sorular Gelsin</option>
                <option value="3">Cesaret Bizim İşimiz</option>
              </Form.Select>
              <br />
              <Form.Label>Sorunuzu girin</Form.Label>

              <Form.Control
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              />
              <Button type="submit" variant="success" onClick={handleSubmit}>
                Soruyu Gönder
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
