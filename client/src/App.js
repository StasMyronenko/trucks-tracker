import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Menu from './template/Menu/Menu';
import User from './template/User/User';
import Register from './template/Auth/Register/Register';
import Login from './template/Auth/Login/Login';
import Truck from './template/Truck/Truck'
import Load from './template/Load/Load'
import ForgotPassword from "./template/Auth/ForgotPassword/ForgotPassword";
import RestorePassword from "./template/Auth/RestorePassword/RestorePassword";
import {getToken} from "./services/auth";


function App() {
  return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path={'/'} element={!!getToken() ? <User/> : <Navigate to={"login"}/>} />
          <Route path={'/truck'} element={<Truck/>}/>
          <Route path={'/load'} element={<Load/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route path={'/forgot_password'} element={<ForgotPassword/>} />
          <Route path={'/forgot_password'} element={<ForgotPassword/>} />
          <Route path={'/restore_password/:email'} element={<RestorePassword/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
