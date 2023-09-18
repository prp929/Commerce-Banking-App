import { apiClient } from "./ApiClient";

export const getAllUsersApi = (
  () =>  
    apiClient.get(`/users/all`) 
); 

export const getAllUserNamesApi = (
  () =>  
    apiClient.get(`/users/allNames`) 
);

export const getUserApi = (
  (username) =>  
    apiClient.get(`/users/${username}/getUser`) 
);  

export const deleteUserApi = (
  (username) =>  
    apiClient.delete(`/users/${username}/getName`) 
); 
 
export const updateUserApi = ( 
  (username, user) => apiClient.put(`/users/${username}/updateUser`, user)
);

export const createUserApi = ( 
  (user) => apiClient.post(`/users/createUser`, user)
);



