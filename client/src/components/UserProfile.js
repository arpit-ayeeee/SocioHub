import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from "../App";
import {useParams} from 'react-router-dom';

const UserProfile = () => {
   const {state, dispatch} = useContext(UserContext)
   const [showFollow, setshowfollow] = useState(true);                  //For changing the buttons from follow to unfollow once the user follws the other user
   const [data, setData] = useState(null);
   const {userid} = useParams();            //This hook is used to get the parameter from the url
   console.log(userid);
   useEffect(() => {
      fetch(`/user/${userid}`, {
         method: "get",
         headers:{
               "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            }
      })
      .then(res=>res.json())
      .then(result => {
        setData(result);
      })
   },[])

   const followUser = () => {
       fetch('/follow', {
           method: "put",
           headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                followId : userid
            })
       })
       .then(res => res.json())
       .then(data => {    
            console.log(data);
            dispatch({type:"UPDATE", payload:{following: data.following, followers: data.followers}})   //Cause we need to update the state as well
            localStorage.setItem("user", JSON.stringify(data))              //Cause when we follow a user, the backend returns the current user's updated data, so we'll update the state and localstorage
            setData((prevState) => {                                    //Now we need to make the current user's data dynamic
                return{                                                     //So we'll update the user's state with new one
                    ...prevState,                                           //We'll take previous state, and append the new user's data
                    user: {                                                   //In the new user's data, we'll change the prev state
                        ...prevState.user,                                    //AND IN NEW USER'S DATA, WE'LL ADD THE CURRENT USER'S ID IN THE FOLLOWERS PART OF THAT USER
                        followers: [...prevState.user.followers,data._id]
                    }
                }
            })
            setshowfollow(false);
       })
   }
   const unfollowUser = () => {
    fetch('/unfollow', {
        method: "put",
        headers: {
         "Content-Type":"application/json",
         "Authorization":"Bearer "+ localStorage.getItem("jwt") 
         },
         body: JSON.stringify({
             unfollowId : userid
         })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
            dispatch({type:"UPDATE", payload:{following: data.following, followers: data.followers}})   //Cause we need to update the state as well
            localStorage.setItem("user", JSON.stringify(data))              //Cause when we follow a user, the backend returns the current user's updated data, so we'll update the state and localstorage
            setData((prevState) => {                                    //Now we need to make the current user's data dynamic
            const newFollower = prevState.user.followers.filter(item => item !== data._id) //We'll take all the followers of that user, except the current user
                return{                                                     
                    ...prevState,                                           //We'll take previous state, and append the newFollower data
                    user: {                                                   //In the new user's data, we'll change the prev state
                        ...prevState.user,                                    //AND IN NEW USER'S DATA, we'll put the newFollower data
                        followers: newFollower
                    }
                }
            })
            setshowfollow(true);
    })
}
    return(
        <div>
        {data ?             //We'll check is userdata is present, then only we'll show the content
        <div style={{maxWidth:"750px", margin:"0px auto"}}>                                                
           <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}} className="DpNameDiv">
               <div className="DpDiv">
                   <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                         />
               </div>
               <div className="NameDiv left">
                     <h4>{data.user.name}</h4>
                     <h5>{data.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between", width:"108%", marginBottom:"5px"}}>
                        <h6>{data.posts.length} posts</h6>
                        <h6>{data.user.followers.length} followers</h6>
                        <h6>{data.user.following.length} following </h6>
                    </div>
                    {
                        showFollow?                                 
                        state._id === data.user._id ?               //Means the current user should now follow itself
                        null
                        :
                        <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => followUser()} style={{margin:"10px"}}>Follow</button>
                        :
                        <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => unfollowUser()} style={{margin:"10px"}}>Unfollow</button>
                    }
               </div>
           </div>
           <div className="galleryDiv">
                {
                   data.posts.map((item) => {
                      return(
                        <div>
                           <img className="item" src={item.photo} alt="User's posts" key={item._id}/>
                        </div>
                      )
                   })
                }
           </div>
        </div>
        : <h2> Loading ...</h2>}
       </div>
    )
}

export default UserProfile;