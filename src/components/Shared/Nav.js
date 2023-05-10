import './Nav.css'
import {NavLink} from 'react-router-dom'
const Nav = () => {


  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink excat="true"  to="/" activeclassname="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">About</NavLink>
          </li>
          <li>
            <NavLink to="/menu" activeclassname="active">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/reservations" activeclassname="active">Reservations</NavLink>
          </li>
          <li>
          <NavLink to="/order-online" activeclassname="active">Order Online</NavLink>
          </li>
          <li>
            <NavLink to="/login" activeclassname="active">Login</NavLink>
          </li>
        </ul>
      </nav>



    </>
  );
};
export default Nav;
