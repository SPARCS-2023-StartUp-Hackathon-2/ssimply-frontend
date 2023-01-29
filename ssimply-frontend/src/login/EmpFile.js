import "../css/typography.scss";
import "../css/common.scss";
import "../css/component.scss";
import { useState, useRef, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmployee, uploadOccupiedFile } from "../api/api";
import { Buffer } from 'buffer';


const FileCard = ({ title, body, isEnd, link,
    caption, topCaption,
    hash, type, setFile,
    captionFunc }) => {

    const dragRef = useRef();

    const onFinish = async (e) => {
        try {
            const decode = Buffer.from(hash).toString('base64');

            const temp = JSON.stringify({
                ...decode,
                "type": type
            });

            const encode = Buffer.from(temp, 'base64').toString();
            uploadOccupiedFile(e.target.files[0], encode);
            setFile(e.target.files[0]);
        } catch (e) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <div className="column gap-14 center">
            <span className="body2-700 gray-1" style={{
                height: "20px"
            }}>
                {topCaption}
            </span>

            {
                isEnd
                &&
                <div className={
                    `file-card gap-8 click ${isEnd ? "file-card-end" : ""}`
                }>
                    <span
                        className="heading3-700 black"
                    >{title}</span>
                    <span
                        className={isEnd ? "body2-700 blue-7" : "body2-700 gray-1"}
                    >
                        {isEnd ? "제출 완료" : body}
                    </span>

                    <span
                        className="gray-7 body2-700"
                    >
                        {isEnd ? " " : "선택하기"}
                    </span>
                </div>
            }

            {
                !isEnd
                &&
                <Fragment>
                    <input
                        type="file"
                        id="fileUpload"
                        style={{ display: "none" }}
                        onChange={onFinish}
                    />

                    {/* input에 맞는 label */}
                    <label
                        htmlFor="fileUpload"
                        ref={dragRef}
                    >
                        <div className={
                            `dragdrop file-card gap-8 click ${isEnd ? "file-card-end" : ""}`
                        }>
                            <span
                                className="heading3-700 black"
                            >{title}</span>
                            <span
                                className={isEnd ? "body2-700 blue-7" : "body2-700 gray-1"}
                            >
                                {isEnd ? "제출 완료" : body}
                            </span>

                            <span
                                className="gray-7 body2-700"
                            >
                                {isEnd ? " " : "선택하기"}
                            </span>
                        </div>
                    </label>
                </Fragment>
            }



            {
                (link === "" || link === undefined)
                &&
                captionFunc === undefined
                &&
                <span
                    className={link === "" || link === undefined ?
                        "body2-700 gray-4" : "body2-700 underline blue-5"}>
                    {caption}
                </span>
            }

            {
                (link !== "" && link !== undefined && captionFunc === undefined)
                &&
                <a href={link}>
                    <span
                        className={link === "" || link === undefined ?
                            "body2-700 gray-4" : "body2-700 underline blue-5"}>
                        {caption}
                    </span>
                </a>
            }
            {
                captionFunc !== undefined
                &&
                <div className="click" onClick={captionFunc}>
                    <span
                        className="body2-700 underline blue-5">
                        {caption}
                    </span>
                </div>
            }
        </div>
    );
}

