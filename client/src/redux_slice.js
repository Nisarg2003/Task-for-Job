import { configureStore, createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: 'search_result',
    initialState: {
        searchResults: [],
        searchQuery: "",
    },
    reducers: {
        setSearchResults(state, action) {
            state.searchResults = action.payload || [];
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
    },
});
export const { setSearchQuery, setSearchResults } = Slice.actions;

export const fetchResults = (searchQuery) => async (dispatch) => {
    if (searchQuery) {
        try {
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json
&origin=*&srlimit=10&srsearch=${searchQuery}`);

            const data = await response.json()
            dispatch(setSearchResults(data.query.search))

        } catch (error) {
            console.log("Error in fetching data", error)
            dispatch(setSearchResults([]))
        }
    }
}

export default Slice.reducer;