import React from "react";
import "../css/component.scss";

// btn-primary
// icon: none, left, right
// size: small, medium, large
// type: primary, primary2, secondary, tertiary, white, danger
const Button = (props) => {

    const { label, onClick, isDisable, type } = props;

    let className = '';

    switch (type) {
        case undefined:
            className = 'btn-blue ';
            break;
        case '':
            className = 'btn-blue ';
            break;
        case 'blue':
            className = 'btn-blue ';
            break;
        case 'skyblue':
            className = 'btn-skyblue ';
            break;
    }

    return (
        <button onClick={onClick} className={
            `${className} ${isDisable === true ? "btn-blue-disable" : ""}`
        } {...props}>
            {label}
        </button>
    );
}

export default Button;