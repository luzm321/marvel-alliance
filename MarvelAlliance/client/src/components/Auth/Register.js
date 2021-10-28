import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../../modules/authManager";
import { Button, FormGroup,  FormControl, FormLabel, TextField } from '@mui/material';
import "./Register.css";
import MarvelAlliance2 from "../../images/MarvelAlliance2.PNG";


export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  //const [dateCreated, setDateCreated] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, userName, email };
      register(userProfile, password)
        .then(() => {
            localStorage.setItem("userEmail", email);
            history.push("/");
        });
    }
  };

  return (
    <div className="regBgd">
        <div>
            <img className="avatar" src={MarvelAlliance2} alt="Marvel Alliance" />
        </div>
        <form onSubmit={registerClick}>
            <FormControl>
                <fieldset className="fieldReg">
                    <FormGroup>
                        <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="labelReg" htmlFor="firstName">First Name:</FormLabel><br/>
                        <TextField className="inputReg" id="firstName" type="text" autoFocus onChange={e => setFirstName(e.target.value)} /><br/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="labelReg" htmlFor="lastName">Last Name:</FormLabel><br/>
                        <TextField className="inputReg" id="lastName" type="text" autoFocus onChange={e => setLastName(e.target.value)} /><br/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="labelReg" htmlFor="userName">Username:</FormLabel><br/>
                        <TextField className="inputReg" id="userName" type="text" autoFocus onChange={e => setUserName(e.target.value)} /><br/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="labelReg" htmlFor="email">Email:</FormLabel><br/>
                        <TextField className="inputReg" id="email" type="text" onChange={e => setEmail(e.target.value)} /><br/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="labelReg" htmlFor="password">Password:</FormLabel><br/>
                        <TextField className="inputReg" id="password" type="password" onChange={e => setPassword(e.target.value)} /><br/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel style={{ color: "black", fontFamily: "Kaushan Script, cursive" }} className="labelReg" htmlFor="confirmPassword">Confirm Password:</FormLabel><br/>
                        <TextField className="inputReg" id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} /><br/>
                    </FormGroup>
                        <FormGroup>
                        <Button style={{ fontFamily: "Kaushan Script, cursive" }} type="submit" variant="contained" color="secondary">Register</Button>
                    </FormGroup><br/><br/>
                </fieldset>
            </FormControl>
        </form>
    </div>
  );
}