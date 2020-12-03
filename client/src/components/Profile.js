import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from "../App";

const Profile = () => {
   const {state, dispatch} = useContext(UserContext)
   const [data, setData] = useState([]);
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
    return(
       <div style={{maxWidth:"750px", margin:"0px auto"}}>                                                
           <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}} className="DpNameDiv">
               <div className="DpDiv">
                   <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                         />
               </div>
               <div className="NameDiv left">
                     <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following </h6>
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