import {Link} from "react-router-dom";
import style from './Menu.module.scss'

function Menu() {
  return (<div className={style.menu}>
    <Link to={'/'}>Main</Link>
    <Link to={'/truck'}>Truck</Link>
    <Link to={'/load'}>Load</Link>
    <Link to={'/login'}>Login</Link>
    <Link to={'/register'}>Register</Link>
  </div>)
}

export default Menu;
