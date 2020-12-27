import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from "../App";

const Profile = () => {
   const {state, dispatch} = useContext(UserContext)
   const [data, setData] = useState([]);
   const [image, setImage] = useState('');
   useEffect(() => {
      fetch("/myposts", {
         method: "get",
         headers:{
               "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            }
      })
      .then(res => res.json())
      .then(result => {
         setData(result.mypost);
      })
   },[])
   useEffect(() => {             //As soon as we get the image, we'll upload it to cloudinary
      if(image){
         const data = new FormData()                                                //First posting to cloudinary 
        data.append("file",image)
        data.append("upload_preset","InstaClone")
        data.append("cloud_name","arpitig-clone")
        fetch("https://api.cloudinary.com/v1_1/arpitig-clone/image/upload",{
            method:"post",
            body:data
        })
        .then(res => res.json())
        .then(data => {                            //Then we'll update local storage and state, but this will only update the current state, not the database pic
            console.log(data)      
            //BELOW LINES WILL UPDATE THE DATABASE
            fetch("/updatePic",{                   //Then we'll update the database
               method:"PUT",
               headers: {
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+ localStorage.getItem("jwt") 
                  },
               body:JSON.stringify({
                  pic: data.url
               })
            })
            .then(res => res.json())
            .then((result) => {
               console.log(result);
               //BELOW TWO LINE WILL ONLY UPDATE THE CURRENT STATE AND LOCAL STORAGE
               localStorage.setItem('user',JSON.stringify({...state, pic: result.pic}))
               dispatch({type:"UPDATEDP", payload:result.pic})  
               window.location.reload();           //So the page will reload atlast, before uploading it to the backend
            })
            
         })
        .catch(err => {
            console.log(err);
        }) 
      }
   },[image])
   const updatePic = (file) => {
      setImage(file);
   }
    return(
       <div style={{maxWidth:"750px", margin:"0px auto"}}>   
         <div style={{ margin:"18px 0px", borderBottom:"1px solid grey"}}>    {/* For the user section */}                                       
           <div style={{display:"flex", justifyContent:"space-around"}} className="DpNameDiv">
               <div className="DpDiv">
                  <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src={state?state.pic: "Fetching"}
                  />
               </div>
               <div className="NameDiv left">
                     <h4>{state?state.name:"loading"}</h4>
                     <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
                        <h6>{data.length} posts</h6>
                        <h6>{state?state.followers.length : "fetching"} followers</h6>
                        <h6>{state?state.following.length : "fetching" } following </h6>
                    </div>
               </div>
           </div>
            <div className="file-field input-field" style={{margin:"10px"}}>                 {/*For adding the image file to upload */}
                    <div className="btn  #64b5f6 green darken">
                        <span>Update dp</span>
                        <input type="file" onChange={(e) => updatePic(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
            </div>
         </div>
         <div className="galleryDiv">
                {
                   data.map((item) => {
                      return(
                        <div>
                           <img className="item" src={item.photo} alt="User's posts" key={item._id}/>
                        </div>
                      )
                   })
                }
         </div>
       </div>
    )
}

export default Profile;