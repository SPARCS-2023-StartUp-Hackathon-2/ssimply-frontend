import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginPage from './login/Login';
import SignUpPage from './login/SignUp';
import OnBoardingPage from './login/OnBoarding';
import EmpFilePage from './login/EmpFile';

function App() {


  //전역상태 update 위해 사용
  const dispatch = useDispatch();
  const isToastShown = useSelector(state => state.toastReducer.isShown);
  const toast_type = useSelector(state => state.toastReducer.toast_type);
  const toast_text = useSelector(state => state.toastReducer.toast_text);
  const btn_label = useSelector(state => state.toastReducer.btn_label);
  const onBtnClick = useSelector(state => state.toastReducer.onBtnClick);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/onboarding" element={<OnBoardingPage />}></Route>
          <Route exact path="/emp/:employeeId" element={<EmpFilePage />}></Route>
          <Route path="*" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>

      {/* TODO: toast */}
      {/* {
        isToastShown
        &&
        <Toast type={toast_type} toast_text={toast_text}
          btn_label={btn_label}
          onBtnClick={onBtnClick}
          isShown={isToastShown}
        />
      } */}


    </div>
  );
}

export default App;