const EmpFilePage = (props) => {
    let { hash } = useParams();

    const [name, setName] = useState();
    const [idCardFile, setIdCardFile] = useState();
    const [accountFile, setAccountFile] = useState();
    const [applyFile, setApplyFile] = useState();
    const [insuranceFile, setInsuranceFile] = useState();
    const [incomeFile, setIncomeFile] = useState();

    useEffect(() => {
        //init
        try {
            const decode = Buffer.from(hash).toString('base64');
            const parse = JSON.parse(decode);

            //decode
            const id = parse["to"];

            // const id = hash;
            console.log(id);

            getEmployee(id).then((result) => {
                console.log(result);

                setName(result["name"]);
                setIdCardFile(result["idCardFile"]);
                setAccountFile(result["accountFile"]);
                setApplyFile(result["applyFile"]);
                setInsuranceFile(result["insuranceFile"]);
                setIncomeFile(result["incomeFile"]);
            });
        } catch (e) {

        }


    }, []);

    return (
        <div className="column custom-box-emp"
            style={{
                backgroundColor: "#FAFCFF"
            }}>

            <div style={{
                borderRadius: "15px",
                justifyContent: "flex-start",
                textAlign: "start",
                paddingTop: "80px",
                paddingRight: "63px",
                paddingLeft: "63px",
                width: "fit-content",
                backgroundColor: "white",
                alignSelf: "center"
            }}>
                <div>
                    <span className="heading2-700 gray-1 text-start"
                    >
                        {name}님, 안녕하세요.<br />
                        (주)씸플리 대표 김심플입니다.<br />
                        인건비 서류 처리를 위해 아래와 같은 정보를 요청드리오니,<br />
                        빠른 시일 내 업로드해주시면 감사하겠습니다.
                    </span>
                </div>
                <div className="row gap-16" style={{
                    marginTop: "132px",
                    marginBottom: "132px"
                }}>
                    <FileCard
                        onClick={() => {
                        }}
                        title="4대보험가입확인서*"
                        body="pdf 형식"
                        isEnd={insuranceFile !== null && insuranceFile !== undefined}
                        link="https://blog.naver.com/yousobig/222390714251"
                        caption="발급 방법 확인하기"
                        topCaption=" "
                        hash={hash}
                        type="insuranceFile"
                        setFile={setInsuranceFile}
                    />
                    <FileCard
                        onClick={() => {
                        }}
                        title="신분증 사본*"
                        body="jpg, jpeg, png, pdf 형식"
                        isEnd={idCardFile !== null && idCardFile !== undefined}
                        link=""
                        caption="주민등록증 혹은 운전면허증"
                        topCaption=" "
                        hash={hash}
                        type="idCardFile"
                        setFile={setIdCardFile}
                    />
                    <FileCard
                        onClick={() => {
                        }}
                        title="통장 사본*"
                        body="pdf 형식"
                        isEnd={accountFile !== null && accountFile !== undefined}
                        link="https://yange26.tistory.com/entry/%ED%86%B5%EC%9E%A5%EC%82%AC%EB%B3%B8-%EC%B6%9C%EB%A0%A5-%EC%9D%80%ED%96%89%EB%B3%84-%EB%B0%9C%EA%B8%89-%EB%B9%84%EA%B5%90"
                        caption="발급 방법 확인하기"
                        topCaption=" "
                        hash={hash}
                        type="accountFile"
                        setFile={setAccountFile}
                    />
                    <FileCard
                        onClick={() => {
                        }}
                        title="이력서*"
                        body="pdf 형식"
                        isEnd={applyFile !== null && applyFile !== undefined}
                        link=""
                        caption="양식 다운 받기"
                        topCaption=" "
                        hash={hash}
                        type="applyFile"
                        setFile={setApplyFile}
                        captionFunc={() => {
                            fetch('http://localhost:3000/file/form.docx')
                                .then(response => {
                                    response.blob().then(blob => {
                                        let url = window.URL.createObjectURL(blob);
                                        let a = document.createElement('a');
                                        a.href = url;
                                        a.download = 'form.docx';
                                        a.click();
                                    });
                                });
                        }}
                    />
                    <FileCard
                        onClick={() => {
                        }}
                        title="근로소득원천징수영수증"
                        body="pdf 형식"
                        isEnd={incomeFile !== null && incomeFile !== undefined}
                        link="https://1minutepost.com/%EA%B7%BC%EB%A1%9C%EC%86%8C%EB%93%9D%EC%9B%90%EC%B2%9C%EC%A7%95%EC%88%98-%EC%98%81%EC%88%98%EC%A6%9D/"
                        caption="발급 방법 확인하기"
                        topCaption="3년이내 근로소득이 있을 경우 제출"
                        hash={hash}
                        type="incomeFile"
                        setFile={setIncomeFile}
                    />
                </div>
            </div>


            <div className="custom-footer row space-between">
                <span className="body2-700 gray-3">
                    *파일 업로드 시 보안상의 문제로 다시 열어볼 수 없으며, 삭제 후 재업로드는 가능합니다.
                    <br />
                    *통장 사본은 근로계약서에 명시된 급여 이체 통장이 맞는지 확인해주세요.
                    <br />
                    *이미 작성된 이력서가 없는 경우, 양식을 다운 받아 작성하여 업로드해주세요.
                    <br />
                    *근로소득원천징수영수증은 최근 3년 이내에 근로소득이 있을 경우에만 업로드해주세요.
                </span>

                {/* SSimply */}
                <img src="logo.svg" height="27px" />

            </div>
        </div>
    );
}

export default EmpFilePage;