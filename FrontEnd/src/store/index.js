import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice"; 

const store = configureStore({
  reducer: {
    data: UserSlice, 
  },
});

export default store;
