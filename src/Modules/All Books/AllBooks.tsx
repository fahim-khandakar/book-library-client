import { useGetBooksQuery } from "@/Redux/features/api/book";
import BooksTable from "./partials/BooksTable";
import Loading from "@/Components/Loading/Loading";

const AllBooks = () => {
  const { data: allBooks, isLoading } = useGetBooksQuery({});

  const handleEdit = () => {
    console.log("Edit book:");
    // Add your edit logic here
  };

  const handleDelete = (isbn: string) => {
    console.log("Delete book with ISBN:", isbn);
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log("allBooks", allBooks);
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

          <BooksTable
            books={allBooks?.data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
};

export default AllBooks;
