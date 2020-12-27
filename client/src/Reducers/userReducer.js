//Here again, we got reducers whose function is to make change to the state and return the new updated state globally
//It take the state and the action which needs to be performed on the state and then return the new updated state.
export const initialState = null;

export const userReducer = (state, action) => {
    if(action.type === "USER"){
        return action.payload;
    }
    if(action.type === "CLEAR"){     //For logging out
        return null;
    }
    if(action.type === "UPDATE"){
        return {                        //If the type is this, we'll return the updated state after appending the new schema type
            ...state, 
            followers: action.payload.followers,
            following: action.payload.following
        }
    }
    if(action.type === "UPDATEDP"){
        return{
            ...state,                       //Here we'll update the previous state and will override the pic
            pic : action.payload
        }
    }
    else{
        return state;
    }
}