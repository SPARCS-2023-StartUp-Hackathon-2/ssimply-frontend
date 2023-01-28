import "../css/component.scss";
import "../css/common.scss";
import "../css/typography.scss";
import "../css/font.css";

const BigCheckBox = ({ isOn, onClick, isDisable }) => {
    return (
        <div className={
            `big-check-box ${isOn ? "check-box-on" : ""} ${isDisable ? "check-box-disable" : ""}`
        } onClick={onClick}>
            <i className="icon-icon-check"
                style={{
                    fontSize: "25px"
                }}></i>
        </div>
    );
}

const CheckBox = ({ isOn, onClick }) => {
    return (
        <div className={
            `check-box ${isOn ? "check-box-on" : ""}`
        } onClick={onClick}>
            <i className="icon-icon-check"
                style={{
                    fontSize: "12px"
                }}></i>
        </div>
    );
}

const CheckBoxWithLabel = ({ isOn, label, onClick }) => {
    return (
        <div className="row gap-8 center">
            <CheckBox
                isOn={isOn}
                onClick={onClick}
            />
            <span className="body1-500 gray-3">
                {label}
            </span>
        </div>
    );
}

export { BigCheckBox, CheckBox, CheckBoxWithLabel };