import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../firebase";

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
  const [question, setQuestion] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.ref("questions").push({ question });
    setQuestion("");
  };
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <button type="button">Soru Getir</button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGame}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleCloseGame}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={option} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="name"
                placeholder="Kullanıcı adı giriniz."
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select aria-label="Default select example">
                <option>Kategori Seç</option>
                <option value="1">Dökül Bakalım</option>
                <option value="2">Sorular Gelsin</option>
                <option value="3">Cesaret Bizim İşimiz</option>
              </Form.Select>
              <br />
              <Form.Label>Sorunuzu girin</Form.Label>

              <Form.Control
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                as="input"
                rows={3}
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
