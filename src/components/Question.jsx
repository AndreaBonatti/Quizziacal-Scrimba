import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid"
import Answer from "./Answer";
import parse from 'html-react-parser';

export default function Question(props) {

    function createAnswersData() {
        const answersData = []
        props.answers.map(answer => {
            answersData.push(
                {
                    key: nanoid(),
                    value: parse(answer),
                    isSelected: false
                }
            )
        })
        return answersData
    }

    const [answers, setAnswers] = useState(createAnswersData())

    function setSelected(key) {
        setAnswers(oldAnswers => oldAnswers.map(answer => {
            return answer.key === key ?
                { ...answer, isSelected: true } :
                { ...answer, isSelected: false }
        }))
    }

    // Every time we select an answer we need to update the question status
    useEffect(() => {
        answers.map(answer => {
            if (answer.isSelected) { props.updateQuestionStatus(props.question, answer.value) }
        })
    }, [answers])

    const answersElements = answers.map(answer => (
        <Answer
            key={answer.key}
            value={answer.value}
            isSelected={answer.isSelected}
            setSelected={() => setSelected(answer.key)}
        />
    ))

    return (
        <div className="question">
            <h1 className="question--value">{props.question}</h1>
            <div className="question--answers">
                {answersElements}
            </div>
            <hr></hr>
        </div>
    )
}