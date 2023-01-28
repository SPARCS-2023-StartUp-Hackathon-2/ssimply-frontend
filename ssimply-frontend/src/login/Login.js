import "../css/common.scss";
import TextField from "../component/TextField";
import Button from "../component/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { useToast } from "../hooks/useToast";


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const errorToastDom = useToast("danger", '비밀번호를 다시 입력해주세요.',
        "닫기", () => { });

    return (
        <div className="column center custom-box">
            <div className="column gap-30" style={{
                height: "240px"
            }}>
                <img src="logo.svg" height="27px" />
                <span className="heading2-700 gray-3">
                    심플하게 끝내는 서류 작업,<br />
                    대표님들의 든든한 비서 씸플리가 도와드릴게요!
                </span>
            </div>

            <div className="column space-between" style={{
                height: "519px",
                width: "360px"
            }}>
                <div className="column space-between" style={{
                    height: "209px"
                }}>
                    <TextField
                        placeholder="report@ssimply.io"
                        title="이메일"
                        input={email}
                        setInput={setEmail}
                    />
                    <TextField
                        placeholder="비밀번호를 입력하세요."
                        title="비밀번호"
                        input={password}
                        setInput={setPassword}
                        isPassword={true}
                    />
                </div>


                <div className="column gap-20">
                    <Button label="로그인"
                        onClick={() => {
                            //로그인 api 연결
                            login(email, password)
                                .then(() => {
                                    //로그인 성공
                                    navigate("/papersalary");
                                })
                                .catch(() => {
                                    //로그인 실패
                                    errorToastDom.showToast();
                                });

                        }}
                        isDisable={!(email.length >= 1 && password.length >= 1)}
                    />
                    <div className="row gap-10">
                        <span className="body1-500 black">씸플리가 처음이신가요?</span>
                        <div className="click" onClick={() => {
                            //회원가입 페이지로 이동
                            navigate("/signup");
                        }}>
                            <span className="body1-500 black underline">회원가입</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoginPage;