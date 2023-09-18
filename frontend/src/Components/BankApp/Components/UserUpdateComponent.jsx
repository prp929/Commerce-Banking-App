import { Formik, Form } from "formik"
import * as Yup from 'yup'
import FormikControl from './Formik-Components/FormikControl'
import { useNavigate } from "react-router-dom";
import {updateUserApi, getUserApi, getAllUserNamesApi} from "./API/CustomerApiService";
import {  useAuth } from "./Security/AuthContext";
import { useEffect, useState, useReducer } from "react";
import { updateAllTransactionsForChangedUsernameApi } from "./API/BankAppApiService";


export default function UserUpdateComponent() {

  const [unList, setList] = useState([]);
  const authContext = useAuth();
  const username = authContext.username;
  const [initialValues, setInitialValues] = useState( 
    {
      first_name:"",
      last_name:"",
      password:"",
      confirm_password:"",
      email:"",
      username:username,
      balance:0
    });
  const navigate = useNavigate();
  useEffect( ()=>buildList, [] );
  useEffect( ()=>fillVals, []  );


  async function buildList(){
    await getAllUserNamesApi().then(resp => {
      setList(resp.data);
    })
  }

  async function fillVals(){
    await getUserApi(username)
      .then(val =>{ 
        setInitialValues(
          {
            user_id:val.data.user_id,
            enabled:val.data.enabled,
            username:username,
            first_name:val.data.first_name,
            last_name:val.data.last_name,
            balance:val.data.balance,
            password:val.data.password,
            email:val.data.email
          }
        )})
      .finally()
  }
 
  function goAway(){
    navigate('/welcome-calendar');
  }


  const validationSchema=Yup.object({
    username:Yup.string().required().test(
      un => !unList.includes(un) || un == username
    ),
    first_name:Yup.string().required(),
    last_name:Yup.string().required(),
    email:Yup.string().email().required(),
    password:Yup.string().required(),
    confirm_password:Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    balance:Yup.number().required()
  });

  function onSubmit(values){
    const subUser = {
      user_id: initialValues.user_id,
      enabled:initialValues.enabled,
      first_name:values.first_name,
      last_name:values.last_name,
      password:values.password,
      username:values.username,
      balance:Number(values.balance),
      email:values.email,
    }
 
    
   
    updateUserApi(username, subUser)
      .then(
        updateAllTransactionsForChangedUsernameApi(username, subUser.username).catch(e => 
          console.log("updateUser() -> updateAllTrans..() -> ", e))
      )
      .catch( err =>
        console.log(err) )
      .finally( ()=> { if(username==subUser.username){
          goAway();
        }else{ 
          authContext.logout();
        }
      });
    }
 
  return (
    
    <div className="container">
      <h2>Update Your Information</h2>
      <br />
      
        <Formik
          initialValues={initialValues} 
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={initialValues}
          validateOnChange
        >
          {
            props => (
              <Form>
                <FormikControl 
              control='input' 
              type= 'text'
              label='First Name' 
              name='first_name'
            />
            <FormikControl 
              control='input' 
              type='text' 
              label='Last Name' 
              name='last_name'
            />
             <FormikControl 
              control='input' 
              type='number' 
              label='Starting account balance' 
              name='balance'
            />
            <FormikControl 
              control='input' 
              type='email' 
              label='Email' 
              name='email'
            />
            <FormikControl 
              control='input' 
              type='text' 
              label='Username' 
              name='username'
            />
            <FormikControl 
              control='input' 
              type='password' 
              label='Password' 
              name='password'
            />
            <FormikControl 
              control='input' 
              type='password' 
              label='Confirm Password' 
              name='confirm_password'
            />
            

                <button type="submit" className="m-3 btn btn-success" >Submit</button>
                
                <button type="button" onClick={()=>{
                  navigate("/welcome-calendar")
                }}className="m-3 btn btn-danger" >Cancel</button>

              </Form>
            )
          }
        </Formik>
    </div>
  )
}

