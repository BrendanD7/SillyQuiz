import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Quiz1.css';

const questionsData = [
  {
    id: 'question1',
    text: "What is the name of the serial killer in the Like a Dragon spinoff Judgement?",
    options: ["The Eyeless", "The Snake", "The Mole", "The Rat"],
    answer: 'The Mole',
  },
  {
    id: 'question2',
    text: "Which is an example of a staged model of software development?",
    options:  ["Waterfall", "Lean", "Scrum", "Agile"],
    answer: "Waterfall"
  },
  {
    id: 'question3',
    text:  "Which computer component is a Sata Cable used for?",
    options: ["Power Supply", "Graphics Card", "RAM", "Solid State Drive"], 
    answer: "Solid State Drive"
  },
  {
    id: 'question4',
    text:  "Which is an example of a scripting language?",
    options:  ["Java", "Python", "C", "Assembly"],
    answer: "Python"
  },
  {
    id: "question5",
    text:  "Which game did Billy Mitchell not cheat a record in?",
    options: ["Pac-Man", "Donkey Kong", "Dragster", "Burgertime"],
    answer: "Dragster"
  },
  {
    id: "question6",
    text:  "In Counter Strike, how much does an M4A1-S Cost?",
    options: ["2800", "2900", "3000", "3100"],
    answer: "2900"
  },
  {
    id: "question7",
    text: "Who's this guy",
    options: ["Shun Akiyama", "Kasuga Ichiban", "Saejima Taega", "Takayuki Yagami"],
    answer: "Shun Akiyama"
  },
  {
    id: "question8",
    text: "Coolest Spiderman Villain",
    options: ["Kingpin", "Big Wheel", "Venom", "The Green Goblin"],
    answer: "Big Wheel"
  },
  {
    id: "question9",
    text: "What Twin Tribes album features the song Avalon",
    options: ["Ceremony", "Shadows", "Pendulum", "Altars"],
    answer: "Ceremony"
  },
  {
    id: "question10",
    text: "What is Brendan's Sodie",
    options:  ["Orange Fanta", "Dr. Pepper", "Pepsi", "MUG"],
    answer: "Dr. Pepper"
  }
];

const Quiz2 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(true);

  useEffect(() => {
    if (showNextQuestion) {
      if (currentQuestionIndex + 1 === questionsData.length) {
        setQuizCompleted(true);
        setShowQuiz(false);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setShowNextQuestion(false);
      }
    }
  }, [showNextQuestion, currentQuestionIndex]);

  const handleAnswerChange = (selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionsData[currentQuestionIndex].id]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion.id];
  
    if (selectedAnswer === currentQuestion.answer) {
      let audio = new Audio(process.env.PUBLIC_URL + "/Correct.ogg");
      audio.play();
      setShowConfetti(true);
      setFinalScore((prevScore) => prevScore + 1);
      alert('Correct!');
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } else {
      let audio = new Audio(process.env.PUBLIC_URL + "/Wrong.ogg");
      audio.play();
      alert(`Wrong! The correct answer is: ${currentQuestion.answer}`);
    }
    setShowNextQuestion(true);
  };


  return (
    <div className="Quiz1">
      <h1>Quiz 2</h1>
      {showConfetti && <Confetti />}
      {!quizCompleted && currentQuestionIndex < questionsData.length && (
        <form>
          <Question
            id={questionsData[currentQuestionIndex].id}
            text={questionsData[currentQuestionIndex].text}
            options={questionsData[currentQuestionIndex].options}
            selectedOption={answers[questionsData[currentQuestionIndex].id]}
            onAnswerChange={handleAnswerChange}
          />
          {showNextQuestion && (
            <button type="button" onClick={handleSubmit} disabled={!answers[questionsData[currentQuestionIndex].id]}>
              {currentQuestionIndex + 1 === questionsData.length
                ? 'View Final Score'
                : 'Next Question'}
            </button>
          )}
          {!showNextQuestion && (
            <button type="button" onClick={handleSubmit} disabled={!answers[questionsData[currentQuestionIndex].id]}>
              Submit Answer
            </button>
          )}
        </form>
      )}
      {quizCompleted && (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Final Score: {finalScore} / {questionsData.length}</p>
          <img src={process.env.PUBLIC_URL + "/Billy.jpg"}/>
          <br></br>
          <button onClick={() => window.location.href = '/'}>Go to Homepage</button>
        </div>
      )}
    </div>
  );  
};

const Question = ({ id, text, options, selectedOption, onAnswerChange }) => {
  return (
    <div>
      <p>{text}</p>
      {id === 'question7' && <img src={process.env.PUBLIC_URL + "/Aki.jpg"}/>}
      <hr></hr>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={id}
            value={option}
            checked={selectedOption === option}
            onChange={() => onAnswerChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Quiz2;
