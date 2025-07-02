import { createSlice } from "@reduxjs/toolkit";

interface BooleanState {
  value: boolean;
  id: string;
}

const initialState: BooleanState = {
  value: false,
  id: "",
};

const borrowCreateSlice = createSlice({
  name: "boolean",
  initialState,
  reducers: {
    setBorrowModalTrue: (state, action) => {
      state.value = true;
      state.id = action.payload;
    },
    setBorrowModalFalse: (state) => {
      state.value = false;
      state.id = "";
    },
  },
});

export const { setBorrowModalFalse, setBorrowModalTrue } =
  borrowCreateSlice.actions;

export default borrowCreateSlice.reducer;
