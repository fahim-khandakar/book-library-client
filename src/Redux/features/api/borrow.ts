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
      invalidatesTags: ["book"],
    }),
    getBorrowSummary: builder.query({
      query: () => {
        return {
          url: "/borrow",
        };
      },
      providesTags: ["book"],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } =
  BorrowBookApi;
