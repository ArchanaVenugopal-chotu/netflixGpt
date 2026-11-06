import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name : "movie",
    initialState : {
        movieList: [],
    featuredMovie: null
    },
    reducers : {
        addMovies: (state, action) => {
            state.movieList = action.payload;
        },

        addFeaturedMovie: (state, action) => {
            state.featuredMovie = action.payload;
        }
    }
})

export const {addMovies, addFeaturedMovie} = movieSlice.actions
export default movieSlice.reducer