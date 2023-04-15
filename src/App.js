import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";
import Quiz from "./Components/Quiz/Quiz";
import TakeTake from "./Components/TakeTest/TakeTest";
import { useState } from "react";

function App() {

  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/Form" Component={Form} />
        <Route path="/Quiz" Component={Quiz} />
        <Route path="/TakeTest" Component={TakeTake} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
