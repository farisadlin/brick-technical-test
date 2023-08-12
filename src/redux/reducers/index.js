import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";

const rootReducers = combineReducers({
    cart: cartReducer
})

export default rootReducers