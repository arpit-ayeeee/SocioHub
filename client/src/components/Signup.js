import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';
import M from "materialize-css";

const Signup = () => {
    const history = useHistory();                       //We'll use this to send the user back to the login page after the user is signed in succesfully
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const postData = () => {                            //This method will connect to to the backend
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){ //Will test the email, if it's wrong then it'll go inside
            M.toast({html: "Invalid Email", classes:"#c62828 red darken-3"});
            return;
        }
        fetch("/signup", {                              //We used proxy in package.json, this way we're fooling the client app to make request to 5000 port while it's running  in 3000, so that it can directly be send to the backend server
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"});         //Usage of toast if we get an error after sending the data
            }
            else{
                M.toast({html:data.message, classes:"#43a047 green darken-1"});
                history.push('/login');                 //This will redirect user to the login screen
            }
        })
        .catch(err => console.log(err));
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/> 
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postData()}>Sign Up</button>
                <h5><Link to="/login">Already have an account?</Link></h5>
            </div>
        </div>
    )
}

export default Signup;