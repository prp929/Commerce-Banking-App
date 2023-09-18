import { Field, ErrorMessage } from "formik";
import '../../../BankApp.css'
import TextError_Component from "./TextError_Component";

export default function Textarea_Component(props) {
  const {label, name, ...rest} = props; 

  return (
    <div className="form-control 
      d-flex flex-row justify-content-center 
      align-items-center py-3">
      
      <label htmlFor={name}>{label}</label>

      {/* Only difference between this and input is the the as='' field */}
      <Field as="textarea" className="mx-3 my-auto" id={name} name={name} {...rest}/>

      <ErrorMessage name={name} component={TextError_Component} />
      
    </div>
  )
}
