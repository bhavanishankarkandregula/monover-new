import axios from "axios"
import { url } from "../GlobalUrl"
// helper method to refresh token
export const refreshToken = async () => {
  // place request to backend service to refresh token
  const refresh_token = localStorage.getItem("refresh_token")
  if (
    !refresh_token &&
    !window.location.href.includes("/home") &&
    !window.location.href.includes("/login-form")
  ) {
    localStorage.setItem("token", null)
    localStorage.setItem("refresh_token", "")
    // return (window.location.href = "/login-form")
  }

  var bodyFormData = new FormData()
  bodyFormData.append("refresh", refresh_token)
  return axios({
    method: "post",
    url: url + "/api/token/refresh/",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then((res) => {
      localStorage.setItem("token", res.data.access)
      // update axios instance with new token
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`
    })
    .catch((err) => {
      console.log(err.response)
      throw err
    })
}

// // Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    console.log(
      `${config.method.toUpperCase()} Request made to ${config.url} with data:`,
      config.data
    )
    return config
  },
  function (err) {
    console.log(err)
    return Promise.reject(err)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log(response)
    const { status, data, config } = response
    console.log(`Response from ${config.url}:`, {
      code: status,
      ...data
    })
    return response
  },
  async function (error) {
    console.error(error)
    if (error.response) {
      const { status = 0, data } = error.response
      switch (status) {
        case 401:
          // window.alert(401)
          console.log(data.code === "token_not_valid", data.code)
          // check if 401 error was token
          if (data.code === "token_not_valid") {
            // token has expired;
            try {
              const config = error.config
              // attempting to refresh token;
              if (
                !config.url.includes("/api/token/refresh/") &&
                !window.location.href.includes("/home") &&
                !window.location.href.includes("/login-form")
              ) {
                await refreshToken()
                // token refreshed, reattempting request;
                // configure new request in a new instance;
                return await axios({
                  method: config.method,
                  url: config.url,
                  data: config.data
                })
              }
            } catch (e) {
              if (error.response) {
                const { data } = error.response
                if (
                  data.code === "token_not_valid" &&
                  !window.location.href.includes("/home") &&
                  !window.location.href.includes("/login-form")
                ) {
                  localStorage.clear()
                  return (window.location.href = "/home")
                }
              }
              return Promise.reject(error)
            }
          }
          return Promise.reject(error)
        default:
          return Promise.reject(error)
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error)
    }
  }
)
