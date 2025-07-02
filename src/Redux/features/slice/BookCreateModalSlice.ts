import { createSlice } from "@reduxjs/toolkit";

interface BooleanState {
  value: boolean;
}

const initialState: BooleanState = {
  value: false,
};

const bookCreateModalSlice = createSlice({
  name: "boolean",
  initialState,
  reducers: {
    setTrue: (state) => {
      state.value = true;
    },
    setFalse: (state) => {
      state.value = false;
    },
  },
});

export const { setTrue, setFalse } = bookCreateModalSlice.actions;

export default bookCreateModalSlice.reducer;
