import { BookOpen } from "lucide-react";

const BookNotFound = () => {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Book not found</h3>
          <p className="text-muted-foreground">
            The book you're looking for doesn't exist.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BookNotFound;
