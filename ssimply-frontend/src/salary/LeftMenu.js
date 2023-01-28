import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../css/menu.scss";
import { useToast } from "../hooks/useToast";


const LeftMenu = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isPaperOpen, setIsPaperOpen] = useState(true);

    let dashboardClass = "";
    let infoClass = "";
    let paperClass = "";

    const waitingToastDom = useToast("success", '아직 준비중이에요! 🥺',
        "닫기", () => { });

    //init
    if (pathname.includes("dashboard")) {
        dashboardClass = "left-menu-fill";
    } else if (pathname.includes("info")) {
        infoClass = "left-menu-fill";
    } else if (pathname.includes("paper")) {
        paperClass = "left-menu-fill";
    }

    if (!pathname.includes("paper")) {
        return (<Fragment />);
    }


    return (
        <div className="left-menu">
            <div style={{
                textAlign: "start",
                marginLeft: "20px"
            }}>
                <img src="logo.svg" height="27px" />
            </div>

            <div className="column gap-8"
                style={{
                    marginTop: "64px"
                }}>
                <div className={`row gap-12 flex-start padding-12-16 center click ${dashboardClass}`}
                    onClick={() => { }}>
                    <img src="icon/icon-pile.svg" width="24px" height="24px" />
                    <span className="body2-700 gray-5">대시보드</span>
                </div>
                <div className={`row gap-12 flex-start padding-12-16 center click ${infoClass}`}
                    onClick={() => { }}>
                    <img src="icon/icon-home-filled.svg" width="24px" height="24px" />
                    <span className="body2-700 gray-5">기본정보</span>
                </div>
                <div className={`row gap-12 flex-start padding-12-16 center click ${paperClass}`}
                    onClick={() => {
                        setIsPaperOpen(!isPaperOpen);
                    }}>
                    <img src="icon/icon-copy.svg" width="24px" height="24px" />
                    <span className="body2-700 gray-5">서류 만들기</span>
                </div>
                {
                    isPaperOpen
                    &&
                    <div className="column gap-8">
                        <div className={
                            `body2-700 left-menu-text ${pathname.includes("salary") ?
                                "left-menu-text-clicked" : ""
                            }`
                        }
                            onClick={() => {
                                //인건비로 이동
                                navigate("/papersalary");
                            }}
                        >
                            인건비
                        </div>

                        <div className={
                            `body2-700 left-menu-text ${pathname.includes("vacation") ?
                                "left-menu-text-clicked" : ""
                            }`
                        }
                            onClick={() => {
                                //복리후생비로 이동
                                waitingToastDom.showToast();
                            }}
                        >
                            복리후생비
                        </div>

                        <div className={
                            `body2-700 left-menu-text ${pathname.includes("material") ?
                                "left-menu-text-clicked" : ""
                            }`
                        }
                            onClick={() => {
                                //재료비로 이동
                                waitingToastDom.showToast();
                            }}
                        >
                            재료비
                        </div>

                        <div className={
                            `body2-700 left-menu-text ${pathname.includes("charge") ?
                                "left-menu-text-clicked" : ""
                            }`
                        }
                            onClick={() => {
                                //지급수수료로 이동
                                waitingToastDom.showToast();
                            }}
                        >
                            지급수수료
                        </div>

                        <div className={
                            `body2-700 left-menu-text ${pathname.includes("found") ?
                                "left-menu-text-clicked" : ""
                            }`
                        }
                            onClick={() => {
                                //창업활동비 이동
                                waitingToastDom.showToast();
                            }}
                        >
                            창업활동비
                        </div>

                        <div className={
                            `body2-700 left-menu-text ${pathname.includes("machine") ?
                                "left-menu-text-clicked" : ""
                            }`
                        }
                            onClick={() => {
                                //기계장치비 이동
                                waitingToastDom.showToast();
                            }}
                        >
                            기계장치비
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default LeftMenu;