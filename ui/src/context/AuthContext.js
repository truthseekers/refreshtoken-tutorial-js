import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext([{}, () => {}]);

// What to store in localstorage? See POSTman and what requests look like.

// Can't deal with useEffect right now. Hate React lol.
// function getInitialState() {
//   const token = localStorage.getItem("token");
//   console.log("getInitialState: ", token);

//   return token ? JSON.parse(token) : {};
// }

const AuthProvider = (props) => {
  // const [token, setToken] = useState(getInitialState); // maybe without ()
  // const [refreshToken, setRefreshToken] = useState(
  //   localStorage.getItem("refreshToken")
  // );
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const fetchCurrentUser = async () => {
    // console.log("token in fetchCurrentUser: ", token);

    try {
      const asyncResponse = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + "users/me",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // (Needs to be access token)
            // Authorization: `Bearer ${token}`, // (Needs to be access token)
          },
        }
      );
      console.log("fetchCurrentUser results: ", asyncResponse);
    } catch (error) {
      console.log("ERROR in fetchCurrentUser: ", error);

      // accessToken is expired so try the refresh.

      // set isRefresh: true.
      // setAuth({
      //   ...auth,
      //   isRefresh: true,
      // });
      localStorage.setItem("isRefresh", true);

      if (localStorage.getItem("isRefresh")) {
        // if is refresh, try to create a new accesstoken with the refresh route.
        try {
          const asyncRefreshResponse = await axios.get(
            process.env.REACT_APP_API_ENDPOINT + "users/token",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          );

          console.log(
            "Setting refreshed AccessToken now. refresh response: ",
            asyncRefreshResponse
          );
          localStorage.setItem("token", asyncRefreshResponse.data.accessToken);
          localStorage.setItem("isRefresh", false);
          // setToken(asyncRefreshResponse.data.accessToken);
          // fetchCurrentUser(); /// COMMENT THIS OUT TO TEMP FIX THE INFINITE LOOP
        } catch (error) {
          console.log("Error of refresh response: ", error);
        }
      }

      // console.log("testing isRefresh value", localStorage.getItem("isRefresh"));

      // Because the current accessToken is expired, we will now try to see if we can refresh the users token.
    }
  };

  useEffect(
    () => {
      // console.log("useEffect.. setting auth to: ", token);
      // localStorage.setItem("token", JSON.stringify(token));
      fetchCurrentUser();
    },
    [
      /*token*/
    ]
  );

  return (
    <AuthContext.Provider
      value={
        {
          /*token, setToken*/
        }
      }
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
