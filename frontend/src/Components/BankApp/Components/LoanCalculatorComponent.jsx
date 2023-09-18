import { Formik, Form } from "formik"
import { useState } from "react";
import * as Yup from 'yup'
import FormikControl from './Formik-Components/FormikControl'

export default function Formik_Wrapper() {

  const[amt, setAmt] = useState('');
  const[successMsg, setSuccessMsg] = useState('');

  const initialValues= {
    amt:amt,
    dp:0,
    ir:'',
    n:''
  };

 
  const validationSchema=Yup.object({
    amt:Yup.number('Must be a number').min(0, 'Loan Amount must be greater than 0').required('Required Field'),
    dp:Yup.number('Must be a number').min(0, 'Down Payment must be greater than 0').test({
      message:'Down Payment cannot exceed loan amount',
      test: function(val){ if(this.parent.amt !== '' && this.parent.amt!==0){
        return (val <= this.parent.amt) } else return true }
    }),
    ir:Yup.number('Must be a number').test( 'Must enter an interest rate between 1 and 100',function(val){return val>1}).required('Required Field'),
    n:Yup.number('Must be a number').test('Enter valid number of months', function(val){ return val>1 && val<12000}).required('Required Field')
  });

 
  function calcMonthlyPayment(amt, downPayment, intRate, numMonths){
    let monthlyPayment;
    let n = Number(numMonths);
    let i = Number(intRate)/1200.0;
    let top = ( Number(amt)-Number(downPayment) ) * i * ((1+i)**n) ;
    let bottom = (1+i)**n - 1 ;
    monthlyPayment = top/bottom ;
    return monthlyPayment;
  }

  function onSubmit(vals){
    console.log('submitted()-> ' ,vals)
    let x = calcMonthlyPayment(vals.amt, vals.dp, vals.ir, vals.n);
    let y = Number(vals.amt) - Number(vals.dp);
    let yrs = (Number(vals.n)/12.0).toFixed(1);
    setSuccessMsg(
      `Your monthly payment on a loan valued at $${y.toFixed(2)} 
        with an interest rate of ${ Number(vals.ir).toFixed(2) }% 
        and paid back over ${yrs} years
        is: $${x.toFixed(2)} per month!`); 
    }

  function handleChange(val){
    setAmt(val.target.value);
    console.log(amt)
  }
  return (
    <div>
      <h2>Loan Calculator</h2>
    {successMsg!='' && <div className="container alert alert-success" role="alert">
      <h3> {successMsg} </h3>
    </div>}
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
            <FormikControl 
              control='input' 
              type='text' 
              label='Loan Amount' 
              name='amt'
              value={amt}
              onChange={(e)=>handleChange(e)}
            />
            <FormikControl 
              control='input' 
              type='text' 
              label='Down Payment (if applicable)' 
              name='dp'
            />
            <FormikControl 
              control='input' 
              type='text' 
              label='Yearly Interest Rate' 
              name='ir'
            />
            <FormikControl 
              control='input' 
              type='text' 
              label='Months to Repay' 
              name='n'
            />
            
            <button type="submit" className="m-3 btn btn-primary w-25" >Submit</button>
          </Form>
        )
      }
    </Formik>
    </div>
  )
}

