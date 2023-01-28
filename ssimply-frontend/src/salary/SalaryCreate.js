import "../css/salary.scss";
import Button from "../component/Button";
import { useState } from "react";
import { BigCheckBox } from "../component/CheckBox";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

const SalaryCreatePage = () => {

    //toast
    const errorToastDom = useToast("danger", '필요 서류를 제출하지 않은 직원은 인건비 서류를 생성할 수 없습니다.',
        "닫기", () => { });

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [employeeList, setEmployeeList] = useState([
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "정규직", // 고용 형태
            "submitted": false, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        },
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee2", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "정규직", // 고용 형태
            "submitted": true, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        },
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee2", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "계약직", // 고용 형태
            "submitted": true, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        },
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee2", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "계약직", // 고용 형태
            "submitted": true, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        },
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee2", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "계약직", // 고용 형태
            "submitted": true, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        },
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee3", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "계약직", // 고용 형태
            "submitted": true, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        },
        {
            "id": "1", // 직원 아이디
            "employeeNum": "1", // 직원 사원 번호
            "name": "minhee3", // 직원 이름
            "email": "minheekim3@naver.com", // 직원 이메일
            "enteredAt": "23.1.1", // 직원 입사 날짜
            "position": "신", // 직원 직책
            "type": "계약직", // 고용 형태
            "submitted": true, // 필요 서류 제출 여부
            "clicked": false, // 앞에 체크표시
        }
    ]);

    return (
        <div className="salary-main column">
            <div
                className="column gap-12"
                style={{
                    height: "200px",
                    textAlign: "start",
                    marginLeft: "80px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                <div className="row gap-5 flex-start">
                    <i className="gray-5 icon-icon-arrow_left" style={{
                        fontSize: "35px",
                        cursor: "pointer"
                    }}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <span className="heading2-700 black">인건비를 신청할 직원을 선택해주세요.</span>
                </div>
                <span className="heading3-500 gray-3" style={{
                    marginLeft: "35px"
                }}>생성 중인 증빙 : 2023년 8월 정규직 인건비</span>
            </div>

            <div className="column" style={{
                marginLeft: "50px"
            }}>
                <div className="row flex-start gap-10"
                    style={{
                        marginBottom: "20px"
                    }}>
                    <Button label="정규직 선택"
                        type="blue-6"
                        size="extrasmall"
                        onClick={() => {
                            //TODO: 보이는 정규직 선택
                            const newEmployeeList = employeeList.map((item, i) => {
                                if (item["type"] === "정규직" && item["submitted"]) {
                                    return {
                                        ...item,
                                        "clicked": true
                                    };
                                }
                                return {
                                    ...item,
                                    "clicked": false
                                };
                            })
                            setEmployeeList(newEmployeeList);
                        }}
                    />

                    <Button label="계약직 선택"
                        type="tertiary"
                        size="extrasmall"
                        onClick={() => {
                            //TODO: 보이는 계약직 선택
                            const newEmployeeList = employeeList.map((item, i) => {
                                if (item["type"] === "계약직" && item["submitted"]) {
                                    return {
                                        ...item,
                                        "clicked": true
                                    };
                                }
                                return {
                                    ...item,
                                    "clicked": false
                                };
                            })
                            setEmployeeList(newEmployeeList);
                        }}
                    />

                </div>


                <div className="column salary-scroll" style={{
                    paddingTop: "180px"
                }}>
                    <div className="row flex-start heading3-700 black center"
                        style={{
                            padding: "15px 15px",
                            // height: "60px"
                        }}
                    >
                        <div style={{ width: "65px" }}></div>
                        <div style={{ width: "150px" }}>이름</div>
                        <div style={{ width: "150px" }}>고용 형태</div>
                        <div style={{ width: "150px" }}>직책</div>
                        <div style={{ width: "150px" }}>입사일</div>
                        <div style={{ width: "150px" }}>제출 여부</div>
                    </div>

                    {
                        employeeList.map((item, index) =>
                            <div className="row flex-start heading3-500 black center"
                                style={{
                                    padding: "15px 15px",
                                    // height: "60px"
                                }}>
                                {/* TODO: checkbox */}
                                <div style={{ width: "65px" }}>
                                    <BigCheckBox
                                        isOn={item["clicked"]}
                                        isDisable={!item["submitted"]}
                                        onClick={() => {
                                            if (!item["submitted"]) {
                                                //TODO: 미제출이라면 에러 토스트 띄우기
                                                errorToastDom.showToast();
                                                return;
                                            }
                                            const newEmployeeList = employeeList.map((item, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...item,
                                                        "clicked": !item["clicked"]
                                                    };
                                                }
                                                return item;
                                            })
                                            setEmployeeList(newEmployeeList);
                                        }}
                                    />
                                </div>
                                <div style={{ width: "150px" }}>{item["name"]}</div>
                                <div style={{ width: "150px" }}>{item["type"]}</div>
                                <div style={{ width: "150px" }}>{item["position"]}</div>
                                <div style={{ width: "150px" }}>{item["enteredAt"]}</div>
                                <div
                                    className={item["submitted"] ? "black" : "red-5"}
                                    style={{
                                        width: "150px"
                                    }}>
                                    {item["submitted"]
                                        ?
                                        "제출" : "미제출"
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>


                <div
                    className="row space-between"
                    style={{
                        height: "165px",
                        textAlign: "start",
                        paddingTop: "35px",
                        alignItems: "flex-start"
                    }}>
                    <span className="body2-700 gray-3">*정규직, 계약직 인건비는 창업진흥원 시스템에 따로 등록되어있으니, 정규직과 계약직의 증빙은 따로 신청해주세요</span>

                    <Button label="다음"
                        size="small"
                        onClick={() => {
                            //다음 step으로 이동
                            setStep(2);
                        }}
                    />
                </div>

            </div>
        </div>
    );
}

export default SalaryCreatePage;