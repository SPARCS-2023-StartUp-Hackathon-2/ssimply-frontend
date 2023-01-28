import "../css/component.scss";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import { useState, useRef } from "react";

const EmployeeInput = ({
    key,
    empNum,
    setEmpNum,
    empName,
    setEmpName,
    empLevel,
    setEmpLevel,
    empEmail,
    setEmpEmail,
    empDate,
    setEmpDate,
    empContract,
    setEmpContract,
    onDelete
}) => {

    //dropdown 펴짐/좁혀짐
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const dropdownRef = useRef();

    return (
        <div className="row gap-20 center" key={key}>
            <div style={{ width: "80px" }}>
                <TextField
                    placeholder="2"
                    input={empNum}
                    setInput={setEmpNum}
                />
            </div>
            <div style={{ width: "180px" }}>
                <TextField
                    placeholder="홍길동"
                    input={empName}
                    setInput={setEmpName}
                />
            </div>
            <div style={{ width: "180px" }}>
                <TextField
                    placeholder="예)팀장"
                    input={empLevel}
                    setInput={setEmpLevel}
                />
            </div>
            <div style={{ width: "250px" }}>
                <TextField
                    placeholder="report@ssimply.io"
                    input={empEmail}
                    setInput={setEmpEmail}
                />
            </div>
            <div style={{ width: "180px" }}>
                <TextField
                    placeholder="20220602"
                    input={empDate}
                    setInput={setEmpDate}
                />
            </div>
            <div style={{ width: "123px" }}>
                <Dropdown
                    title=""
                    labelList={["정규직", "계약직"]}
                    isClicked={isDropdownClicked}
                    setIsClicked={setIsDropdownClicked}
                    select={empContract}
                    setSelect={setEmpContract}
                    ref={dropdownRef}
                />
            </div>
            <div
                className="click body1-700 gray-3"
                style={{ width: "48px" }}
                onClick={onDelete}
            >
                삭제
            </div>
        </div>
    );
}

export default EmployeeInput;