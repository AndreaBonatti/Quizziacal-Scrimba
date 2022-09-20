import React from "react";

export default function Start(props) {
    return (
        <div className="startscreen">
            <h1 className="startscreen--title">Quizzical</h1>
            <h2 className="startscreen--description">Play the super quiz!</h2>
            <button className="start--button" onClick={props.updateGameStatus}>Start quiz</button>
        </div>
    )
}