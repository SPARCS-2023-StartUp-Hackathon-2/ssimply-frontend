import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../css/menu.scss";


const LeftMenu = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isPaperOpen, setIsPaperOpen] = useState(true);

    let dashboardClass = "";
    let infoClass = "";
    let paperClass = "";

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
            {/* TODO: left-menu */}
            {/* TODO: 라우팅 확인해서 특정일 때만 보이도록!! */}
            <span style={{
                textAlign: "start",
                marginLeft: "20px"
            }}>SSimply</span>
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
                                //TODO: 인건비로 이동
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
                                //TODO: 복리후생비로 이동
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
                                //TODO: 재료비로 이동
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
                                //TODO: 지급수수료로 이동
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
                                //TODO: 창업활동비 이동
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
                                //TODO: 기계장치비 이동
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