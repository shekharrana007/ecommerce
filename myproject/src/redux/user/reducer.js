import { CLEAR_USER,SET_USER } from "./actions";
const initialState=null;
export const userReducer=(state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload; // Set user details from the action payload
        case CLEAR_USER:
            return initialState; // Clear user details
        default:
            return state; // Return the current state if no action matches
    }
};
export default userReducer;