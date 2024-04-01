import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trendingMovies: null,
    // trendingShows: null,
    mainTrailerKey: null,
    mainTrailerInfo: {
      mId: null,
      title: null,
      overview: null,
    },
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addMainTrailerKey: (state, action) => {
      state.mainTrailerKey = action.payload;
    },
    addMainTrailerInfo: (state, action) => {
      state.mainTrailerInfo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    // addTrendingShows: (state, action) => {
    //   state.trendingShows = action.payload;
    // },
  },
});

export const {
  addNowPlayingMovies,
  addMainTrailerKey,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrendingMovies,
  addMainTrailerInfo,
} = moviesSlice.actions;
// addTrendingShows
export default moviesSlice.reducer;
