import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    showSearch: false,
    searchRes : {
      movieNames: null,
      movieResults : null,
    },
  },
  reducers: {
    TogggleShowSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
    addResMovies : (state,action)=>{
      state.searchRes = action.payload;
    }
  },
});
export const { TogggleShowSearch, addResMovies } = searchSlice.actions;
export default searchSlice.reducer;
