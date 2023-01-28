import "../css/common.scss";
import "../css/login.scss";
import TextField from "../component/TextField";
import TextFieldWithCheck from "../component/TextFieldWithCheck";
import Button from "../component/Button";
import { useState } from "react";
import { Fragment } from "react";
import { setCookie } from "../module/cookies.ts";
import { useNavigate } from "react-router-dom";
import { createUser, login } from "../api/api";
import { useToast } from "../hooks/useToast";


const SignUpPage = () => {

    const errorToastDom = useToast("danger", '입력정보를 다시 확인해주세요.',
        "닫기", () => { });

    const successToastDom = useToast("success", '잠시만 기다려주세요.',
        "닫기", () => { });

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const pattern1 = /[0-9]/;				// 숫자
    const pattern2 = /[a-zA-Z]/;			// 문자
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자

    //step 1
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [valid, setValid] = useState(true);

    //step 2
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [companyType, setCompanyType] = useState("");//예비, 법인, 개인
    const [level, setLevel] = useState("");

    return (
        <div className="column center custom-box">
            <div className="column gap-30" style={{
                height: "240px"
            }}>
                <img src="logo.svg" height="27px" />
                <span className="heading2-700 gray-3">
                    {
                        step === 1 ?
                            "로그인 시 이용할 정보를 입력해주세요." :
                            "서류 담당자님의 정보를 알려주세요."
                    }
                </span>
            </div>

            <div className="column space-between" style={{
                height: "519px",
                width: "360px"
            }}>
                {
                    step === 1
                        ?
                        <div className="column gap-20" style={{
                            height: "349.5px",
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}>
                            <TextField
                                placeholder="report@ssimply.io"
                                title="이메일*"
                                input={email}
                                setInput={setEmail}
                            />
                            <TextField
                                placeholder="6글자 이상, 특수문자와 영,숫자 포함"
                                title="비밀번호*"
                                input={password}
                                setInput={setPassword}
                                isPassword={true}
                            />
                            <div className="column gap-10" style={{
                                width: "100%"
                            }}>
                                <TextField
                                    placeholder="비밀번호를 한 번 더 입력해주세요."
                                    title="비밀번호 확인*"
                                    input={password2}
                                    setInput={setPassword2}
                                    isPassword={true}
                                />
                                <span
                                    className="caption-700 red-5"
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "22.5px"
                                    }}
                                >{
                                        valid ?
                                            "" : "*비밀번호를 다시 확인해주세요."
                                    }
                                </span>
                            </div>
                        </div>
                        :
                        <Fragment />
                }
                {
                    step === 2 ?
                        <div className="column gap-20 flex-start" style={{
                            height: "323.5px",
                        }}>
                            <TextField
                                placeholder="홍길동"
                                title="성함*"
                                input={name}
                                setInput={setName}
                            />
                            <div className="column gap-10">
                                <TextFieldWithCheck
                                    placeholder="(주)씸플리"
                                    title="소속 (회사명)*"
                                    input={company}
                                    setInput={setCompany}
                                    checkList={["예비", "법인", "개인"]}
                                    checkFuncList={[
                                        () => {
                                            setCompanyType("예비");
                                        },
                                        () => {
                                            setCompanyType("법인");
                                        },
                                        () => {
                                            setCompanyType("개인");
                                        }
                                    ]}
                                    checkBoolList={[
                                        companyType === "예비",
                                        companyType === "법인",
                                        companyType === "개인"
                                    ]}
                                />
                                <span
                                    className="caption-700 gray-3"
                                    style={{
                                        textAlign: "start",
                                        marginLeft: "22.5px"
                                    }}
                                >
                                    *사업자등록증 상의 회사명과 동일하게 입력해주세요.
                                </span>
                            </div>
                            <TextField
                                placeholder="예)팀장"
                                title="직책*"
                                input={level}
                                setInput={setLevel}
                            />
                        </div>
                        :
                        <Fragment />
                }


                <div className="column gap-20">
                    {
                        step === 1
                            ?
                            <Button label={
                                "다음"
                            }
                                onClick={() => {
                                    if (password !== password2) {
                                        setValid(false);
                                    }
                                    //비밀번호 패턴 확인
                                    else if (!(password.length >= 6 &&
                                        pattern1.test(password) &&
                                        pattern2.test(password) &&
                                        pattern3.test(password)
                                    )) {
                                        setValid(false);
                                    }
                                    else {
                                        setValid(true);
                                        setStep(2);
                                    }
                                }}
                                isDisable={!(email.length >= 1 && password.length >= 1 && password2.length >= 1)}
                            />
                            :
                            //step 2
                            <Button label={
                                "회원가입 완료하기"
                            }
                                onClick={() => {
                                    //cookie 연결
                                    setCookie('company', company);
                                    setCookie('companyType', companyType);
                                    if (level === "대표") {
                                        setCookie('name', name);
                                    } else {
                                        setCookie('name', "");
                                    }


                                    createUser(email, password, name, level, null)
                                        .then(async () => {
                                            //회원가입 성공
                                            //로그인
                                            successToastDom.showToast();
                                            await login(email, password);
                                            //온보딩으로 이동
                                            navigate("/onboarding");
                                        })
                                        .catch(() => {
                                            errorToastDom.showToast();
                                        });

                                }}
                                isDisable={!(name.length >= 1
                                    && company.length >= 1
                                    && companyType !== ""
                                    && level.length >= 1)}
                            />
                    }
                    <div className="signup-status">
                        <div className={
                            step === 1 ?
                                "signup-status-able-1" :
                                "signup-status-able-2"
                        }></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUpPage;