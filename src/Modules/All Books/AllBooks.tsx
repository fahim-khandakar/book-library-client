import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/Redux/features/api/book";
import BooksTable from "./partials/BooksTable";
import Loading from "@/Widgets/Loading/Loading";
import { showToast } from "@/shared/helpers/showToaster";
import BookEdit from "../Book Edit/BookEdit";

const AllBooks = () => {
  const { data: allBooks, isLoading } = useGetBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    const result = await deleteBook({ id });
    showToast(result);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Books</h1>
            <p className="text-muted-foreground">
              Manage your book collection. Total books: {allBooks?.data?.length}
            </p>
          </div>

          <BooksTable books={allBooks?.data} onDelete={handleDelete} />
        </div>
      </main>
      <BookEdit />
    </div>
  );
};

export default AllBooks;
