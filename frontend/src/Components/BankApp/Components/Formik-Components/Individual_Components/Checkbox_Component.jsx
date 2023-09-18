import { Field, ErrorMessage } from 'formik'
import TextError_Component from './TextError_Component'

export default function CheckBox_Component(props) {
  const { label, name, options, ...rest } = props
  const id = name+'-my-checkbox-group'

  //for some reason, react couldn't handle directly deconstructing the keys
  //and values so I've manually split them into arrays before rendering
  // options is an array of objects of the pattern {key:str, values:str}
  let keys=[], vals =[]; 
  for(let i = 0; i<options.length; i++){
    const {key, values} = options[i];
    keys.push(key);
    vals.push(values);
  }

  //console.log(keys, vals)

  return (
    <div className='form-control'>
      <label className='m-3 fw-bold'>{label}:</label>
      <Field role="group" aria-labelledby={id}>
        {({ values }) => {
          return options.map( (curr, idx) => {
            return (
              <div key={id+idx}>
            
                <label>
                  <Field type="checkbox" name={name} value={vals[idx]} {...values} {...rest} />
                {keys[idx]} 
                </label>
              
              </div>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError_Component} name={name} />
    </div>
  )
}

