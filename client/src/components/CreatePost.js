import React, {useState, useEffect} from 'react';
import M from "materialize-css";
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
    const history = useHistory(); 
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {                                    //We'll use this function, with the base condition that if url changes, then only the method inside will start operating. So, that when the images is uploaded to cloudinary, and we get the url then only this process will start
        if(url){
            fetch("/createpost", {                       //Then uploading the data into the backend database
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt")          //Since we saved the user's token and data in login page when logged in to the localstorage, we'll use it to provide token to the middleware in the backend
                },
                body: JSON.stringify({
                    title: title,
                    pic: url
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, classes:"#c62828 red darken-3"});    //Usage of toast if we get an error after sending the data
                }
                else{
                    M.toast({html:"Posted succesfully", classes:"#43a047 green darken-1"});
                    history.push('/');                                              //This will redirect user to the home screen
                }
            })
            .catch(err => console.log(err));
        }
    }, [url])//This is the base condition
   
    //Here we'll make a method first to upload the image in cloudinary and then send the data plus image url to the backend database
    const postDetails = () => {                                                      
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
    
    return(
        <div className="card input-filed" style={{margin:"150px auto", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
            <h2 className="createPostHeader">Add post</h2>
            <input type="text" placeholder="Caption" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <div className="file-field input-field">                 {/*For adding the image file to upload */}
                <div className="btn  #64b5f6 green darken">
                    <span>Upload image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => postDetails()}>Upload post</button>
        </div>
    )
}


export default CreatePost;