import React, { useRef } from "react";
import "../css/component.scss";
import "../css/typography.scss";

const TextField = (props) => {
    const { placeholder, title, input, setInput, className, isPassword } = props;

    const inputRef = useRef();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column", textAlign: "start", gap: "4px", width: "100%"
        }}
            {...props}
        >
            {title !== "" && <span className="body1-700">{title}</span>}
            <input className={`text-field ${className}`}
                type={isPassword ? "password" : ""}
                placeholder={placeholder} ref={inputRef}
                defaultValue={input}
                onChange={() => {
                    setInput(inputRef.current.value);
                }}
            ></input>
        </div>
    );
}

export default TextField;

