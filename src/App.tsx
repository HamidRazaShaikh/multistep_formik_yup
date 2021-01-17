import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainForm from "./components/mainForm";
import SignUp from "./components/signup";

export default function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({});


  return (
    <div>
      <Router>
        <Switch>
         
          <Route path="/">
            {!isSignup ? (
              <SignUp setIsSignup={setIsSignup} setUser={setUser} />
            ) : (
              <MainForm userData={user} />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
