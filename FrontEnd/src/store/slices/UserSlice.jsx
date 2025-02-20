import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    emp_data : {},
    att_info : {},
    all_emp_data : [],
}

const UserSlice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_emp_data : (state,actions) => {
      const payload = actions.payload
      state.emp_data = payload
    },
    set_att_info : (state,actions) => {
      const payload = actions.payload
      state.att_info = payload
    },
    set_all_emp_data : (state,actions) => {
      const payload = actions.payload
      state.all_emp_data = payload
    },
    update_att_info : (state,actions) => {
      const {data,category} = actions.payload
      state.att_info[category] = [data, ...state.att_info[category]];
    }
  },
});

export const { set_emp_data , set_att_info , set_all_emp_data , update_att_info} = UserSlice.actions; 
export default UserSlice.reducer;
