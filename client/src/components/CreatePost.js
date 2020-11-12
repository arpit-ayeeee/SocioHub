import React from 'react';

const CreatePost = () => {
    return(
        <div className="card input-filed" style={{margin:"150px auto", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
            <h2 className="createPostHeader">Add post</h2>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Body" />
            <div className="file-field input-field">                 {/*For adding the image file to upload */}
                <div className="btn  #64b5f6 green darken">
                    <span>Upload image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className ="btn waves-effect waves-light #64b5f6 blue darken-1">Upload post</button>
        </div>
    )
}


export default CreatePost;