import React, { useState } from 'react';

export default function Questionnaire() {
    const questions = [
        {
            questionText: 'Are you feeling healthy and well today?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: true },
                { answerText: 'No', isCorrect: false },
            ],
        },
        {
            questionText: 'Are you currently taking an antibiotic?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: false },
                { answerText: 'No', isCorrect: true },
            ],
        },
        {
            questionText: 'Are you currently taking any other medications for infection?',
            answerOptions: [
                { answer: 'Yes', isCorrect: false },
                { answer: 'No', isCorrect: true },
            ],
        },
        {
            questionText: 'Are you pregnant?',
            answerOptions: [
                { answer: 'Yes', isCorrect: false },
                { answer: 'No', isCorrect: true },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [eligible, setEligible] = useState("eligible");



    const handleAnswerOptionClick = (isCorrect) => {
        if (!isCorrect) {
            setShowScore(true);
            setEligible("not eligible")
        };

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You are {eligible} to donate at this time.
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}