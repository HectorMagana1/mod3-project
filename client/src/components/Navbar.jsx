import { Link } from "react-router-dom";
import icon from '../assets/react.svg'

function Navbar({ setUser, username }) {
  
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
    <ul id='navbar'>
      <li>
        <Link to="/">
          <img src={icon} alt="React Icon" id="icon" />
        </Link>
      </li>
      {username ? 
        <>
          <li style={{ color: "black" }}>Welcome {username}!</li>
          <li onClick={logout}>
            <Link to="/posts">Logout</Link>
          </li>
        </>
       : 
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      }
    </ul>
  );
}

export default Navbar;
