import { Field, ErrorMessage, FieldArray } from 'formik'
import TextError_Component from './TextError_Component'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useCallback, useEffect } from 'react'
import DatePicker from "react-multi-date-picker"
import Icon from "react-multi-date-picker/components/icon"


export default function Datelist_Component({label, name, extraProps,
   datelistOption, datelist, setDatelist, ...rest}) {

  //Below are deconstructed props for a reusable component; this component isn't super modular
  
  //InputField represents the contents of the input field so that it is easily avalaible to many components 
  const [inputField, setInputField] = useState(''); 
  //I don't really know what these next two do, but I copied them from StackOverflow to force my 
  //list to rerender on change
  const [ , updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  //This is the value the picker icon so it can be passed to inputField
  const [pickerValue, setPickerValue] = useState('');
  
  useEffect(
    ()=>forceUpdate(),
    []
  );


  /****************************** Functions *************************************************** */
  
  function addListItem(e){
    e.preventDefault();
    console.log('addListItem() ', inputField );
    let d = datelist;
    let isDuplicate = true;
    let i = 0;

    //see if the item is a duplicate
    datelist.forEach( currItem  => {
      if(currItem===inputField){
        i++;
      }
    });
    
    if( i>=1) { 
      isDuplicate = true ; 
    } else { 
      isDuplicate = false;
      if( verifyDate(inputField) ) {
        d.push(inputField);
        setDatelist(d);
      } 
    }
    //console.log('is dupe? ' , isDuplicate )
    //console.log('datelist is now: ', datelist)
    setInputField('');
  }

  function removeListItem(item){
    let d = datelist;
    var index = d.indexOf(item);
    // console.log('rmv() -> ' , item, ' at ',index )
    if (index !== -1) {
      d.splice(index, 1);
    }
    setDatelist(d);
    forceUpdate();
  }

  function clearField(){
    //console.log('clearfield()');
    setDatelist([]);
  }

  /** THIS VERIFICATION NEEDS IMPROVED */
  function verifyDate(val){
    //console.log('verifyDate(); val-> ', val);
    return (val !== '');
  }

  //Change handler for Picker Icon component
  function handlePickerChange(value){
    setPickerValue(value);
    let s = value.month + '/' + value.day + '/' + value.year;
    //console.log('picker onChange() -> ',value, ' str version: ', s)
    setInputField(s);
  }

/************************** Return JSX *********************************************** */
/** This outputs a label, inputField, datePicker icon tied to inputField, an add and a delete all button. 
 * Each time a date is typed in the field or selected from datepicker it is added to InputField and on 'add', the date is verified and then added to a list that renders beneath the input area. 
*/
  return(
     
    <div className="form-control p-3" >     
      <div className='m-3'>
        <label htmlFor='dateEntry' className='fw-bold'>
            Add a date here:  
        </label>
        <input type="text" className='m-3' name='dateEntry' key='dataEntry' 
          placeholder='Enter a date'
          value={inputField}
          onChange={ val => {setInputField(val.target.value); 
            // console.log('val from input: ', val.target.value, ' dl is: ', datelist)
          }}
        />

        <DatePicker 
          render={<Icon/>}
          value={pickerValue}
          onChange={handlePickerChange}
          className='justify-content-center' 
        />
                  
        <button type='button' className='btn btn-success m-3' onClick={ e => addListItem(e)}>
           ADD DATE 
        </button>
        
        <button type='button' className='btn btn-danger m-3' onClick={ clearField}>
          CLEAR ALL
        </button>
      </div>
                       
      <FieldArray name={name} id={name} className="p-3" >
        { fieldArrayProps => {
            const {push, remove, form} = fieldArrayProps; 
            const {values} = form; 
            const {name} = values;
            //console.log("FieldArrayProps --> ", fieldArrayProps, ' name:', name, ' vals: ', values, ' datelist: ', datelist )
            return(
              <div>
                <label htmlFor='dateEntry' className='fw-bold'>
                  {label}: 
                </label> 
                { datelist.length>0 && datelist!= null && 
                  datelist.map( (currDate, idx) => ( currDate != '' &&
                    <div key={ `${name}[${idx}]`} className='p-1 border-top border-bottom' >
                      <Field 
                        id={name} 
                        name={`${name}[${idx}]`} 
                        className="mx-3"  
                        value={currDate}
                      />
                      <button  
                        className='btn btn-warning ' 
                        type="button" 
                        onClick={ ()=>removeListItem(datelist[idx])}
                      >
                        Remove 
                      </button>
                    </div>
                  ))}
              </div>
            ); }}
      </FieldArray>
      <ErrorMessage name={name} component={TextError_Component}/>             
    </div>  
  );
}








//   //const {values} = form; 
//   console.log('vals-> ' ,values)
  
//  // options.push('1/1/1111')
//   const formikProps = useFormik({});

//   //console.log(options,' fld: ' ,field, ' meta-> ', meta, ' helpers-> ',  helpers);

//   console.log('extra props -> ', extraProps)
//   function isValidDate(val){
//     const dateRegex = / { [0-9] | [11|12] } /;
//     return true
//   }

  
//   function handleClick(val){
//     let dates = [] //[...options];
//     let attemptedDate = field.value;
//     console.log('clicked')
//       if(isValidDate(attemptedDate)){
        
//         dates.push(attemptedDate);
//         console.log('added ', attemptedDate, ' dates-> ', dates);
//         console.log('formikProps ->' , formikProps);
//         //console.log(dates)
//         update(dates);
//         formikProps.setFieldValue(displayFrom, '')
        
//     }

   
//   }

//   function NotEmpty(){
//     return(
//       (props) => {
//           console.log("FieldArrayProps --> ",props)

//           return(
            
            
//             <div> {
//                 options.map( (currNum, idx) => (
//                   <div key={idx}>
//                       <Field id='options' name={`options[${idx}]`} className="mx-3"  />

//                       { options.length>1 && (
//                         <button  className='btn btn-danger' type="button" onClick={()=>remove(idx)}>
//                           {' '} - {' '}
//                         </button>
//                       )} 
//                         <button className="btn btn-success" type="button" onClick={
//                           ()=> {
//                           if(options[idx].length >= 7 ){
//                             push('') }
//                           }} >
//                              {' '} + {' '}
//                           </button>
                      
//                   </div>
//                 ))
//               }


//             </div>
//           );
//         }
//     );
//   }

//   return (
//     <div> 
//       <button type='button' onClick={
//       (e)=>{console.log('clicked'); extraProps.setFieldValue(name, 'SUCK MY PP')}
//     }> ADD DATE</button>

//       <Field name={name}>
//           {
//             ({form, field})=>{
//               const {setFieldValue} = form;
//               const {value} = field;
//               return (
//                 <div>
//                 <DateView
//                   id={name}
//                   {...field}
//                   {...rest}
//                   selected={value}
//                   onChange={ val => setFieldValue(name, val)}
//                 />
//                 </div>
//               )
//             }
//           }
//         </Field>

//     <FieldArray name={name} id={name} className="mx-3" >
//                    {!options.length>0? <>EMPTY</> : <NotEmpty />} 
                    
//     </FieldArray>
//     </div>
//   )
// }


//     // <div className='form-control'>
//     //   <label htmlFor={name}>{label}</label>
//     //   <button className='btn btn-dark m-2' type='button'
//     //   onClick={ (val)=>{handleClick(val)}  }> click to add</button>
//     //     <Field name={name}>
        
//     //     </Field>
//     //     <div className='container m-3'>
//     //       {options}
//     //     </div>
//     //     <ErrorMessage name={name} component={TextError_Component} />

//     //   </div>



//MOST RECENT
{/* <div id='text box scrollable with list'>
        {/* <FieldArray> */}
      //   <FieldArray name={fieldArrayName} id={fieldArrayName} className="mx-3" >
      //   {
      //     (fieldArrayProps) => {
      //       console.log("FieldArrayProps --> ",fieldArrayProps)
      //       const {push, remove, form} = fieldArrayProps; 
      //       const {values} = form; 
      //       const {fieldArrayName} = values;
      //       return(
      //         <div>
      //           <InputForList />
      //           { 
      //             fieldArrayName.map( (currNum, idx) => (
      //               <div key='idx'>
      //                   <Field id='fieldArrayName' name={`fieldArrayName[${idx}]`} className="mx-3"  />

      //                   { fieldArrayName.length>1 && (
      //                     <button  className='btn btn-danger' type="button" onClick={()=>remove(idx)}>
      //                       {' '} - {' '}
      //                     </button>
      //                   )} 
      //                     <button className="btn btn-success" type="button" onClick={
      //                       ()=> {
      //                       if(fieldArrayName[idx].length >= 7 ){
      //                         push('') }
      //                       }} >
      //                           {' '} + {' '}
      //                       </button>
                        
      //               </div>
      //             ))
      //           }  
      //         </div>
      //       );
      //     }
      //   } 
      //   </FieldArray>

      // </div> */}