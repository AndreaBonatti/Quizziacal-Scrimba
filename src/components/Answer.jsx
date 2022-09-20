import React from "react";

export default function Answer(props) {
    const styles = {
        minWidth: "60px",
        borderRadius: "8px",
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: "10.24px",
        lineHeight: "12px",
        textAlign: "center",
        color: "#293264",
        margin: 0,
        padding: "4px",
        backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB",
        border: props.isSelected ? "none" : "0.8px solid #4D5B9E" 
    }

    return (
        <button
            className="answer--button"
            id={props.id}
            onClick={props.setSelected}
            style={styles}
        >
            {props.value}
        </button>
    )
}