import React, {useEffect, useState} from 'react';     
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';
import M from "materialize-css";

const Signup = () => {
    const history = useHistory();                       //We'll use this to send the user back to the login page after the user is signed in succesfully
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined);
    useEffect(() => {
        if(url){
            uploadFields();
        }
    },[url])
    const uploadProfilePic = () => {                                                      
        const data = new FormData()                                                 //First posting to cloudinary 
        data.append("file",image)
        data.append("upload_preset","InstaClone")
        data.append("cloud_name","arpitig-clone")
        fetch("https://api.cloudinary.com/v1_1/arpitig-clone/image/upload",{
            method:"post",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
        })
        .catch(err => {
            console.log(err);
        }) 
    }
    const uploadFields = () => {
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
                password: password,
                pic: url
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
    const postData = () => {                            //This method will connect to to the backend
        if(image){
            uploadProfilePic();
        }
        else{                               //Like if there is no profile picture uploaded, then we'll send the form
            uploadFields();
        }  
    }

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <div className="card-icon">
                    <img class="auth-icon" src="/images/docshub.png"/>
                    <h2>oc's Hub</h2>
                </div>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/> 
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="file-field input-field">                 {/*For adding the image file to upload */}
                    <div className="btn  #64b5f6 green darken">
                        <span>Upload profile picture</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className ="btn waves-effect waves-light #64b5f6 blue darken-1 auth-btn" onClick={() => postData()}>Sign Up</button>
                <h5><Link to="/login">Already a user?</Link></h5>
            </div>
        </div>
    )
}

export default Signup;