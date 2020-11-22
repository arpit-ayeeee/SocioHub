//Here again, we got reducers whose function is to make change to the state and return the new updated state globally
//It take the state and the action which needs to be performed on the state and then return the new updated state.
export const initialState = null;

export const userReducer = (state, action) => {
    if(action.type == "USER"){
        return action.payload;
    }
    else{
        return state;
    }
}