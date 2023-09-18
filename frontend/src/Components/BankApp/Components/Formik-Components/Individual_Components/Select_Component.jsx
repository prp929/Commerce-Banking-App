
import { Field, ErrorMessage } from "formik";
import '../../../BankApp.css'
import TextError_Component from "./TextError_Component";

export default function Select_Component(props) {
  const {label, name, options, ...rest} = props; 
  //Here, need additional prop of key:value options for drop down options

  return (
    <div className="form-control">
      
      <label htmlFor={name}>{label}</label>

      <Field as='select' className="m-3" id={name} name={name} {...rest} >
      <option defaultValue> </option> 
        {
          options.map(currOption =>{
            return(
              <option 
                key={currOption.key} 
                value={currOption.value}
              >
                {currOption.key}
              </option>
            )
          })
        }
      </Field>

      <ErrorMessage name={name} component={TextError_Component} />
      
    </div>
  )
}
