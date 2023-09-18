import { Field, ErrorMessage } from 'formik'
import TextError_Component from './TextError_Component'
import { useState } from 'react'

export default function RadioButtons (props) {
  const { label, name, options, ...rest } = props
  const id = name+'-my-radio-group'
  const [checkedIdx, setCheckedIdx] = useState(-1);
  
  function handleChange(idx){
    setCheckedIdx(idx);
  }

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
    <div className='form-control text-nowrap'>
      <label className='m-3 fw-bold'>{label}:</label>
      <Field role="group" aria-labelledby={id}>
        {({ values }) => {
          return options.map( (curr, idx) => {
            return (
              <div key={id+idx}>
            
            <label>
              <Field 
                type="radio" 
                // selected={value==}
                name={name} 
                value={vals[idx]} 
                className='m-3 '
                checked={vals[checkedIdx]} 
                {...values} 
                {...rest}
              />
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
















// //Here, need additional prop of key:value options for drop down options
// //Radio buttons have common name values in groups, BUT have different 
// // id and value values; also two JSX components, input and label, per radio option

// import { Field, ErrorMessage } from "formik";
// import '../../App.css';
// import TextError_Component from "./TextError_Component";
// import React, { useState } from "react";

// export default function Radio_Component(props) {
//   const {label, name, options, field, ...rest} = props; 
//   //const [isChecked, setChecked] = useState(false)

//   function handleChange(data){
//     console.log('data-->', data)
   
//   }

//   return (
//     <div className="form-control 
//       d-flex flex-row justify-content-center 
//       align-items-center py-3"
//     >
    
//       <label className='m-3 font-bold' htmlFor={name}> {label}: </label>
//       <Field name={name} >
//         {
//           (field)=>{ return (
//             options.map(
//               (currOption, idx)=>{
//                 return(
//                   <div key={idx} className='m-3'>
//                     <input type="radio" 
//                     id={idx} 
//                     name={name} 
//                     //value={currOption.values} 
//                     value={field.value===currOption.key } 
//                     {...field} 
//                     checked
//                     // ={field.value===currOption.key } 
//                     onClick={()=>{console.log('update()'); field.radioOption=currOption}}
//                  />
               
//                 <label 
//                   htmlFor={currOption.value}                 
//                   className="text-nowrap m-3">
//                     {currOption.key}
//                 </label>
              
           
                  
                  
                  
                  
//                   </div>




//                 )
//               }
//             ))
//           }
//         }
//       </Field>

//       <ErrorMessage name={name} component={TextError_Component} />
      
//     </div>
//   )


// }





// // export default function Radio_Component(props) {
// //   const {label, name, options, ...rest} = props; 
  
// //   function splitCurrOpt(opt){
// //     let text = opt+'';
// //     let s = [];
// //     s = text.split(',');
// //     return s[1];
// //   }

// //   return (
// //     <div className="form-control 
// //       d-flex flex-row justify-content-center 
// //       align-items-center py-3"
// //     >
    
// //     <label className='m-3 font-bold'> {label}: </label>
   
// //     <Field role='group' className="m-3 container" name={name} {...rest} >
// //       { ({field}) => { 
// //         //console.log('field-->', field)
// //         return options.map( (currOption, idx) => {
// //           console.log(options[idx].values)
// //           return(
// //             <React.Fragment key={currOption.key}>    

// //               <input 
// //                 type="radio"
// //                 id={currOption.key.toString()}
                
// //                 value={currOption.value}
// //                 //value={Object.values(currOption)} //currOption.value
// //                 checked={field.value === currOption.value} 
// //                 {...field}
// //                 onClick={console.log(options[idx].values)}
// //               />
                
// //               <label htmlFor={currOption.value}
// //                 className="text-nowrap m-3">
// //                 {currOption.key}
// //               </label>

// //             </React.Fragment> 
// //             )})
// //           }
// //         }
// //       </Field>

// //       <ErrorMessage name={name} component={TextError_Component} />
      
// //     </div>
// //   )
// // }
