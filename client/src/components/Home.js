import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../App';

const Home = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    useEffect(() => {
        fetch('/allposts',{
            method: "get",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setData(result.posts);                              //Because result is an object, inside which me have the posts array
        })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {          //We need to update the data, when the result comes after liking, so that the no of likes will be update that time only
                    if(item._id == result._id){
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(result => {
                const newData = data.map(item => {
                    if(item._id == result._id){
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return(
        <div className="home">
            {
                data.map((post) => {
                    return(
                        <div className="card home-card" key={post._id}>
                            <h5 style={{marginLeft:"5px", height:"50px", padding:"15px"}}>{post.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={post.photo}/>
                            </div>
                            <div className="card-content">
                                {/*We use this logic using the CONTEXT, so that if user has liked, then unlike is visible, and vice versa */}
                                {post.likes.includes(state._id)? 
                                    <i className="material-icons" onClick={() => {unlikePost(post._id)}}>thumb_down</i>
                                :
                                    <i className="material-icons" style={{marginRight: "3px"}} onClick={() => {likePost(post._id)}}>thumb_up</i>
                                }
                                <h6> {post.likes.length} likes</h6>                           {/* For the number of likes*/}
                                <h6><strong>{post.postedBy.name}</strong> {post.title}</h6>
                                <p>{post.body}</p>
                                <input type="text" placeholder="Add a comment" />
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Home;