import { configureStore } from "@reduxjs/toolkit";
import slicereducer from './redux_slice';

const redux_store = configureStore({

    reducer: {
        search_result: slicereducer,
    },
});

export default redux_store;