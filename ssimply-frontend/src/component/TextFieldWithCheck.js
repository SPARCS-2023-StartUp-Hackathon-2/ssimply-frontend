import React, { useRef } from "react";
import "../css/component.scss";
import "../css/typography.scss";
import { CheckBox, CheckBoxWithLabel } from "./CheckBox";

const TextFieldWithCheck = (props) => {
    const { placeholder, title, input, setInput, className,
        checkList, checkFuncList, checkBoolList
    } = props;

    const inputRef = useRef();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column", textAlign: "start", gap: "4px", width: "100%"
        }}
            {...props}
        >
            <div className="row space-between">
                <span className="body1-700">{title}</span>
                <div className="row gap-10">
                    {
                        checkList.map((item, index) => (
                            <CheckBoxWithLabel
                                isOn={checkBoolList[index]}
                                label={item}
                                onClick={checkFuncList[index]}
                            />
                        ))
                    }

                </div>
            </div>
            <input className={`text-field ${className}`}
                placeholder={placeholder} ref={inputRef}
                defaultValue={input}
                onChange={() => {
                    setInput(inputRef.current.value);
                }}
            ></input>
        </div>
    );
}

export default TextFieldWithCheck;

