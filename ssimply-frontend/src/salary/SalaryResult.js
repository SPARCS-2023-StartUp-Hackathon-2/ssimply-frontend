import { useState, useEffect } from "react";
import { getCookie, setCookie } from "../module/cookies.ts";
import { getSalary } from "../api/api";
import { useParams } from "react-router-dom";

const FileItem = ({ name, link, mimeType }) => {

    return (
        <div
            className="row flex-start"
            style={{
                margin: "20px",
                // padding: "20px 0"
            }}>
            <div className="heading3-700 black salary-item-name" style={{
                width: "370px",
                height: "60px",
                alignSelf: "center",
                textAlign: "start",
            }}
                onClick={() => {
                    //link로 다운받기
                    fetch(link)
                        .then(response => {
                            response.blob().then(blob => {
                                let url = window.URL.createObjectURL(blob);
                                let a = document.createElement('a');
                                a.href = url;
                                a.download = `${name}.${mimeType}`;
                                a.click();
                            });
                        });
                }}
            >
                <span>{name}</span>
                <i className="icon-icon-download gray-5" style={{
                    fontSize: "30px"
                }}></i>
            </div>
        </div>
    );
}

const SalaryResultPage = () => {
    let { id } = useParams();

    const [salaryYearMonth, setSalaryYearMonth] = useState("");
    const [salaryName, setSalaryName] = useState("");
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        //init
        // setSalaryYearMonth(getCookie("salaryYearMonth"));
        // setSalaryName(getCookie("salaryName"));

        //getSalary에서 가져오기
        getSalary(id).then((data) => {
            setFileList(data["files"]);

            setSalaryYearMonth(data["yearMonth"]);
            setSalaryName(data["name"]);
        });
    }, []);

    return (
        <div className="salary-main column">
            <div
                className="gap-10"
                style={{
                    height: "200px",
                    textAlign: "start",
                    marginLeft: "80px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                <span className="heading2-700 black">
                    인건비 신청을 위한 증빙 서류가 만들어졌어요.
                </span>
                <span className="heading3-500 gray-3">
                    생성 중인 증빙: {salaryYearMonth.slice(0, 4)}년 {salaryYearMonth.slice(4)}월 정규직 인건비
                </span>
            </div>

            <div className="column flex-start salary-scroll" style={{
                marginLeft: "50px"
            }}>
                {
                    fileList.map((item) =>
                        <FileItem
                            name={item["name"]}
                            link={item["link"]}
                            mimeType={item["mimeType"]}
                        />)
                }
            </div>


            <div
                className="row space-between"
                style={{
                    height: "165px",
                    textAlign: "start",
                    paddingTop: "15px",
                    paddingRight: "50px",
                    alignItems: "flex-start"
                }}>
                <span className="body2-700 gray-3"
                    style={{
                        paddingTop: "20px",
                        paddingLeft: "50px"
                    }}
                >
                    *급여대장의 4대보험금은 2023년 고지된 4대보험료율에 따라 계산된 값이니,
                    <br />
                    수정되어야 할 사항은 문서를 다운로드 후 직접 수정해주세요.
                </span>

                {/* <Button label="일괄 다운로드"
                    size="small"
                    onClick={() => {
                        //TODO: 일괄 다운로드
                    }}
                /> */}
            </div>


        </div>
    );
}

export default SalaryResultPage;