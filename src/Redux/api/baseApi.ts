import { SERVER_URL } from "@/shared/config/secret";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
  }),
  tagTypes: ["book", "borrow"],
  endpoints: () => ({}),
});

export default baseApi;
