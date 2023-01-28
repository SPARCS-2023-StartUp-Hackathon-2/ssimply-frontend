import React, { forwardRef } from "react";
import '../css/component.scss'
// import '../css/dropdown.scss';

const Dropdown = forwardRef((props, ref) => {
    const { title, isScrollable, labelList, isClicked, setIsClicked,
        select, setSelect } = props;

    return (
        <div
            style={{
                display: "flex", flexDirection: "column",
                textAlign: "start", gap: "4px",
                width: "100%"
            }}
            ref={ref}
        // {...props}
        >
            {title !== "" && <span className="body1-700">{title}</span>}

            <div className="dropdown">
                <button onClick={
                    () => {
                        setIsClicked(!isClicked);
                    }}
                    className={
                        `${select === "" || select === undefined ? "gray-7" : "gray-3"}
                        ${isClicked === true ? " clicked-dropdown-btn" : " "}`
                    }
                    style={{ width: "100%" }}
                >
                    {select === "" || select === undefined ? "선택하기" : select}
                    <i className={isClicked === true ? "icon-icon-arrow_up" : "icon-icon-arrow_down"} style={{ fontSize: "16px" }} />
                </button>

                <div
                    className={`dropdown-options 
                    ${isScrollable === true ? "dropdown-scrollable " : " "}
                    ${isClicked === true ? "clicked-dropdown-options " : " "}
                    `}
                >

                    {labelList.map((item) => <DropDownItem label={item}
                        selectedLabel={select}
                        setSelectedLabel={setSelect}
                        setIsClicked={setIsClicked}></DropDownItem>)}
                </div>

            </div>
        </div>
    );
})

Dropdown.defaultProps = {
    labelList: []
}

const DropDownItem = (props) => {

    const { label, selectedLabel, setSelectedLabel, setIsClicked } = props;

    return (
        <button className={`dropdown-item-btn 
        ${label === selectedLabel ? " selected-dropdown-item-btn" : " "}`}
            onClick={() => {
                setSelectedLabel(label);
                setIsClicked(false);
            }}
            style={{ width: "100%" }}
        >{label}</button>
    );
}

export default Dropdown;