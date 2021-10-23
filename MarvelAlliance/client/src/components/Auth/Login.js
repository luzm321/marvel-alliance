import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { login } from "../../modules/authManager";
import { Button, FormGroup,  FormControl, FormLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import "./Login.css";

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {history.push("/"); localStorage.setItem("userEmail", email)})
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div className="loginBgd">
        <div>
            <img className="avatar" src="./images/MarvelAlliance2.PNG" alt="Marvel Alliance" />
        </div>

        <form onSubmit={loginSubmit}>
            <FormControl >
                <fieldset className="field">
                    <FormGroup>
                    <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="label" htmlFor="email">Email:</FormLabel><br/>
                    <TextField className="input" id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} placeholder="email..." />
                    </FormGroup>
                    <br/>
                    <FormGroup>
                    <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="label" htmlFor="password">Password:</FormLabel><br/>
                    <TextField className="input" id="password" type="password" onChange={e => setPassword(e.target.value)} placeholder="password..." />
                    </FormGroup>
                    <br/>
                    <FormGroup>
                    <Button style={{ fontFamily: "Kaushan Script, cursive" }} type="submit" variant="contained" color="success">Login</Button>
                    <IconButton aria-label="fingerprint" color="success">
                        <Fingerprint />
                    </IconButton>
                    </FormGroup>
                    <em className="reg">
                    Not registered? <br/> <Link className="regLink" to="register">Register</Link>
                    </em>
                </fieldset>
            </FormControl>
        </form>
    </div>
  );
}