// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './Doucette.jpg';
import './App.css';
import Quiz1 from './Quiz1';
import Quiz2 from './Quiz2';

const App = () => {
  const [startQuiz, setStartQuiz] = useState(false);

  const startQuizHandler = () => {
    setStartQuiz(true);
  };

  return (
    <Router>
      <div className="App">
        {startQuiz ? (
          <Routes>
            <Route path="/quiz1" element={<Quiz1 />} />
            <Route path="/quiz2" element={<Quiz2 />} />
          </Routes>
        ) : (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <br></br>
              Welcome to Silly
            </p>
            <Link to="/quiz1" className="App-link" onClick={startQuizHandler}>
              Quiz 1
            </Link>
            <Link to="/quiz2" className="App-link" onClick={startQuizHandler}>
              Quiz 2
            </Link>
          </header>
        )}
      </div>
    </Router>
  );
};

export default App;
