import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth} from "./Security/AuthContext";
import { getUserApi } from "./API/CustomerApiService";

export default function HeaderComponent(){
    const authContext = useAuth();
    const username = authContext.username;
    const isAuthenticated = authContext.isAuthenticated;

    function logout(){
        authContext.logout();
    }

  return(
          <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="#">CC BANK</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mx-3">

                                {isAuthenticated && 
                                    <li className="nav-item fs-5"><Link className="nav-link" to="/welcome-calendar">
                                        Home</Link></li>}

                                {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link"    to="/transactions">Transaction Manager</Link></li>}

                                {isAuthenticated &&
                                <li className="nav-item fs-5"><Link className="nav-link" to="/loan-calculator">Loan Calculator</Link></li> }
                                
                                {isAuthenticated &&
                                <li className="nav-item fs-5"><Link className="nav-link" to="/userAccountupdate" 
                                >User Updates</Link></li> }
                              
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link> }
                            </li> 
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
   
  );
}