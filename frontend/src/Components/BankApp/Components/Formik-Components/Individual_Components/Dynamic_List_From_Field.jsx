import { Field, ErrorMessage, useField, useFormik, FieldArray } from 'formik'
import TextError_Component from './TextError_Component'
import 'react-datepicker/dist/react-datepicker.css'

import DateView from 'react-datepicker'
import { useEffect, useState, useCallback } from 'react'

export default function Datelist_Component(props) {
  const {label, name, extraProps, datelist, setDatelist, ...rest} = props;
  
  const [inputField, setInputField] = useState(''); 
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  function addListItem(e){
    console.log('addListItem() ', inputField );
    let d = datelist;
    let isDuplicate = true;
    let i = 0;
    
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
    console.log('datelist is now: ', datelist)
    setInputField('');
  }

  function removeListItem(item){
    let d = datelist;
    var index = d.indexOf(item);
    console.log('rmv() -> ' , item, ' at ',index )
    if (index !== -1) {
      d.splice(index, 1);
    }
    setDatelist(d);
    forceUpdate();
  }

  function clearField(){
    console.log('clearfield()');
  }

  function verifyDate(val){
    console.log('verifyDate(); val-> ', val);
    return (val !== '');
  }

  return(
     
    <div className="form-control p-3" >
                  <div>
                  <label htmlFor='dateEntry' className="p-3"> {label}</label>

                  <input type="text" className='m-3' name='dateEntry' key='dataEntry' 
                    value={inputField}
                    onChange={ val => {setInputField(val.target.value); 
                     // console.log('val from input: ', val.target.value, ' dl is: ', datelist)
                    }}/>
                  
                  <button type='btn btn-success p-3' onClick={addListItem}> ADD DATE </button>
                  </div>
                
                  <FieldArray name={name} id={name} className="p-3" >
                    {
                      (fieldArrayProps) => {
                        
                        const {push, remove, form} = fieldArrayProps; 
                        const {values} = form; 
                        const {name} = values;
                      
                        //console.log("FieldArrayProps --> ", fieldArrayProps, ' name:', name, ' vals: ', values, ' datelist: ', datelist )
                        return(
                          <div >
                            {   
                              datelist.map( (currDate, idx) => ( currDate != '' &&
                                <div key={ `${name}[${idx}]`} className='my-3' >
                                    <Field id={name} name={`${name}[${idx}]`} className="mx-3"  
                                    value={currDate}/>
                                      <button  className='btn btn-danger ' type="button" 
                                        onClick={ ()=>removeListItem(datelist[idx])}
                                      >
                                        Remove 
                                      </button>
                                </div>
                              ))
                            }
                          </div>
                        );
                      }
                    }
                  </FieldArray>
                  
                  <ErrorMessage name={name} component={TextError_Component}/>
                
                </div>
    
  );
}

