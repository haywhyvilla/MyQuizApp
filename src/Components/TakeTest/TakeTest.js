import React, { useEffect, useState } from "react";
import "./TakeTest.css";

import { Link } from "react-router-dom";
import { db } from "../Config/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const TakeTest = () => {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const questionCollectionRef = collection(db, "question-answer");
  const navigate = useNavigate();

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

  const nextQuestion = () => {
    if (questionList[currQuestion].correct == optionChosen) {
      setScore(score + 1);
    }

    setCurrQuestion(currQuestion + 1);
  };

  const finishQuiz = () => {
    if (questionList[currQuestion].correct == optionChosen) {
      setScore(score + 1);
    }
    setQuizState("endquiz");
  };

  const restartQuiz = () => {
    setScore(0);
    navigate("/Quiz");
  };
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

              <div className="question-field">
                {questionList[0] != undefined && (
                  <div className="question-field">
                    <h1>{questionList[currQuestion].question}?</h1>
                    <div className="options">
                      <button onClick={() => setOptionChosen("1")}>
                        1.{questionList[currQuestion].answer1}
                      </button>
                      <button onClick={() => setOptionChosen("2")}>
                        2.{questionList[currQuestion].answer2}
                      </button>
                      <button onClick={() => setOptionChosen("3")}>
                        3.{questionList[currQuestion].answer3}
                      </button>
                      <button onClick={() => setOptionChosen("4")}>
                        4.{questionList[currQuestion].answer4}
                      </button>
                    </div>
                  </div>
                )}

                {currQuestion == questionList.length - 1 ? (
                  <button className="submit" onClick={finishQuiz}>
                    Finish Quiz
                  </button>
                ) : (
                  <button className="submit" onClick={nextQuestion}>
                    Next Question
                  </button>
                )}
              </div>
              <div className="endscreen">
                <h1>Your Score</h1>
                <h3>
                  {score} / {questionList.length}
                </h3>
                <button className="submit" onClick={restartQuiz}>
                  Restart Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeTest;
