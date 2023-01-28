import React, { useRef } from "react";
import "../css/component.scss";
import "../css/typography.scss";

const TextArea = (props) => {
    const { placeholder, title, input, setInput, className } = props;

    const inputRef = useRef();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column", textAlign: "start", gap: "4px", width: "100%"
        }}
            {...props}
        >
            {title !== "" && <span className="body1-700">{title}</span>}
            <textarea className={`text-field ${className}`}
                placeholder={placeholder} ref={inputRef}
                defaultValue={input}
                onChange={() => {
                    setInput(inputRef.current.value);
                }}

            ></textarea>
        </div>
    );
}

export default TextArea;