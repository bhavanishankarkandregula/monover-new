import React, { createContext, useState, useEffect } from "react"
import axios from "axios"
import { url } from "../GlobalUrl"
export const UserContext = createContext()

export const UserProvider = (props) => {
  const initialState = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    // organisation_name: "",
    profile_picture:
      "https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6",
    user_type: ""
    // organisation:'',
    // mobile_number:'',
  }

  const [userData, setUserData] = useState(initialState)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (localStorage.getItem("token")) {
      axios
        .get(url + "/api/token/user/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          // console.log("res", res.data);
          setUserData(res.data)
          res.data.profile_picture !== null &&
            localStorage.setItem("pic", res.data.profile_picture)
        })
        .catch((error) => {
          console.log(error)
        })

      if (userData.profile_picture == "") {
        userData.profile_picture =
          "https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6"
      }
    }
  }, [])

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  )
}
