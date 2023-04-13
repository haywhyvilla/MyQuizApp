import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="section-home">
        <div className="header-flex">
          <h1>MyQuizApp</h1>
          <Link to="/Form">Create your quiz</Link>
        </div>
        <div className="text">
          <h2>Easy online quiz maker: beautiful quizzes in minutes</h2>
          <p>
            Quizzes are a powerful tool for engagement, and wildly underrated
            for bringing in <br />
            more customers. Take yours quiz by clicking the button below.
          </p>
          <Link to="/Form">Create your quiz</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
