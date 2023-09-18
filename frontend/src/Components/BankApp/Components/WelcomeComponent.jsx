import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { retrieveAllTransactionsForUsernameApi } from "./API/BankAppApiService";
import { getUserApi } from "./API/CustomerApiService";
import { useAuth } from "./Security/AuthContext";

import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';



export default function WelcomeComponent(){
  const localizer = momentLocalizer(moment);
  const [ monthInView, setMonthInView] = useState( (new Date()).getMonth() )
  const [eventList, setEventList] = useState([]);
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [info, setInfo] = useState('None Selected');
  const [infoSum, setInfoSum] = useState(0);
  const authContex = useAuth();
  const username = authContex.username;
  
  useEffect(
    ()=>{buildEventList()},
    [ ]
  )

  /************************************************************************************ */
  function buildEventList(){
    let list=[];
    let monthSum = 0;
    retrieveAllTransactionsForUsernameApi(username)
    .then( (resp)=> {
      let data = JSON.stringify(resp.data);
      data = JSON.parse(data);
      data.forEach( (curr, i)  => {
          let {description, amount, date, expense_option}=curr;
            let start = moment(date).toDate();
            let end = start;
            let title = description;
            let sign = expense_option? -1 : 1 ;
            let amt = (Number(sign)*Number(amount)).toFixed(2);
            list.push( {start, end, title, amt, sign}) ;
            if(start.getMonth() === (monthInView) ){
              monthSum +=  ( Number(sign)*Number(amount) );
            }
          
          setBudget(monthSum.toFixed(2));    
          setEventList(list);
        })
      })
    setBudget(monthSum);
    buildInfo(-1);
    getUserApi(username).then((resp)=> {
      let data = JSON.stringify(resp.data);
      data = JSON.parse(data);
      setBalance(data.balance);
  
    })
  }

  /****************************************************************************** */
  
  function buildInfo(e){
    let date;
    //Below code controls the left lower column display; info is var that pertains to the clicked transaction
    if(e===-1){
      date = (new Date()).getDate();
      setInfo('None Selected')
    } else {
      date = (e.start).getDate(); 
      let { amt, title} = e;
      let s = title + ': $' + amt.toString();
      setInfo( s );
    }
    
    let resp = '';
    let sum = 0;
    eventList.forEach( event => {
      if((event.start.getDate() === date) && event.start.getMonth()=== monthInView ){
        let {title, amt, sign} = event;
        resp += title +'\n';
        sum +=  ( Number(sign) * Number(amt) );
      }}) 
      setInfoSum(sum);
  }


/******************************************************************************************* */

    return (
      <div className="container my-2 mx-auto border border-secondary ">
        <div className="container-fluid  my-3 py-1 text-nowrap ">
          
{/* ***************************** Upper Row, Top *********************************************** */}
          <div className="row gx-2">
          <div className="col gy-1 fw-bold">
          { budget>=0 ? 
                <div className="container border border-3 border-success">
                  Monthly total cash flow: ${budget} <br/>You're doing great! Keep it up! 
                </div> 
                :
                <div className="container border border-3 border-danger">
                  Monthly total cash flow: ${budget}<br/>Oh no! Your balance is negative! 
                </div>
              }
          </div>

          <div className="col gy-1">
         
          { Number(balance) + Number(budget) >=0 ? 
                <div className="container border border-3 border-success">
                  Predicted end of month balance: ${ ( Number(balance) + Number(budget) ).toFixed(2) } <br/> Great job! 
                </div> 
                :
                <div className="container border border-3 border-danger">
                  Predicted end of month balance: ${(Number(balance) + Number(budget)).toFixed(2)}<br/> Examine you finances! 
                </div>
              }
          </div>      
        </div> 

{/* ***************************** Lower Row, Top *********************************************** */}

          <div className="row gx-2">
          
            <div className="col gy-2">
              { info.includes('-') ? 
                <div className="border border-3 border-warning ">
                  Selected Transaction: <br/> {info} 
                 </div> 
                 :
                <div className="border border-3 border-primary ">
                  Selected Transaction: <br/> {info} 
                </div>
              }
            </div>

            <div className="col gy-2">
            { infoSum>=0 ? 
                <div className="container border border-3 border-success">
                  Daily total cash flow: ${infoSum.toFixed(2)} <br/>Looks like you're winning today! 
                </div> 
                :
                <div className="container border border-3 border-danger">
                  Daily total cash flow: ${infoSum.toFixed(2)}<br/>Try hard to save! 
                </div>
              }
            </div>      
          </div> 
        </div>

        
{/* ***************************** Calendar *********************************************** */}
        <Calendar
          className='text-wrap'
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventList}
          style={{ height: "60vh" }}
          onNavigate={ nav => ( setMonthInView(nav.getMonth()) )}
          onSelectEvent={e=>{
            buildInfo(e); 
            setInfo(e.title + ": $" + e.amt);
          }}
          eventPropGetter={ 
            ({sign}) => {
            let newStyle = {
              backgroundColor: "lightgrey",
              color: 'black',
              borderRadius: "0px",
              border: "none"
            };
      
            if (sign==-1){
              newStyle.backgroundColor = '#FFCCCB';
            } else {
              newStyle.backgroundColor = '#90EE90';
            }
      
            return {
              className: "",
              style: newStyle} 
            }}
        />
      </div>
    );
  
}//End component

