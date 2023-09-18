import { Field, ErrorMessage, useFormikContext, useField } from 'formik'
import TextError_Component from './TextError_Component'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-multi-date-picker'
import { useState } from 'react'

export default function Datepicker_Component(props) {
  const {label, name, ...rest} = props
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return ( //<div class="d-flex justify-content-between">...</div>

    <div>  
        <Field name={name} className="form-control d-flex justify-content-between">
          {
            ({form, field})=>{
              const {setFieldValue} = form;
              const {value} = field;
              return (
                <div>
                  <label htmlFor={name}>{label}</label>
                <DatePicker
                className="align-self-center"
                  id={name}
                  {...field}
                  {...rest}
                  selected={(field.value && new Date(field.value)) || null}
                  onChange={val => {
                    setFieldValue(field.name, val); 
                  }}
                
                /> 

              
                </div>
              )
            }
          }
        </Field>
        <ErrorMessage name={name} component={TextError_Component} />

      </div>
  )
}

/**
 * const [value, setValue] = React.useState(new Date());
  const handleChange = event => {
    setValue(event.value);
  };
  return <div className="row">
      <div className="example-config col-xs-12 col-md-12 example-col">
        <p>The value is: {`${value}`}</p>
      </div>
      <div className="col-xs-12 col-md-12 example-col">
        <p>Controlled DatePicker</p>
        <DatePicker value={value} onChange={handleChange} />
      </div>
    </div>;
};
 * 
 */