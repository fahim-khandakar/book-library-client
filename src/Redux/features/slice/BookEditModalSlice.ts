import { createSlice } from "@reduxjs/toolkit";

interface BooleanState {
  value: boolean;
  id: string;
}

const initialState: BooleanState = {
  value: false,
  id: "",
};

const bookEditModalSlice = createSlice({
  name: "boolean",
  initialState,
  reducers: {
    setEditModalTrue: (state, action) => {
      state.value = true;
      state.id = action.payload;
    },
    setEditModalFalse: (state) => {
      state.value = false;
      state.id = "";
    },
  },
});

export const { setEditModalFalse, setEditModalTrue } =
  bookEditModalSlice.actions;

export default bookEditModalSlice.reducer;
