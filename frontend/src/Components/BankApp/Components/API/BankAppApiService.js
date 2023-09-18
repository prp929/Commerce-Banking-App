import { apiClient } from "./ApiClient";



/************************* GET ****************************** */
export const retrieveAllTransactionsForUsernameApi = (
  (username) =>  
    apiClient.get(`/transactions/${username}/getTransactions`) 
); 

export const retrieveTransactionApi = (
  (id) =>  
    apiClient.get(`/transactions/${id}/getTransaction`) 
);


export const getValidId = (
  () =>   
    apiClient.get(`/getNumTransactions`)   
);

/************************* DELETE ****************************** */

export const deleteSpecificTransactionApi = (
  (id) =>  
    apiClient.delete(`/transactions/deleteTransaction/${id}`) 
); 

/************************* POST ****************************** */
export const createNewTransaction = (
  (transaction) => apiClient.post(`/transactions/createTransaction`, transaction) );
  
/************************* PUT ****************************** */
export const updateTransactionListApi = ( 
  (username, id, transaction) => apiClient.put(`/transactions/${username}/updateTransaction/${id}`,
  transaction) );

  export const updateAllTransactionsForChangedUsernameApi = ( 
    (oldName, newName) => apiClient.put(`/transactions/${oldName}/${newName}/updateAll`) );

  



