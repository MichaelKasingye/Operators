import React, { useEffect, useState } from "react";
import { db, auth } from "../../Firebase/firebase";
import firebase from "firebase";

import "./Register.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Container from "@material-ui/core/Container";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student, setStudent] = useState("");
  const [facilitator, setFacilitator] = useState("");

  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const logOut = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged into the system
        console.log("AUTH_REGISTER " + authUser);
        setUser(authUser);
      } else {
        // log out user
        setUser(null);
      }
    });
    return () => {
      logOut();
    };
  }, [user, name]);

  const signUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      return authUser.user.updateProfile({
        displayName: name,
      });
    });
    db.collection("AppUsers")
      .add({
        name: name,
        email: email,
        facilitator: facilitator,
        student: student,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => alert(error.message));
  };
  if (user) {
    history.push("/");
    window.location.reload();
  }

  return (
    <Container maxWidth="sm">
      <div className="regis">
        <div className="register">
          <h2>EDU ONLINE</h2>
          <p>Register</p>
        </div>
        <div className="reg-icon">
          <PeopleAltIcon className="icon" style={{ fontSize: 70 }} />
        </div>
        <form className="auth-form">
          <label className="reg-title">Username </label>

          <TextField
            id="outlined-basic"
            label="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />

          <label className="reg-title">Email</label>
          <TextField
            id="outlined-basic"
            label="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />

          <label className="reg-title">Password</label>
          <TextField
            id="outlined-password-input"
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />

          <label className="reg-title">Role</label>

          <div className="radio">
            <input
              type="radio"
              value="Student"
              onClick={(e) => setStudent(e.target.value)}
            />
            <label className="">Student</label>
            <br />
            <input
              type="radio"
              value="Facilitator"
              onClick={(e) => setFacilitator(e.target.value)}
            />
            <label className="">Facilitator</label>
            <br />
          </div>
          {user ? (
            <Button type="submit" onClick={() => auth.signOut()}>
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              onClick={signUp}
            >
              SignUp
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}
