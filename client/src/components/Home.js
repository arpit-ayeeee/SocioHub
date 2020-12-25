import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../App';
import {Link} from 'react-router-dom';

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
            console.log(result)
            setData(result.posts);                              //Because result is an object, inside which me have the posts array
        })
    }, [])

    const likePost = (postId) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                postId: postId
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {          //We need to update the data, when the result comes after liking, so that the no of likes will be update that time only
                    if(item._id === result._id){             //Means we'll be iterating over the items, and if it matches, we'll return the new result
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
    const unlikePost = (postId) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                postId: postId
            })
        })
        .then(res => res.json())
        .then(result => {
                const newData = data.map(item => {
                    if(item._id === result._id){
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
    const addComment = (postId, text) => {
        fetch('/addcomment', {
            method:"put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            },
            body: JSON.stringify({
                text: text,
                postId: postId
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if(item._id === result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method: 'delete',
            headers: {
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(post => {
                return post._id !== result._id
            })
            setData(newData)
        })
    }
    return(
        <div className="home">
            {
                data.map((post) => {
                    return(
                        <div className="card home-card" key={post._id}>
                            <h5 style={{marginLeft:"5px", height:"50px", padding:"15px"}}>
                                <Link to={"/userprofile/"+ post.postedBy._id}>{post.postedBy.name}</Link>       {/* So if user clicks on the post creater name, we'll pass the user's id to the userprofile route*/}
                                {
                                    post.postedBy._id == state._id ?
                                    <i className="material-icons" style={{float:"right"}} onClick={() => deletePost(post._id)}>
                                        delete
                                    </i>
                                    : null
                                } 
                            </h5>
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
                                {
                                    post.comments.map(comment => {
                                        return(
                                            <h6 key={post._id}>
                                                <span style={{fontWeight:"500"}}>{comment.postedBy.name}</span> {comment.text}
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    addComment(post._id, e.target[0].value)     //We dont need to add value and all, we can directly access the event
                                }}>
                                    <input type="text" placeholder="Add a comment"/>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Home;