import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './Quiz1.css';

const questionsData = [
  {
    id: 'question1',
    text: "Who is the protagonist of the game Yakuza: Like a Dragon?",
    options: ["Kasuga Ichiban", "Kazuma Ichiban", "Kazuma Kiryu", "Joryu"],
    answer: 'Kasuga Ichiban',
  },
  {
    id: 'question2',
    text: "The album pornography by The Cure came out in which year?",
    options:  ["1980", "1984", "1983", "1982"],
    answer: "1982"
  },
  {
    id: 'question3',
    text:  "In Resident Evil 4, when the villagers hear the church bell in the village fight, what does Leon say?",
    options: ["What is that sound?", "Where's Everyone going? Bingo?", "Must be Dinner Time", "Mind if I join you guys?"], 
    answer: "Where's Everyone going? Bingo?"
  },
  {
    id: 'question4',
    text:  "What language is this code from? std::cout << 100",
    options:  ["Java", "C#", "C", "C++"],
    answer: "C++"
  },
  {
    id: "question5",
    text:  "Which member of The Official Podcast Shit Themselves while rolling down a hill?",
    options: ["Jackson", "Andrew", "Charlie", "Kaya"],
    answer: "Jackson"
  },
  {
    id: "question6",
    text:  "In Lethal Company, how many hits with a shovel does it take to kill a Braken?",
    options: ["3", "4", "5", "6"],
    answer: "5"
  },
  {
    id: "question7",
    text: "What is the protagonist of Dark Souls II Called?",
    options: ["The Bearer of the Curse", "Ashen One", "The Chosen Undead", "Slayer of Demons"],
    answer: "The Bearer of the Curse"
  },
  {
    id: "question8",
    text: "In The TV show Mr. Robot, what is the name of the main character?",
    options: ["Ethan", "Elliot", "Charlie", "Ryan"],
    answer: "Elliot"
  },
  {
    id: "question9",
    text: "What is the special date?",
    options: ["2028-10-13","2024-09-26", "2036-08-12","2026-09-23"],
    answer: "2026-09-23"
  },
  {
    id: "question10",
    text: "What is Brendan's Favourite Flavour of Monster?",
    options:  ["Mango", "White", "Peach", "Green"],
    answer: "Mango"
  }
];

const Quiz1 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    if (showNextQuestion) {
      if (currentQuestionIndex + 1 === questionsData.length) {
        setQuizCompleted(true);
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
      <h1>Quiz 1</h1>
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
        </div>
      )}
    </div>
  );  
};

const Question = ({ id, text, options, selectedOption, onAnswerChange }) => {
  return (
    <div>
      <p>{text}</p>
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

export default Quiz1;
