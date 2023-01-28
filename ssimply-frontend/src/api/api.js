import axios from "axios";

const API_DOMAIN = "";
var ACCESS_TOKEN = "";

///// LOGIN /////
const login = async (email, password) => {
    //로그인
    await axios({
        method: "POST",
        url: API_DOMAIN + "/v1/auth",
        mode: "cors",
        data: JSON.stringify({
            "email": email,
            "password": password,
        })
    }).then((result) => {
        console.log(result);
        //TODO: 이렇게 해도 되는지 확인 필요
        ACCESS_TOKEN = result.data["accessToken"];
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

///// FILE /////
const uploadFile = async (file) => {
    //file:  e.target.files[0]
    const formData = new FormData();
    formData.append("file", file); //files[0] === upload file
    axios({
        method: "POST",
        url: API_DOMAIN + "/v1/files",
        mode: "cors",
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "bearer " + ACCESS_TOKEN
        },
        data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const deleteFile = async (uuid) => {
    //uuid: file id
    await axios({
        method: "PUT",
        url: API_DOMAIN + "/v1/files/" + uuid,
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}


///// USER /////
const createUser = async (email, password, name, position, profileUUID) => {
    //회원가입
    await axios({
        method: "POST",
        url: API_DOMAIN + "/v1/users",
        mode: "cors",
        data: JSON.stringify({
            "email": email,
            "password": password,
            "name": name,
            "position": position,
            "profileUUID": profileUUID === undefined ? null : profileUUID
        })
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const getMe = async () => {
    //내 정보 조회
    await axios({
        method: "GET",
        url: API_DOMAIN + "/v1/users/me",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const updateMe = async (email, password, name, position, profileUUID) => {
    //내 정보 수정
    await axios({
        method: "PUT",
        url: API_DOMAIN + "/v1/users/me",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
        data: JSON.stringify({
            "email": email,
            "password": password,
            "name": name,
            "position": position,
            "profileUUID": profileUUID === undefined ? null : profileUUID
        })
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const deleteMe = async () => {
    //회원 탈퇴
    await axios({
        method: "DELETE",
        url: API_DOMAIN + "/v1/users/me",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}


///// COMPANY /////
const createCompany = async (name, type, item, supportProgramIds) => {
    //회사정보 입력
    await axios({
        method: "POST",
        url: API_DOMAIN + "/v1/companies",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
        data: JSON.stringify({
            "name": name,
            "type": type, // enum('PRE', 'INDIVIDUAL', 'COPERATION')
            "item": item === undefined ? null : item,
            "supportProgramIds": supportProgramIds
        })
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const getCompany = async () => {
    //회사정보 조회
    await axios({
        method: "GET",
        url: API_DOMAIN + "/v1/companies/me",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const updateCompany = async (name, type, item, supportProgramIds) => {
    //회사정보 수정
    await axios({
        method: "PUT",
        url: API_DOMAIN + "/v1/companies/me",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
        data: JSON.stringify({
            "name": name,
            "type": type, // enum('PRE', 'INDIVIDUAL', 'COPERATION')
            "item": item === undefined ? null : item,
            "supportProgramIds": supportProgramIds
        })
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}


const getSupportProgramList = async () => {
    //정부지원사업 목록 조회
    await axios({
        method: "GET",
        url: API_DOMAIN + "/v1/supportprograms",
        mode: "cors",
        headers: {
            "Authorization": "bearer " + ACCESS_TOKEN
        },
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}


//// COOP /////
// const createCoop = async (name, email) => {
//     //거래처 정보 입력
//     await axios({
//         method: "POST",
//         url: API_DOMAIN + "/v1/companies/me/coops",
//         mode: "cors",
//         data: JSON.stringify({
//             "name": string, // 회사명
//             "email": string, // 회사 이메일
//         })
//     }).then((result) => {
//         console.log(result);
//         return result;
//     }).catch((e) => {
//         console.log(e);
//     })
// }


///// EMPLOYEE /////
const createEmployee = async (name, position, type, email, enteredAt) => {
    //직원 정보 입력
    await axios({
        method: "POST",
        url: API_DOMAIN + "/v1/companies/me/employees",
        mode: "cors",
        data: JSON.stringify({
            "name": name,
            "position": position,
            "type": type, // enum('PERMANENT', 'TEMPORARY')
            "email": email,
            "enteredAt": enteredAt,
        })
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const getEmployList = async () => {
    //직원 목록 조회
    await axios({
        method: "GET",
        url: API_DOMAIN + "/v1/companies/me/employees",
        mode: "cors"
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const getEmployee = async (id) => {
    //직원 정보 조회
    await axios({
        method: "GET",
        url: API_DOMAIN + "/v1/companies/me/employees/" + id,
        mode: "cors"
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const updateEmployee = async (id,
    name, position, type, email, enteredAt, idCardFileUUID,
    accountFileUUID, applyFileUUID, insuranceFileUUID, incomeFileUUID) => {
    //직원 정보 수정
    await axios({
        method: "PUT",
        url: API_DOMAIN + "/v1/companies/me/employees/" + id,
        mode: "cors",
        data: JSON.stringify({
            "name": name,
            "position": position,
            "type": type, // enum('PERMANENT', 'TEMPORARY')
            "email": email,
            "enteredAt": enteredAt,
            "idCardFileUUID": idCardFileUUID === undefined ? null : idCardFileUUID, // 신분증 파일 UUID
            "accountFileUUID": accountFileUUID === undefined ? null : accountFileUUID, // 통장 사본 파일 UUID
            "applyFileUUID": applyFileUUID === undefined ? null : applyFileUUID, // 이력서 파일 UUID
            "insuranceFileUUID": insuranceFileUUID === undefined ? null : insuranceFileUUID, // 4대 보험 가입 확인서 파일 UUID
            "incomeFileUUID": incomeFileUUID === undefined ? null : incomeFileUUID, // 근로 소득 원천 징수 영수증 파일 UUID
        })
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

const deleteEmployee = async (id) => {
    //직원 정보 삭제
    await axios({
        method: "DELETE",
        url: API_DOMAIN + "/v1/companies/me/employees/" + id,
        mode: "cors"
    }).then((result) => {
        console.log(result);
        return result;
    }).catch((e) => {
        console.log(e);
    })
}

export {
    login, uploadFile, deleteFile, createUser,
    getMe, updateMe, deleteMe, createCompany, getCompany, updateCompany,
    getSupportProgramList, createEmployee, getEmployList,
    getEmployee, updateEmployee, deleteEmployee
};



//참고용
const form = async (e) => {
    const formData = new FormData();

    formData.append("file", e.target.files[0]); //files[0] === upload file
    await axios({
        method: "POST",
        url: API_DOMAIN + "/v1/auth",
        mode: "cors",
        headers: {
            "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
        },
        data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    })
}