import React from 'react';

const Profile = () => {
    return(
       <div style={{maxWidth:"750px", margin:"0px auto"}}>                                                
           <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}} className="DpNameDiv">
               <div className="DpDiv">
                   <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                         />
               </div>
               <div className="NameDiv left">
                    <h4>Nicolas Penn</h4>
                    <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following </h6>
                    </div>
               </div>
           </div>
           <div className="galleryDiv">
                <img className="item"
                    src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                 />
                 <img className="item"
                    src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                 />
                 <img className="item"
                    src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                 />
                 <img className="item"
                    src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                 />
                 <img className="item"
                    src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                 />
                 <img className="item"
                    src="https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=758&q=80"
                 />
           </div>
       </div>
    )
}

export default Profile;