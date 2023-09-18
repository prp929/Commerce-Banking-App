import { useParams } from "react-router-dom";
import { useAuth} from "./Security/AuthContext";
import { retrieveTransactionApi, updateTransactionListApi, getValidId, createNewTransaction } from "./API/BankAppApiService";
import { useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import FormikControl from "./Formik-Components/FormikControl";
import DatePicker from "react-multi-date-picker";



export default function TransactionComponent(){
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate(); 
  const authContext = useAuth(); 
  const username = authContext.username; 
  const [isNewComponent, setIsNewComponent] = useState('');
  const [intitialValues, setInitialValues] = useState('');
  const [validId, setValidId]= useState('');

  useEffect(
    ()=>{ 
      setIsNewComponent(state.isNewComponent); 
      setValidId(state.validId); 
      setInitialValues(state.transaction);
    },
    []
  );
  
  function goAway(){
    navigate('/transactions');
  }

  const expenseOptions=[
    {key:'Expense', values:"true"},
    {key:'Income', values:"false"}
  ];
  const recurOptions=[
    {key:'Recurring', values:"true"},
    {key:'One time', values:"false"}
  ];
  const plannedOptions=[
    {key:'Planned', values:"true"},
    {key:'Unplanned', values:"false"}
  ];

  const dateRegex = "/^19[0-9][0-9]|20[0-4][0-9]|2050\/1[0-2]|[1-9]\/[1-9]|[12][0-9]|3[01]$/"

  const validationSchema=Yup.object({
    expense_option:Yup.string().required(),
    recur_option:Yup.string().required(),
    planned_option:Yup.string().required(),
    description:Yup.string().required(),
    amount:Yup
    .string()
    .required()
    .matches(/^\d*\.?\d*$/, "Only numbers allowed"),
    date:Yup.string().trim()
    .matches(dateRegex, 'Not in correct format')
    .required()
  });

  function onSubmit(values){
    const {
      amount, description, date, 
      planned_option, recur_option, expense_option
    } = values;
    
    let id;
    if(isNewComponent){ 
      id = validId;
    } else{ 
      id= state.transaction.id 
    }
    console.log('date is->', date)
    let plsDate;
    if(isNewComponent) { 
      plsDate=new Date (date.year+"-"+date.month.number+'-'+date.day); 
    } else { 
      plsDate=new Date( date.substring(0,4), date.substring(5,7) - 1, date.substring(8,10)) 
    };
    plsDate = plsDate.toISOString();
    const submitTransaction = {
        id: id,
        username: username+"",
        amount: amount+"",
        description: description+"",
        date: plsDate,
        recur_option: recur_option,
        expense_option: expense_option,
        planned_option: planned_option
    }
    
    if(isNewComponent){
        createNewTransaction(submitTransaction)
        .then( navigate('/transactions'))
        .catch( e=> console.log("createNew() error in Transaction Component -> ", e )) ;
    } else {
        updateTransactionListApi(username, id, submitTransaction)
        .then( navigate('/transactions') );
    }
  }


  return(

    <div className="container border border-dark">
     <div className="container">
         { isNewComponent ? <h3>New Transaction Form</h3> : <h3> Transaction Update Form </h3>}
     </div>
     

     <Formik
      initialValues={state.transaction}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
    >
      {
        props => (
          <Form>
            <div id='description-and-amount-container'>
            <FormikControl 
              control='input' 
              label='Description' 
              name='description'
            />

            <FormikControl 
              control='input' 
              label='Amount' 
              name='amount'
            />

            <FormikControl 
              control='date' 
              label='Date' 
              name='date'
            />

            </div>


            <div id='radio-button-container' className="d-inline-flex p-2">
            <FormikControl 
              control='radio' 
              label='Choose an option' 
              name='planned_option'
              options={plannedOptions}
            />
            <FormikControl 
              control='radio' 
              label='Choose an option' 
              name='recur_option'
              options={recurOptions}
            />
            <FormikControl 
              control='radio' 
              label='Expense or Income' 
              name='expense_option'
              options={expenseOptions}
            />
            </div>


            <div className="mx-auto p-4">
              <button type="submit" className="btn btn-primary btn-lg w-25 m-3" >Submit</button>
              <button type="button" className="btn btn-secondary btn-lg w-25 m-3" 
              onClick={goAway}>Return</button>
            </div>
          </Form>
        )
      }
    </Formik> 
    </div> 
 );

}//end component


          
    