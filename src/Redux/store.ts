import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import bookCreateModalSlice from "./features/slice/BookCreateModalSlice";
import bookEditModalSlice from "./features/slice/BookEditModalSlice";
import borrowCreateSlice from "./features/slice/BorrowModalSlice.ts";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    bookCreateModal: bookCreateModalSlice,
    bookEditModal: bookEditModalSlice,
    borrowCreateModal: borrowCreateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
