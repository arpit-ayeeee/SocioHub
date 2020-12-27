import React, {useEffect, createContext, useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import Followedposts from './components/Followedposts';
import {BrowserRouter, Route, Switch, useHistory,} from 'react-router-dom';
import {userReducer, initialState} from './Reducers/userReducer';


export const UserContext = createContext();          //We'll create a context api, to provide the user's state of authentication and change it globally


const Routing = ()=>{
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {                 //We'll use this effect sabse pehle, so that if user is logged in then it'll be directed to home screen, else it'll go to login
    const user = JSON.parse(localStorage.getItem("user")); //Once any user is logged in the backend will return the token and details, which will be saved in the local storage, so this user will have that details parsed
    if(user){
      dispatch({type:'USER', payload:user});      //Since there is a user we need to update the state with it
    
    }
    else{
      history.push('/signup');
    }
  },[])
  return(
    <Switch>
        <Route exact path="/"><Followedposts /></Route> {/* So main page will be following posts page*/}
        <Route exact path="/home"><Home /></Route>    {/* And home page will be in explore section */}
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/signup"><Signup /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/createpost"><CreatePost /></Route>
        <Route exact path="/userprofile/:userid"><UserProfile /></Route>
        
    </Switch>
  )
}

const App = () => {
    const [state, dispatch] = useReducer(userReducer, initialState)   //Here userReducer is the function which'll return the updated state, and the initialState is the initial state 
    return (
      <UserContext.Provider value={{state, dispatch}} >               {/*We'll wrap everything with context api */}
        <BrowserRouter>
          <Navbar />
          <Routing />                                                 {/*Since we can't access the history outside the class, we made Routing outside and added it here, so now we can access the history of the user outside the class */}
        </BrowserRouter>
      </UserContext.Provider>
    );
}

export default App;
