import { Formik, Form } from "formik"
import { useState } from "react";
import * as Yup from 'yup'
import FormikControl from './FormikControl'

export default function Formik_Wrapper() {

  const [datelist, setDatelist] = useState([]);
  
  const dropDownOptions=[
    {key:'Select Option 0', values:'#0'},
    {key:'Select Option 1', values:'#1'},
    {key:'Select Option 2', values:'#2'},
    {key:'Select Option 3', values:'#3'}
  ];

  const radioOptions=[
    {key:'Radio 0', values:'R0'},
    {key:'Radio 1', values:'R1'},
    {key:'Radio 2', values:'R2'},
    {key:'Radio 3', values:'R3'}
  ];

  const checkboxOptions=[
    {key:'Check 0', values:'Chk->0'},
    {key:'Check 1', values:'Chk->1'},
    {key:'Check 2', values:'Chk->2'},
    {key:'Check 3', values:'Chk->3'}
  ]



  const initialValues= {
    email:'',
    description:'',
    selectOption:'',
    radioOption:'',
    checkboxOption:[],
    dateOption:null,
    datelistOption:datelist
  };

  const validationSchema=Yup.object({
    email:Yup.string().required(),
    description:Yup.string().required(),
    selectOption:Yup.string().test(value => value !== '').required(),
    radioOption:Yup.string().test(value => value !== '').required(),
    checkboxOption:Yup.array().test( value => value.length>0).required(),
    //dateOption:Yup.date().required().nullable(), //need nullable to avoid error as default val is null
    datelistOption:Yup.array().test( value => value.length>0).required('Need at least one date!').nullable()
  });

  function onSubmit(values){
    console.log('onSubmit() -> values: ', values);
  }

  return (
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
              type='email' 
              label='Email' 
              name='email'
            />

            <FormikControl 
              control='textarea' 
              label='Description' 
              name='description'
            />

            <FormikControl 
              control='select' 
              label='Select a topic' 
              name='selectOption'
              options={dropDownOptions}
            />

            <FormikControl 
              control='radio' 
              label='Choose an option' 
              name='radioOption'
              options={radioOptions}
            />

            <FormikControl 
              control='checkbox' 
              label='Check a box(s)' 
              name='checkboxOption'
              options={checkboxOptions}
            />

            <FormikControl 
              control='date' 
              label='Pick a date' 
              name='dateOption'
            />

            <FormikControl 
              control='datelist' 
              label='List of dates' 
              name='datelistOption'
              extraProps={props}
              datelist={datelist}
              setDatelist={setDatelist}
            />

            <button type="submit" className="m-3" >Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

