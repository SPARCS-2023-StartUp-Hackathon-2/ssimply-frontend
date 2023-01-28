import React from "react";
import "../css/component.scss";

// size: extrasmall(96), small(200), medium(250), large(740)
const Button = (props) => {

    const { label, onClick, isDisable, type, size, addClassName } = props;

    let className = addClassName === undefined ? '' : addClassName;

    switch (type) {
        case undefined:
            className += ' btn-blue ';
            break;
        case '':
            className += ' btn-blue ';
            break;
        case 'blue':
            className += ' btn-blue ';
            break;
        case 'skyblue':
            className += ' btn-skyblue ';
            break;
        case 'blue-6':
            className += ' btn-blue-6 ';
            break;
        case 'tertiary':
            className += ' btn-tertiary ';
            break;
    }

    switch (size) {
        case undefined:
            className += 'size-large ';
            break;
        case 'large':
            className += 'size-large ';
            break;
        case 'medium':
            className += 'size-medium ';
            break;
        case 'small':
            className += 'size-small ';
            break;
        case 'extrasmall':
            className += 'size-extrasmall ';
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