import React, { useEffect, useState } from "react";
import "./TakeTest.css";

import { Link } from "react-router-dom";
import { FcAnswers, FcQuestions } from "react-icons/fc";
import { db } from "../Config/FirebaseConfig";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const TakeTest = () => {
  const [questionList, setQuestionList] = useState([]);
  const questionCollectionRef = collection(db, "question-answer");

  const getQuestionList = async () => {
    try {
      const data = await getDocs(questionCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setQuestionList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getQuestionList();
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
              <h2>Quiz Questions</h2>

              {questionList.map((question) => (
                <div className="question-field">
                  <h1>{question.question}?</h1>
                  <div className="options">
                    <p>1.{question.answer1}</p>
                    <p>2.{question.answer2}</p>
                    <p>3.{question.answer3}</p>
                    <p>4.{question.answer4}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeTest;
