import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import {UserContext} from '../App';

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory(); 
    const renderList = () => {
        if(state){
            return [
                <div>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/createpost">Create</Link></li>
                    <li><Link to="/home">Explore</Link></li>
                    <li>
                        <button className ="btn #c62828 red darken-3" style={{marginRight:"10px"}} 
                            onClick={() => {
                                localStorage.clear();               //Since we're logging out, we'll clear the user jwt data
                                dispatch({type:"CLEAR"})            //And we'll also clear the context api state, by dispatching clear
                                history.push('/signup');
                            }}>
                            Logout
                        </button>
                    </li>
                </div>
            ]
        }
        else{
            return[
                <div>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </div>
            ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/":"/signup"} className="brand-logo left">SocioHub</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;