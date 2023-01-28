import { useState } from "react";
import Button from "../component/Button";

const FileItem = ({ name }) => {

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
                    //TODO: 인건비 화면으로 이동
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

    const [fileList, setFileList] = useState([
        {
            "name": "dsfasdf",
            "link": "ssss"
        },
        {
            "name": "dsfasdf",
            "link": "ssss"
        }, {
            "name": "dsfasdf",
            "link": "ssss"
        }, {
            "name": "dsfasdf",
            "link": "ssss"
        }, {
            "name": "dsfasdf",
            "link": "ssss"
        }, {
            "name": "dsfasdf",
            "link": "ssss"
        }, {
            "name": "dsfasdf",
            "link": "ssss"
        }
    ]);

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
                    {/* TODO: 불러오기 */}
                    생성 중인 증빙: 2023 8월 정규직 인건비
                </span>
            </div>

            <div className="column flex-start salary-scroll" style={{
                marginLeft: "50px"
            }}>
                {
                    fileList.map((item, index) => <FileItem
                        name={item["name"]}
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

                <Button label="일괄 다운로드"
                    size="small"
                    onClick={() => {
                        //TODO: 일괄 다운로드
                    }}
                />
            </div>


        </div>
    );
}

export default SalaryResultPage;