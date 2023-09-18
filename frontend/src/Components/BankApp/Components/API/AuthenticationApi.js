import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService = (username, password) => (
  apiClient.post("/authenticate", {
      username,
      password
  })
)

// export const executeJwtAuthenticationService = (username, password) => (
//   apiClient.get(`/authenticate/${username}/${password}`)
// )
