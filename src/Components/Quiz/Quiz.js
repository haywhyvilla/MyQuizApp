import React, { useEffect, useState } from "react";
import "./Quiz.css";

import { Link } from "react-router-dom";
import { FcAnswers, FcQuestions } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { db } from "../Config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const navigate = useNavigate();

  const quizCollectionRef = collection(db, "Quizzes");
  const questionCollectionRef = collection(db, "question-answer");

  const onSubmitQuestion = async (e) => {
    e.preventDefault();
    console.log("run");
    try {
      await addDoc(questionCollectionRef, {
        question: question,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getQuizList = async () => {
    try {
      const data = await getDocs(quizCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      console.log(quizList[0]);
      setQuizList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuiz = async () => {
    const quizDoc = doc(db, "question-answer");
    await deleteDoc(quizDoc);
  };

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <>
      <div className="section-quiz">
        <div className="section-home">
          <div className="header-flex">
            <h1>MyQuizApp</h1>
            <Link to="/Form">New quiz</Link>
          </div>

          <div className="quiz-section">
            <h1>MyQuizApp is the easiest way to make quizzes for free</h1>
            <div className="quiz-centre">
              <h2>Quiz Question</h2>
              <div className="Quiz-info">
                {quizList[0] !== undefined && (
                  <div>
                    <button>{quizList[0].Quizdesciption}</button>
                    <button>{quizList[0].Quizname}</button>
                    <button>Time: {quizList[0].Timelimit}s</button>
                    <button>Grade: {quizList[0].point}</button>
                  </div>
                )}
              </div>
              <div>
                <div className="question-field">
                  <div className="question cta">
                    <FcQuestions />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your question"
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                    />
                  </div>
                  <div className="answer">
                    <div className="cta">
                      <FcAnswers />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your option"
                        value={answer1}
                        onChange={(event) => setAnswer1(event.target.value)}
                      />
                    </div>
                    <div className="cta">
                      <FcAnswers />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your option"
                        value={answer2}
                        onChange={(event) => setAnswer2(event.target.value)}
                      />
                    </div>
                    <div className="cta">
                      <FcAnswers />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your option"
                        value={answer3}
                        onChange={(event) => setAnswer3(event.target.value)}
                      />
                    </div>
                    <div className="cta">
                      <FcAnswers />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your option"
                        value={answer4}
                        onChange={(event) => setAnswer4(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="save">
                    <button onClick={onSubmitQuestion}>Save Question</button>
                  </div>
                </div>
              </div>
              <div className="add-and-delete-button">
                <button>
                  <GrAdd color="#ffffff" size={18} /> ADD QUESTION
                </button>
                <button onClick={() => deleteQuiz()}>
                  <AiOutlineMinus color="#ffffff" size={18} /> REMOVE QUESTION
                </button>
                <button onClick={() => navigate("/TakeTest")}>
                  TAKE YOUR TEST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
