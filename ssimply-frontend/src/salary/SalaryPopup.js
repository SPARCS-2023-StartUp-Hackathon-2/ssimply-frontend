import React, { useEffect, useState, useRef } from "react";
import "../css/popup.scss";
import Dropdown from "../component/Dropdown";
import Button from "../component/Button";
import TextField from "../component/TextField";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../module/cookies.ts";

const SalaryPopup = ({ isShown, setIsShown, isPopupAnimationEnd, setIsPopupAnimationEnd }) => {

    const [step, setStep] = useState(1);

    //input
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [name, setName] = useState("");

    //dropdown 펴짐/좁혀짐
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const dropdownRef = useRef();
    const [isDropdownClicked2, setIsDropdownClicked2] = useState(false);
    const dropdownRef2 = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        //맨 처음 render시 실행됨
        if (isShown === true) {
            setIsPopupAnimationEnd(true);
        }
    }, []);

    return (
        <div className={`popup ${isPopupAnimationEnd === true ? "show-popup " : " "}`}>

            {
                step === 1
                    ?
                    <div className="column">
                        <span className="heading2-700 black" style={{
                            textAlign: "start"
                        }}>
                            어떤 달의 인건비를 처리할까요?
                        </span>


                        <div className="column gap-4" style={{
                            padding: "58px 0"
                        }}>
                            <div style={{
                                width: "180px"
                            }}>
                                <span className="body1-700 gray-3"
                                    style={{
                                        textAlign: "start"
                                    }}>날짜</span>
                            </div>

                            <div className="row gap-10">
                                <div style={{
                                    width: "175px"
                                }}>
                                    <Dropdown
                                        title=""
                                        labelList={["2023", "2024", "2025", "2026"]}
                                        isClicked={isDropdownClicked}
                                        setIsClicked={setIsDropdownClicked}
                                        select={year}
                                        setSelect={setYear}
                                        ref={dropdownRef}
                                    />
                                </div>
                                <div style={{
                                    width: "175px"
                                }}>
                                    <Dropdown
                                        isScrollable={true}
                                        title=""
                                        labelList={["1월", "2월", "3월", "4월",
                                            "5월", "6월", "7월", "8월",
                                            "9월", "10월", "11월", "12월"]}
                                        isClicked={isDropdownClicked2}
                                        setIsClicked={setIsDropdownClicked2}
                                        select={month}
                                        setSelect={setMonth}
                                        ref={dropdownRef2}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="row gap-14">
                            <Button label="닫기"
                                size="medium"
                                type="skyblue"
                                onClick={() => {
                                    //팝업 닫기
                                    if (setIsPopupAnimationEnd && setIsShown) {
                                        setIsPopupAnimationEnd(false);
                                        setTimeout(function () {
                                            setIsShown(false);
                                        }, 200);//0.2s
                                    }
                                }}
                            />

                            <Button label="다음"
                                size="medium"
                                onClick={() => {
                                    //step 2로 이동
                                    setStep(2);
                                }}
                            />

                        </div>
                    </div>
                    :
                    //step 2
                    <div className="column">
                        <span className="heading2-700 black" style={{
                            textAlign: "start"
                        }}>
                            어떤 달의 인건비를 처리할까요?
                        </span>


                        <div className="column gap-4" style={{
                            padding: "58px 0",
                            width: "360px",
                            alignSelf: "center"
                        }}>
                            <TextField
                                title="증빙 서류의 이름"
                                placeholder="ex) 2023년 1월 정규직 인건비"
                                input={name}
                                setInput={setName}
                            />


                        </div>

                        <div className="row gap-14">
                            <Button label="닫기"
                                size="medium"
                                type="skyblue"
                                onClick={() => {
                                    //팝업 닫기
                                    if (setIsPopupAnimationEnd && setIsShown) {
                                        setIsPopupAnimationEnd(false);
                                        setTimeout(function () {
                                            setIsShown(false);
                                        }, 200);//0.2s
                                    }
                                }}
                            />

                            <Button label="만들기"
                                size="medium"
                                onClick={() => {
                                    //cookie에 저장 후 이동
                                    setCookie("yearMonth", `${year}${month}`);
                                    setCookie("salaryName", name);

                                    navigate("/papersalarycreate");
                                }}
                            />

                        </div>
                    </div>
            }

        </div>
    );
}

export default SalaryPopup;