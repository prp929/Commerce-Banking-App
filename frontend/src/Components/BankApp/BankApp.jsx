import "./BankApp.css"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ErrorComponent from "./Components/ErrorComponent";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from './Components/HeaderComponent';
import TransactionComponent from "./Components/TransactionComponent";
import LoanCalculatorComponent from "./Components/LoanCalculatorComponent";
import UserUpdateComponent from './Components/UserUpdateComponent'
import LoginComponent from "./Components/LoginComponent";
import LogoutComponent from "./Components/LogoutComponent"; 
import WelcomeComponent from "./Components/WelcomeComponent";
import ListTransactionsComponent from "./Components/ListTransactionsComponent";
import AuthProvider, {useAuth} from "./Components/Security/AuthContext";
import NewUserComponent from "./Components/NewUserComponent";

function AuthenticatedRoute({children}){
  const authContext = useAuth();
  if(authContext.isAuthenticated){
    return children; 
  } else {
    return(
      <Navigate to="/"  />
    );
  }
}

//will display header, a routed path, and a footer as written
export default function BankApp(){
  return(
    <div className="BankApp">
      <AuthProvider>
        <BrowserRouter>

          <HeaderComponent/>

          <Routes>
            <Route path= {"/"} element={ <LoginComponent/>} />
            
            <Route path= {"/login"} element={<LoginComponent/>}/>
            
            <Route path="/welcome-calendar" element={
              <AuthenticatedRoute>  
                <WelcomeComponent/>
              </AuthenticatedRoute>}/>

            <Route path="/transactions" element={
              <AuthenticatedRoute>  
                <ListTransactionsComponent/>
              </AuthenticatedRoute>}/>

            <Route path="/loan-calculator" element={
              <AuthenticatedRoute>  
                <LoanCalculatorComponent/>
              </AuthenticatedRoute>}/>
            
            <Route path="/logout" element={
              <AuthenticatedRoute>  
                <LogoutComponent/>
              </AuthenticatedRoute>}/>

            <Route path="/transaction/:id" element={
              <AuthenticatedRoute>  
                <TransactionComponent/>
              </AuthenticatedRoute>}/>

              <Route path="/registerNewUser"  element={ 
                <NewUserComponent/>
             }/>

            <Route path="/userAccountUpdate" element={
              <AuthenticatedRoute>  
                <UserUpdateComponent/>
              </AuthenticatedRoute>}/>

            <Route path="*" element={<ErrorComponent/>}/>
          </Routes>

          {/* <FooterComponent/> */}

        </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
}













