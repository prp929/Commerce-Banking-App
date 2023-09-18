
import {Field, ErrorMessage } from "formik";
import TextError_Component from "./TextError_Component";
import '../../../BankApp.css'

export default function Input_Component(props) {
  const {label, name, ...rest} = props; 

  return (
    <div className="form-control container">
      
      <div className="row">
        <div className="col text-end">
          <label htmlFor={name}>{label}:</label>
        </div>
        <div className="col text-start">
          <Field className="m-3" id={name} name={name} placeholder={`Enter ${label} here`} {...rest}/>

          <ErrorMessage name={name} component={TextError_Component} />
        </div>
      </div>
      
    </div>
  )
}

