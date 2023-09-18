import { useEffect, useState } from "react";
import { retrieveAllTransactionsForUsernameApi, deleteSpecificTransactionApi, getValidId } from "./API/BankAppApiService";
import { useAuth} from "./Security/AuthContext";
import { useNavigate} from "react-router-dom";
import { getUserApi } from "./API/CustomerApiService";
import '../BankApp.css'



export default function ListTransactionsComponent(){
  const[ transactions, setTransactions] = useState([]);
  const [validId, setValidId] = useState(-1);
  const[ message, setMessage] = useState(null);
  const[balance, setBalance] = useState(); 
  const[date, setDate] = useState({}); 
  const [month, setMonth] = useState(''); 
  const authContext = useAuth(); 
  const username = authContext.username;
  const navigate = useNavigate();
  

  useEffect(
    ()=> {
      setDate( new Date() ); 
      setMonth((new Date()).toLocaleString('default', { month: 'long' }))},
    []
  );
   useEffect(
    ()=> refreshTransactions() ,
    [ ,month ]
  );
 
 

  function setMonthDate(num){
    let currMonth= date.getMonth();
    let nextMonth ; 
   
    if(num==1){
      nextMonth = currMonth + 1;
    }else{
      nextMonth= currMonth - 1;
    }
    if(nextMonth==12){
      nextMonth=0;  
    }if(nextMonth==-1){
      nextMonth=11; 
    }
    if(nextMonth<10){ nextMonth = "0" + nextMonth}
    let temp = new Date( 2002, nextMonth, 15);
    setDate( temp);
    setMonth(temp.toLocaleString('default', { month: 'long' })); 
  }

  function refreshTransactions(){ 
    retrieveAllTransactionsForUsernameApi(username)
      .then(resp => {
        let data = JSON.stringify(resp.data);
        data = JSON.parse(data);
        let transList = [];
        data.forEach( currTrans => {
          let d = currTrans.date.substring(5,7);
          if(d == 1 + date.getMonth() ){
            transList.push(currTrans);
          }
        })
        transList.sort((a,b) =>  Date.parse(b.date)-Date.parse(a.date))
        setTransactions(transList);
      })
      .catch(error => console.log(' retrieveAll() ListTransactionsComponent failed; ', 
      error));
      getUserApi(username).then((resp)=> {
        let data = JSON.stringify(resp.data);
        data = JSON.parse(data);
        setBalance(data.balance);
      })
      getValidId().then( resp => {
        setValidId(resp.data+1) })
        .catch(e => console.log("error in getValidId transaction component ->", e));
  }


  
    function addNewTransaction(){
      let trans = {
        username:username,
        id: validId,
        amount:0, 
        description:'', 
        date:'',
        planned_option:'', 
        expense_option:'', 
        recur_option:''
      }
      navigate('/transaction/-1', {state : { transaction:trans, isNewComponent:true, validId:validId}})
    }

    function deleteTransaction(id,e){
      deleteSpecificTransactionApi(id)
      .then(
        ()=>{
          setMessage(`Deletion of item successful!`)
          refreshTransactions();
        }
      )
      .catch(error => console.log(error));
    }

    function updateTransaction(transaction){
      navigate(`/transaction/${transaction.id}`, 
      {state : { transaction:transaction, isNewComponent:false, validId:validId}} );
    }
    
    function MapListItems({list}){
      return (
       list.map((currTransaction, idx)=>
        (
        <tr key={currTransaction.id}>
          <td>{currTransaction.description}</td>
          <td>${currTransaction.amount.toFixed(2)}</td>
          <td>{String(currTransaction.recur_option)}</td>
          <td>{String(currTransaction.expense_option)}</td>
          <td>{String(currTransaction.planned_option)}</td>
          <td>{String(currTransaction.date)}</td>
          <td>
            <button className="btn btn-warning" 
              onClick={ (e)=>{deleteTransaction(currTransaction.id)} }>
              Delete 
            </button>
          </td>
          <td>
            <button className="btn btn-success" 
              onClick={ ()=>{ updateTransaction(currTransaction)} }>
              Update 
            </button>
          </td>
        </tr>
        ) 
      )
    ); 
  } 

  /*********************** JSX to be returned and rendered ***********************/
  return(
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={ ()=>{
                  // Add code to toggle month 
                  setMonthDate(-1);
                }}> <h1>-</h1>
                </button>
                  <h1> Your Transactions For: { month } </h1> 
                <button className="btn btn-outline-secondary" onClick={ ()=>{
                  // Add code to toggle month
                  setMonthDate(1);
                }}> <h1>+</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
          <div className="row d-flex justify-content-between">
            <div className="col-sm-4">
              <div className="card border-0">
                <div className="card-body">
                  <button className="btn btn-primary my-3" 
                      onClick={ ()=> addNewTransaction() }>
                        Add New Transaction
                  </button>
                </div>
              </div>
            </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h3 className='overflow-hidden'>
                  Balance: ${balance && balance.toFixed(2)} 
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      { message &&
      <div className="alert alert-warning">{message}</div> }
      
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description:</th>
              <th>Amount:</th>
              <th>Recurring?</th>
              <th>Expense?</th>
              <th>Planned?</th>
              <th>Date Applied:</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>  
          </thead>
          
          <tbody>

          <MapListItems list={transactions} /> 

          </tbody>
          
        </table>
      </div>
    </div>
   
    );

}
