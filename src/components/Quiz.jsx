import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from "nanoid"
import parse from 'html-react-parser';

export default function Quiz(props) {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=22&type=multiple")
            const data = await res.json()
            if (data.response_code === 0) {
                setQuestions(createQuestionsData(data.results))
            }
        }
        getData()
    }, [])

    function createQuestionsData(input) {
        const questionsData = input.map(result => {
            let cleanedAnswers = shuffleList([...result.incorrect_answers, result.correct_answer])
            for (let ans in cleanedAnswers) {
                ans = parse(ans)
            }
            return {
                key: nanoid(),
                type: result.type,
                question: parse(result.question),
                correctAnswer: parse(result.correct_answer),
                answers: cleanedAnswers,
                isGuessed: false
            }
        })
        return questionsData
    }

    function shuffleList(list) {
        return list.sort(() => Math.random() - 0.5)
    }

    const questionsElements = questions.map((question => (
        <Question
            key={question.key}
            type={question.type}
            question={question.question}
            correct_answer={question.correct_answer}
            answers={question.answers}
            isGuessed={question.isGuessed}
            updateQuestionStatus={updateQuestionStatus}
        />
    )))

    function updateQuestionStatus(selectedQuestion, selectedAnswerValue) {
        setQuestions(oldQuestions => oldQuestions.map(question => {
            if (question.question === selectedQuestion) {
                let isGuessed = false
                question.answers.map(answer => {
                    if (answer === selectedAnswerValue) {
                        console.log(answer)
                        if (question.correctAnswer === selectedAnswerValue) {
                            console.log("Correct answer")
                            isGuessed = true
                        } else {
                            console.log("Wrong answer")
                        }
                    }
                })
                return { ...question, isGuessed: isGuessed }
            } else {
                return question
            }
        }))
    }

    function checkAnswers() {
        let youWin = true
        questions.map(question => {
            if (question.isGuessed === false) { youWin = false }
        })
        if (youWin) {
            console.log("Congratulations, you win the game!!!")
            alert("Congratulations, you win the game!!!")
            props.updateGameStatus()
        }
    }

    return (
        <div className="quizscreen">
            <div className="questions--container">
                {questionsElements}
            </div>
            <button className="checkanswers--button" onClick={checkAnswers}>Check answers</button>
        </div>
    )
}