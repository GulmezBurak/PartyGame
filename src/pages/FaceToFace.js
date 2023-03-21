import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";

const refMessages = collection(firestore, "questions");

export default function FacetoFace() {
  const [show, setShow] = useState(false);
  // Ayarlar
  const [option, setOption] = useState(false);
  const handleClose = () => setOption(false);
  const handleOption = () => setOption(true);
  // Oyun Oyna
  const [game, setGame] = useState(false);
  const handleCloseGame = () => setGame(false);
  const handleGame = () => setGame(true);

  // Soruyu Firebase Gönder
  const [question, setQuestion] = useState("");
  const [categoryId, setCategoryId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      question: question,
      categoryId: categoryId,
    };
    try {
      addDoc(refMessages, data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setQuestion("");
    setCategoryId();
  };

  // Soruyu Firebase'den Oku

  const readQuestions = async () => {
    const data = await getDocs(refMessages);
    setQuestion(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    readQuestions();
  }, []);
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
              id={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              aria-label="Default select example"
            >
              <option>Kategori Seç</option>
              <option id="1" value="1">
                Dökül Bakalım
              </option>
              <option id="2" value="2">
                Sorular Gelsin
              </option>
              <option id="3" value="3">
                Cesaret Bizim İşimiz
              </option>
            </Form.Select>
            <br />
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <button type="button">Soru Getir</button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {question.map((q) => (
            <p>
              {q.question}
            </p>
          ))}
        </Modal.Footer>
      </Modal>

      <Modal show={option} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select
                id={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                aria-label="Default select example"
              >
                <option>Kategori Seç</option>
                <option id="1" value="1">
                  Dökül Bakalım
                </option>
                <option id="2" value="2">
                  Sorular Gelsin
                </option>
                <option id="3" value="3">
                  Cesaret Bizim İşimiz
                </option>
              </Form.Select>
              <br />
              <Form.Label>Sorunuzu girin</Form.Label>

              <Form.Control
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                as="input"
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
