import React, {useState, useContext} from 'react';
import {UserContext} from '../App';                         //We'll import the context from app.js, so that we'll update the state here so it'll we updated globally  
import {Link, useHistory} from 'react-router-dom';
import M from "materialize-css";

const Login = () => {
        const {dispatch} = useContext(UserContext);
        const history = useHistory();                       //We'll use this to send the user back to the login page after the user is signed in succesfully
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState('');
        const postData = () => {                            //This method will connect to to the backend
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){ //Will test the email, if it's wrong then it'll go inside
                M.toast({html: "Invalid Email", classes:"#c62828 red darken-3"});
                return;
            }
            fetch("/login", {                              //We used proxy in package.json, this way we're fooling the client app to make request to 5000 port while it's running  in 3000, so that it can directly be send to the backend server
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"});         //Usage of toast if we get an error after sending the data
                }
                else{
                    localStorage.setItem("jwt", data.token) //Now, when loggedin, the backend will return a token, we'll save that
                    localStorage.setItem("user", JSON.stringify(data.user)) //We'll also save the details of the user as it's returned too when the user is logged in 
                    dispatch({type:"USER", payload: data.user}); //So, once user is logged in this details, will go to reducer, and it'll have the updated state and data of the particular user logged in
                    M.toast({html:"LoggedIn succesfully", classes:"#43a047 green darken-1"});
                    history.push('/');                      //This will redirect user to the home screen
                }
            })
            .catch(err => console.log(err));
        }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <div className="card-icon">
                    <img class="auth-icon" src="/images/docshub.png"/>
                    <h2>oc's Hub</h2>
                </div>
                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className ="btn waves-effect waves-light #64b5f6 blue darken-1 auth-btn" onClick={() => postData()}>Login</button>
                <h5><Link to="/signup">Not a user?</Link></h5>
            </div>
        </div>
    )
}

export default Login;