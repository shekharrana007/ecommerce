import {Link} from "react-router-dom";
function Header(){
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container ">
    <Link className="navbar-brand" to="/">
      my app
    </Link >
   
    
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link >
        
        <li className="nav-item">
          <Link className="nav-link" to ="/login">
            Login
          </Link>
        </li>
        
    </div>
  
</nav>

        </>
    );
}

export default Header;