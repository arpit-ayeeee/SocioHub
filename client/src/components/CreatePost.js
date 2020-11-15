import React, {useState} from 'react';
import M from "materialize-css";
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
    const history = useHistory(); 
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    //Here we'll make a method first to upload the image in cloudinary and then send the data plus image url to the backend database
    const postDetails = () => {                                                      
        const data = new FormData()                                     //First posting to cloudinary 
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
        
        fetch("/createpost", {                              //Then uploading the data into the backend database
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                pic: url
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"});         //Usage of toast if we get an error after sending the data
            }
            else{
                M.toast({html:"Posted succesfully", classes:"#43a047 green darken-1"});
                history.push('/');                 //This will redirect user to the home screen
            }
        })
        .catch(err => console.log(err));
    }

    
    return(
        <div className="card input-filed" style={{margin:"150px auto", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
            <h2 className="createPostHeader">Add post</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)}/>
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