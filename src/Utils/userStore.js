import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice";
import movieReducer from "../Utils/movieSlice";

const store = configureStore({
    reducer: {
        userReducer: userReducer,
        movieReducer: movieReducer
    }
});

export default store;