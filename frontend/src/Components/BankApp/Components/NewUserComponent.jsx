import { Formik, Form } from "formik"
import * as Yup from 'yup'
import FormikControl from './Formik-Components/FormikControl'
import { useNavigate } from "react-router-dom";
import {createUserApi, getAllUserNamesApi} from "./API/CustomerApiService"
import { useEffect, useState } from "react";


export default function NewUserComponent({iv}) {
  const [unList, setList] = useState([]);
  const navigate = useNavigate();
  useEffect( ()=>buildList, [] )

  function goAway(){
    navigate('/welcome-calendar');
  }
  function goHome(){
    navigate('/login');
  }

  async function buildList(){
    await getAllUserNamesApi().then(resp => {
      setList(resp.data);
    })
  }


  const initialValues ={
    username:'',
    password:'',
    confirm_password:'',
    first_name:'',
    last_name:'',
    balance: 0,
    email:''
  }

  const validationSchema=Yup.object({
    username:Yup.string().required().test(
      un => !unList.includes(un)
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
    console.log('onSubmit() -> values: ', values);
    
    const user = {
      first_name:values.first_name,
      last_name:values.last_name,
      password:values.password,
      username:values.username,
      balance:Number(values.balance),
      email:values.email,
      enabled:false,
      user_id: 10 * ( ++unList.length)
    }
    //needs moved 
    createUserApi(user)
    .then(console.log("SUBBED USER: ", user))
    .catch( err =>
      console.log(err) )
    .finally(
      goAway()
    )

  }

  return (
    <div className="container">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
    >
      {
        props => (
          <Form>
            <h2>Register A New User</h2>
            <br />
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
            <button type="input" className="m-3 btn btn-danger" onClick={goHome}>Return to Login</button>
          </Form>
        )
      }
    </Formik>
    </div>
  )
}


  
 