import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Edit,
  Trash2,
  BookOpen,
  Calendar,
  User,
  Hash,
  HandHeart,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import type { Book } from "@/shared/config/types";
import { useDispatch } from "react-redux";
import { setEditModalTrue } from "@/Redux/features/slice/BookEditModalSlice";
import { setBorrowModalTrue } from "@/Redux/features/slice/BorrowModalSlice";

interface BooksTableProps {
  books: Book[];
  onDelete: (isbn: string) => void;
}

const BooksTable = ({ books, onDelete }: BooksTableProps) => {
  const dispatch = useDispatch();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      SCIENCE: "bg-blue-100 text-blue-800",
      FICTION: "bg-green-100 text-green-800",
      HISTORY: "bg-yellow-100 text-yellow-800",
      BIOGRAPHY: "bg-purple-100 text-purple-800",
      TECHNOLOGY: "bg-gray-100 text-gray-800",
    };
    return colors[genre] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Details</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.isbn}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{book.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {book.description}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ISBN: {book.isbn}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getGenreColor(book.genre)}
                    >
                      {book.genre}
                    </Badge>
                  </TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    <Badge variant={book.available ? "default" : "destructive"}>
                      {book.available ? "Available" : "Not Available"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(book.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch(setBorrowModalTrue(book?._id))}
                        className="cursor-pointer"
                      >
                        <HandHeart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dispatch(setEditModalTrue(book?._id))}
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Book</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{book.title}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(book._id)}
                              className="bg-red-600 hover:bg-red-700 "
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {books.map((book) => (
          <Card key={book.isbn}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{book.author}</span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(setBorrowModalTrue(book?._id))}
                    className="cursor-pointer"
                  >
                    <HandHeart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(setEditModalTrue(book?._id))}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Book</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{book.title}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(book.isbn)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {book.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className={getGenreColor(book.genre)}
                >
                  {book.genre}
                </Badge>
                <Badge variant={book.available ? "default" : "destructive"}>
                  {book.available ? "Available" : "Not Available"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{book.copies} copies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(book.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Hash className="h-3 w-3" />
                <span>ISBN: {book.isbn}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No books found</h3>
          <p className="text-muted-foreground">
            Add your first book to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default BooksTable;
