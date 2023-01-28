import "../css/salary.scss";
import "../css/font.css";
import { useEffect, useState } from "react";
import Button from "../component/Button";
import SalaryPopup from "./SalaryPopup";
import { getSalaryList } from "../api/api";

const SalaryItem = ({ yearMonth, name }) => {

    return (
        <div
            className="row flex-start"
            style={{
                padding: "20px 0"
            }}>
            <span className="heading3-500 black div-center" style={{
                width: "120px",
                height: "60px",
                alignSelf: "center"
            }}>{yearMonth}</span>
            <div className="heading3-700 black salary-item-name" style={{
                width: "370px",
                height: "60px",
                alignSelf: "center",
                textAlign: "start",
            }}
                onClick={() => {
                    //TODO: 인건비 화면으로 이동
                }}
            >
                <span>{name}</span>
                <i className="icon-icon-arrow_right gray-5"></i>
            </div>
        </div>
    );
}

const SalaryPage = () => {

    const [isPopupShown, setIsPopupShown] = useState(false);
    const [isPopupAnimationEnd, setIsPopupAnimationEnd] = useState(false);

    const [salaryList, setSalaryList] = useState([]);

    useEffect(() => {
        //init
        getSalaryList().then((data) => {
            setSalaryList(data["salaries"]);
        });
    }, []);

    return (
        <div className="salary-main column">

            <div style={{
                height: "200px",
                textAlign: "start",
                marginLeft: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <span className="heading1-700 black">인건비</span>
                <br />
                <span className="heading2-700 gray-3">창업 기업의 소속 직원에게 근로계약서 및 지원 사업 참여율에 따라 지급하는 급여입니다.</span>
            </div>

            <div
                className="salary-scroll"
                style={{
                    marginLeft: "50px"
                }}>
                <div className="row flex-start">
                    <span className="heading3-700 black" style={{
                        width: "120px",
                        height: "60px",
                        alignSelf: "center"
                    }}>급여지급일</span>
                    <span className="heading3-700 black" style={{
                        width: "370px",
                        height: "60px",
                        alignSelf: "center"
                    }}>증빙 이름</span>
                </div>

                {
                    salaryList.map((item, index) => <SalaryItem
                        yearMonth={item["yearMonth"]}
                        name={item["name"]}
                    />)
                }

            </div>

            <div
                style={{
                    height: "165px",
                    paddingTop: "15px",
                    paddingRight: "50px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}
            >
                <Button label="추가하기"
                    size="small"
                    onClick={() => {
                        //TODO: 추가하기 팝업
                        setIsPopupShown(true);
                    }}
                />

            </div>

            {/* 100. Pop Up & Background */}
            {
                isPopupShown
                &&
                <div className="popup-background"
                // onClick={()=>{}}
                ></div>
            }

            {
                isPopupShown
                &&
                <SalaryPopup
                    isShown={isPopupShown}
                    setIsShown={setIsPopupShown}
                    isPopupAnimationEnd={isPopupAnimationEnd}
                    setIsPopupAnimationEnd={setIsPopupAnimationEnd}
                    defaultSolution="루그 스튜디오 (모델 컷 생성)"
                />
            }

        </div>
    );
}

export default SalaryPage;