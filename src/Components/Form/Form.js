import React, { useState } from "react";
import "./Form.css";
import { db } from "../Config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

const Form = () => {
  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const navigate = useNavigate();

  const quizCollectionRef = collection(db, "Quizzes");

  const onSubmitQuiz = async (e) => {
    e.preventDefault();
    console.log("run");
    try {
      await addDoc(quizCollectionRef, {
        Quizdesciption: description,
        Quizname: quizName,
        Timelimit: timeLimit,
        point: points,
      });
      navigate("/Quiz");
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle submitting the form data to the database here
  // };
  return (
    <div className="position">
      <div className="form">
        <h1>MyQuizApp</h1>
        <p>
          "Create an awesome quiz in minutes: Enter Quiz Name, Description,
          <br />
          Points/Grading System, and Time Limit"
        </p>
        <form onSubmit={onSubmitQuiz}>
          <div className="contact-form">
            <input
              type="text"
              className="form-control"
              placeholder="Quiz Name"
              value={quizName}
              onChange={(event) => setQuizName(event.target.value)}
            />
          </div>
          <div className="contact-form">
            <input
              type="number"
              className="form-control"
              placeholder="Points/Grading System"
              value={points}
              onChange={(event) => setPoints(Number(event.target.value))}
            />
          </div>
          <div className="contact-form">
            <input
              placeholder="Time Limit"
              type="number"
              className="form-control"
              value={timeLimit}
              onChange={(event) => setTimeLimit(Number(event.target.value))}
            />
          </div>

          <textarea
            type={Text}
            placeholder="Quiz Description"
            cols="60"
            rows="8"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
