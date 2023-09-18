import { useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./Security/AuthContext";




export default function LoginComponent(){
  //must synchronize state with values in JSX in return()
  const [username, setUserName] = useState('');
  const [password, checkPassword] = useState('');
  const [showErrorMessage, setShowErrorMethod] = useState(false);
  const navigate = useNavigate();  
  const authContext = useAuth(); 

  function handleUserNameChange(event){
    setUserName(event.target.value);
  }

  function handlePasswordChange(event){
    checkPassword(event.target.value);
  }

  async function handleSubmit(){
    if(await authContext.login(username, password)){
      navigate(`/welcome-calendar`); 
    } else {
      setShowErrorMethod(true); 
    }
  }

  return(
    <div className="LoginComponent">
      <h1>Time to Log In!</h1>

      {showErrorMessage && <div className="failureMessage">Failure; Check Credentials</div>} 

      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input type="text" name="username" value={username} onChange={handleUserNameChange} placeholder="username"/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="password"/>
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}> Log In </button>
        </div>
       
        <br />
        <div>
        Not a Registered User? Click <Link to="/registerNewUser" > Here</Link>
        <br />
      </div> 

      </div>
    </div>
  );
}