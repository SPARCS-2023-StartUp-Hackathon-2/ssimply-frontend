import "../css/common.scss";
import "../css/login.scss";
import TextField from "../component/TextField";
import TextFieldWithCheck from "../component/TextFieldWithCheck";
import Button from "../component/Button";
import Dropdown from "../component/Dropdown";
import EmployeeInput from "../component/EmployeeInput";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { getCookie } from "../module/cookies.ts";
import { createCompany, getSupportProgramList } from "../api/api";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../api/api";


const OnBoardingPage = () => {
    const [step, setStep] = useState(1);//1,2

    const [supportProgramList, setSupportProgramList] = useState([]);

    useEffect(() => {
        //init
        getSupportProgramList().then((data) => {
            setSupportProgramList(data);
        });
    }, []);

    const errorToastDom = useToast("danger", '오류가 발생했어요.',
        "닫기", () => { });

    const navigate = useNavigate();


    //step 1
    const [newCompany, setNewCompany] = useState("");
    const [newCompanyType, setNewCompanyType] = useState("");
    const [repName, setRepName] = useState("");
    const [repItem, setRepItem] = useState("");
    const [govBiz, setGovBiz] = useState("");
    const [govBizId, setGovBixId] = useState();

    //dropdown 펴짐/좁혀짐
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const dropdownRef = useRef();

    //step 2
    const [employeeList, setEmployeeList] = useState([
        {
            "num": "",
            "name": "",
            "level": "",
            "email": "",
            "date": "",
            "contract": ""
        }
    ]);

    useEffect(() => {
        //init
        //cookie 사용
        const cookieCompany = getCookie("company");
        const cookieCompanyType = getCookie("companyType");
        const cookieRepName = getCookie("name");
        setNewCompany(cookieCompany);
        setNewCompanyType(cookieCompanyType);
        setRepName(cookieRepName);
    }, []);

    return (
        <div className="column center custom-box">
            <div className="column gap-30" style={{
                height: "240px"
            }}>
                <img src="logo.svg" height="27px" />
                {
                    step === 1 ?
                        <span className="heading2-700 gray-3">
                            씸플리에서 자동으로 회사 정보를 가져 올 수 있도록<br />기본 회사 정보를 입력해주세요.
                        </span>
                        :
                        <span className="heading2-700 gray-3">
                            씸플리에서 직원분들께 필요 서류를 요청할 수 있도록
                            <br />
                            직원 정보를 입력해주세요.
                        </span>
                }
            </div>

            <div className="column space-between" style={{
                height: "519px",
                width: "100%"
            }}>
                {
                    step === 1
                    &&
                    <div className="column gap-20" style={{
                        height: "427.5px",
                        width: "360px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        alignSelf: "center"
                    }}>
                        <TextFieldWithCheck
                            title="회사명*"
                            placeholder="(주)씸플리"
                            input={newCompany}
                            setInput={setNewCompany}
                            checkList={["예비", "법인", "개인"]}
                            checkFuncList={[
                                () => {
                                    setNewCompanyType("예비");
                                },
                                () => {
                                    setNewCompanyType("법인");
                                },
                                () => {
                                    setNewCompanyType("개인");
                                }
                            ]}
                            checkBoolList={[
                                newCompanyType === "예비",
                                newCompanyType === "법인",
                                newCompanyType === "개인"
                            ]}
                        />

                        <TextField
                            title="대표자명*"
                            placeholder="홍길동"
                            input={repName}
                            setInput={setRepName}
                        />
                        <TextField
                            title="사업 아이템명*"
                            placeholder="홍길동"
                            input={repItem}
                            setInput={setRepItem}
                        />
                        <Dropdown
                            title="참여중인 정부지원사업*"
                            labelList={supportProgramList.map((item) => item["name"])}
                            idList={supportProgramList.map((item) => item["id"])}
                            isClicked={isDropdownClicked}
                            setIsClicked={setIsDropdownClicked}
                            select={govBiz}
                            setSelect={(text, index) => {
                                setGovBiz(text);
                                setGovBixId(index);
                            }}
                            ref={dropdownRef}
                        />
                    </div>

                }
                {
                    step === 2
                    &&
                    <div style={{
                        //for overflowX scroll
                        width: "100vw",
                        overflowX: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div className="column gap-20 flex-start" style={{
                            height: "417px",//422 - scroll 5
                            width: "fit-content"
                        }}>
                            <div className="row body1-700 gray-3 gap-20"
                                style={{
                                    textAlign: "start",
                                    marginTop: "10px"
                                }}>
                                <span style={{ width: "80px" }} className="padding-left-5">
                                    사원번호</span>
                                <span style={{ width: "180px" }} className="padding-left-5">
                                    이름</span>
                                <span style={{ width: "180px" }} className="padding-left-5">
                                    직책</span>
                                <span style={{ width: "250px" }} className="padding-left-5">
                                    이메일</span>
                                <span style={{ width: "180px" }} className="padding-left-5">
                                    입사일</span>
                                <span style={{ width: "123px" }} className="padding-left-5">
                                    계약</span>
                                <span style={{ width: "48px", color: "transparent" }}>s</span>
                            </div>

                            <div className="column">
                                {
                                    employeeList.map((item, index) => (
                                        <EmployeeInput
                                            key={index}
                                            empNum={item["num"]}
                                            setEmpNum={(text) => {
                                                const newEmployeeList = employeeList.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            "num": text
                                                        };
                                                    }
                                                    return item;
                                                })
                                                setEmployeeList(newEmployeeList);
                                            }}
                                            empName={item["name"]}
                                            setEmpName={(text) => {
                                                const newEmployeeList = employeeList.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            "name": text
                                                        };
                                                    }
                                                    return item;
                                                })
                                                setEmployeeList(newEmployeeList);
                                            }}
                                            empLevel={item["level"]}
                                            setEmpLevel={(text) => {
                                                const newEmployeeList = employeeList.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            "level": text
                                                        };
                                                    }
                                                    return item;
                                                })
                                                setEmployeeList(newEmployeeList);
                                            }}
                                            empEmail={item["email"]}
                                            setEmpEmail={(text) => {
                                                const newEmployeeList = employeeList.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            "email": text
                                                        };
                                                    }
                                                    return item;
                                                })
                                                setEmployeeList(newEmployeeList);
                                            }}
                                            empDate={item["date"]}
                                            setEmpDate={(text) => {
                                                const newEmployeeList = employeeList.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            "date": text
                                                        };
                                                    }
                                                    return item;
                                                })
                                                setEmployeeList(newEmployeeList);
                                            }}
                                            empContract={item["contract"]}
                                            setEmpContract={(text) => {
                                                const newEmployeeList = employeeList.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            "contract": text
                                                        };
                                                    }
                                                    return item;
                                                })
                                                setEmployeeList(newEmployeeList);
                                            }}
                                            onDelete={() => {
                                                //index번째 삭제
                                                setEmployeeList(
                                                    [employeeList.slice(0, index),
                                                    ...employeeList.slice(index + 1)]);
                                            }}
                                        />
                                    ))
                                }
                                <div className="click row gap-15 center padding-15"
                                    style={{
                                        marginTop: "30px",
                                        width: "fit-content",
                                        alignSelf: "center"
                                    }}
                                    onClick={
                                        () => {
                                            setEmployeeList([...employeeList,
                                            {
                                                "num": "",
                                                "name": "",
                                                "level": "",
                                                "email": "",
                                                "date": "",
                                                "contract": ""
                                            }
                                            ]);
                                        }
                                    }
                                >
                                    <img src="icon/plus_icon.svg" width="36px" height="36px" />
                                    <span className="heading2-700 gray-6">추가하기</span>
                                </div>
                            </div>


                        </div>
                    </div>
                }


                <div className="column gap-20">
                    {
                        step === 1
                            ?
                            <Button label={
                                "다음"
                            }
                                addClassName="btn-center"
                                onClick={() => {
                                    setStep(2);
                                    return;

                                    // enum('PRE', 'INDIVIDUAL', 'COPERATION')
                                    let type = '';
                                    switch (newCompanyType) {
                                        case "예비":
                                            type = 'PRE';
                                            break;
                                        case "법인":
                                            type = 'INDIVIDUAL';
                                            break;
                                        case "개인":
                                            type = 'COPERATION';
                                            break;
                                    }
                                    let supportProgramIds = [];
                                    if (govBizId !== undefined) {
                                        supportProgramIds.push(govBizId);
                                    }
                                    createCompany(newCompany,
                                        type,
                                        repItem, supportProgramIds)
                                        .then(() => {
                                            setStep(2);
                                        })
                                        .catch((e) => {
                                            //에러메시지
                                            errorToastDom.showToast();
                                        });
                                }}
                            //TODO: 주석 해제
                            // isDisable={!(newCompany.length >= 1 && repName.length >= 1 && repItem.length >= 1 && govBiz.length >= 1)}
                            />
                            :
                            //step 2
                            <div className="row gap-20">
                                <div className="column gap-10">
                                    <span className="caption-700 transparent"> secondary </span>
                                    <Button label={
                                        "건너뛰기"
                                    }
                                        type="skyblue"
                                        onClick={() => {
                                            navigate("/papersalary");
                                        }}
                                    />
                                </div>

                                <div className="column gap-10">
                                    <span className="caption-700 gray-3">
                                        * 완료 버튼을 누르면 직원들에게 이메일이 전송됩니다.</span>
                                    <Button label={
                                        "완료"
                                    }
                                        onClick={() => {
                                            employeeList.map((item) => {
                                                let type = "";
                                                switch (item["contract"]) {
                                                    case "정규직":
                                                        type = 'PERMANENT';
                                                        break;
                                                    case "계약직":
                                                        type = 'TEMPORARY';
                                                        break;
                                                }
                                                let time = item["date"].slice(0, 5) + "-" + item["date"].slice(5, 7) + "-" + item["date"].slice(7);
                                                let timeStamp = Date.parse(time);
                                                let dateTime = new Date(timeStamp);
                                                createEmployee(item["name"],
                                                    item["level"],
                                                    type,
                                                    item["email"],
                                                    dateTime)
                                                    .then(() => {
                                                        navigate("/papersalary");
                                                    })
                                                    .catch(() => {
                                                        errorToastDom.showToast();
                                                    });
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                    }

                </div>
            </div>

            {
                step === 2
                &&
                <div className="custom-footer">
                    <span className="body2-700 gray-3">
                        *대표님을 제외한 임직원분들의 사원번호는 2번 부터 시작합니다.
                        <br />
                        *작성하신 직원의 이메일로 지원사업에 필요한 정보를 요청하는 이메일이 발송됩니다.
                        <br />
                        *요청 정보 : 신분증, 통장사본, 4대보험가입확인서, 이력서, 근로소득원천징수영수
                    </span>
                </div>
            }


        </div >
    );
}

export default OnBoardingPage;