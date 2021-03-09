import React, { useEffect, useState } from "react";
import { db, auth } from "./Firebase/firebase";
import { useStateValue } from "./ContextAPI/StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./Pages/Post/PostPage";
import General from "./Pages/GeneralHomePage/GeneralHomePage";
import ProfileHome from "./Pages/ProfileHomePage/ProfileHomePage";
import QuestionAndComments from "./Pages/QuestionAndCommentsPage/QuestionAndComments";
import GeneralHome from "./Pages/GeneralHomePage/GeneralHomePage";

import LookBook from "./Pages/LookBookPage/LookBookPage";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Register/Profile";
import SighIn from "./Pages/Register/SighIn";
import UploadPicture from "./Pages/UploadProfilePicture/UploadPicture";
import "./App.css";
function App() {
  const [openSignIn, setOpenSignIn] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged into the system
        console.log("AUTH-USER-app.js" + authUser);
        dispatch({
          type: "SET_USER",
          user: {
            person: authUser.displayName,
            email: authUser.email,
          },
        });
      } else {
        // log out user
        dispatch({
          type: "SET_USER",
          user: [],
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log("User is >>>>", user);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/lookBook" component={LookBook} />
          <Route exact path="/post" component={Post} />
          <Route
            exact
            path="/QuestionAndComments"
            component={QuestionAndComments}
          />
          <Route exact path="/generalHome" component={GeneralHome} />
          <Route exact path="/profileHome" component={ProfileHome} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/sighIn" component={SighIn} />
          <Route exact path="/uploadPicture" component={UploadPicture} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={General} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
