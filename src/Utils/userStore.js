import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice";

const store = configureStore({
    reducer: {
        userReducer: userReducer
    }
});

export default store;