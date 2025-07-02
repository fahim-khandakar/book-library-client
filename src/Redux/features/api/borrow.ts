import baseApi from "@/Redux/api/baseApi";

const BorrowBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBorrow: builder.mutation({
      query: ({ fullData }) => {
        return {
          url: "/borrow",

          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => {
        return {
          url: "/borrow",
        };
      },
      providesTags: ["borrow"],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } =
  BorrowBookApi;
