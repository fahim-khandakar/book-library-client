import baseApi from "@/Redux/api/baseApi";

const BookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: ({ fullData }) => {
        return {
          url: "/books",

          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["book"],
    }),
    getBooks: builder.query({
      query: () => {
        return {
          url: "/books",
        };
      },
      providesTags: ["book"],
    }),
    getSingleBook: builder.query({
      query: ({ id }) => {
        return {
          url: `/books/${id}`,
        };
      },
      providesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["book"],
    }),
    editBook: builder.mutation({
      query: ({ fullData, id }) => {
        return {
          url: `/books/${id}`,
          method: "PATCH",

          body: fullData,
        };
      },
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useEditBookMutation,
} = BookApi;
