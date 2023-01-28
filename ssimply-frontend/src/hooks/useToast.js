import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeToast } from '../module/toastReducer';

export function useToast(toast_type, toast_text, btn_label, onBtnClick) {

    const dom = useRef();
    const dispatch = useDispatch();

    function showToast() {
        dispatch(changeToast({
            isShown: true,
            toast_type: toast_type,
            toast_text: toast_text,
            btn_label: btn_label,
            onBtnClick: onBtnClick
        }));
        //4초 뒤에 닫히는 건 Toast.js의 useEffect에 구현됨
    }


    return {
        ref: dom,
        showToast: showToast
    };
}
