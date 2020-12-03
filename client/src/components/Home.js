import React, {useState, useEffect} from 'react';


const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/allposts',{
            method: "get",
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt") 
            }
        })
        .then(res => res.json())
        .then(result => {
            setData(result.posts);                              //Because result is an object, inside which me have the posts array
        })
    }, [])
    return(
        <div className="home">
            {
                data.map((user) => {
                    return(
                        <div className="card home-card" key={user._id}>
                            <h5 style={{marginLeft:"5px", height:"50px", padding:"15px"}}>{user.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={user.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color:"red"}}>favorite</i>
                                <h6><strong>{user.postedBy.name}</strong> {user.title}</h6>
                                <p>{user.body}</p>
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