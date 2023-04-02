import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FacetoFace.css";
import Accordion from "react-bootstrap/Accordion";

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
  // const [game, setGame] = useState(false);
  // const handleCloseGame = () => setGame(false);
  // const handleGame = () => setGame(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!questionInput || !categoryId) {
      toast.error("Kategori ve soru boş bırakılamaz!");
      return;
    }
    const data = {
      question: questionInput,
      categoryId: categoryId,
    };
    try {
      addDoc(refMessages, data);
      console.log(data);
      toast.success("Soru kaydedildi.");
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
    <div>
      <Accordion defaultActiveKey="0" className="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Nasıl Oynanır ?</Accordion.Header>
          <Accordion.Body>
            <div className="summary">
              <h2>Nasıl oynanır ?</h2>
              <hr />
              <p>
                <span>Oyun 3 kategoriden oluşur.</span>
                <br />
                <span>1-Bu kim? :</span>Birine ait bir özelliği adını vermeden
                yaz. Bakalım bu kim?
                <br />
                <span>2-Sorular Gelsin :</span> Merak ettiğin soruları anonim
                bir şekilde sor.
                <br />
                <span>3-Cesaret bizim işimiz :</span> Arkadaşlarının cesaretini
                sına.
                <br /> Yeni soru butonuyla oyuna kategorisine göre sorular
                ekleyin.
                <br />
                Kategori seçin ve soru getir butonu ile kategoriye uygun
                rastgele sorular ile oyunun keyfini çıkarın !
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button className="newQuestion" variant="primary" onClick={handleOption}>
        Yeni Soru
      </Button>
      <hr />

      <Form style={{ margin: "15px" }}>
        <Form.Select
          size="lg"
          value={categoryId}
          required
          id={"categoryIdSelect"}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Default select example"
          placeholder="Kategori Seç"
        >
          <option value="">Kategori Seç</option>
          <option value="1">Bu kim?</option>
          <option value="2">Sorular Gelsin</option>
          <option value="3">Cesaret Bizim İşimiz</option>
        </Form.Select>
        <br />
        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Button
            className="getQuestion"
            variant="getQuestion"
            onClick={readQuestions}
            type="button"
          >
            Soru Getir
          </Button>
        </Form.Group>
      </Form>

      <div className="questions">
        {questions[Math.floor(Math.random() * questions.length)]?.question}
      </div>

      <Modal show={option} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Soru</Modal.Title>
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
                <option value="1">Bu kim?</option>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success" onClick={handleSubmit}>
            Soru Ekle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
