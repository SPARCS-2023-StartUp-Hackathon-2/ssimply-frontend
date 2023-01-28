import "../css/typography.scss";
import "../css/common.scss";
import "../css/component.scss";
import "../css/dragdrop.scss";
import { useState, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const FileCard = ({ onClick, title, body, isEnd, link, caption, topCaption }) => {

    const dragRef = useRef();

    const onFinish = async (e) => {
        const formData = new FormData();

        formData.append("file", e.target.files[0]); //files[0] === upload file
        await axios({
            method: "POST",
            url: `http://xxxxxx.com/api/xx`,
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            },
            data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
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
                } onClick={onClick}>
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
                        {isEnd ? "삭제하기" : "선택하기"}
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
                        } onClick={onClick}>
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
                                {isEnd ? "삭제하기" : "선택하기"}
                            </span>
                        </div>
                    </label>
                </Fragment>
            }





            <a href={link}>
                <span
                    className={link === "" || link === undefined ?
                        "body2-700 gray-4" : "body2-700 underline blue-5"}>
                    {caption}
                </span>
            </a>
        </div>
    );
}

const EmpFilePage = (props) => {
    let { employeeId } = useParams();

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
                        박민지님, 안녕하세요.<br />
                        (주)씸플리 대표 홍길동입니다.<br />
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
                            //TODO: file 업로드
                        }}
                        title="4대보험가입확인서*"
                        body="pdf 형식"
                        isEnd={true}
                        link=""
                        caption="발급 방법 확인하기"
                        topCaption=" "
                    />
                    <FileCard
                        onClick={() => {
                            //TODO: file 업로드
                        }}
                        title="신분증 사본*"
                        body="jpg, jpeg, png, pdf 형식"
                        isEnd={false}
                        link=""
                        caption="주민등록증 혹은 운전면허증"
                        topCaption=" "
                    />
                    <FileCard
                        onClick={() => {
                            //TODO: file 업로드
                        }}
                        title="통장 사본*"
                        body="pdf 형식"
                        isEnd={false}
                        link="www.naver.com"
                        caption="발급 방법 확인하기"
                        topCaption=" "
                    />
                    <FileCard
                        onClick={() => {
                            //TODO: file 업로드
                        }}
                        title="이력서*"
                        body="pdf 형식"
                        isEnd={false}
                        link=""
                        caption="양식 다운 받기"
                        topCaption=" "
                    />
                    <FileCard
                        onClick={() => {
                            //TODO: file 업로드
                        }}
                        title="근로소득원천징수영수증"
                        body="pdf 형식"
                        isEnd={false}
                        link=""
                        caption="발급 방법 확인하기"
                        topCaption="3년이내 근로소득이 있을 경우 제출"
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
                <span style={{
                    alignSelf: "center",
                    textAlign: "end"
                }}>
                    SSimply
                </span>

            </div>
        </div>
    );
}

export default EmpFilePage;