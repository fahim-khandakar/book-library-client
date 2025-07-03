/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleBookQuery } from "@/Redux/features/api/book";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Hash, Calendar, ArrowLeft, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import BookDetailsLoading from "./partials/BookDetailsLoading";
import BookNotFound from "./partials/BookNotFound";

const BookDetails = () => {
  const { id } = useParams();
  const { data: singleBook, isLoading } = useGetSingleBookQuery({ id });

  if (isLoading) {
    return <BookDetailsLoading />;
  }

  const book = singleBook?.data;

  if (!book) {
    return <BookNotFound />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Back Button */}
          <NavLink to="/books">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </NavLink>

          {/* Book Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Book Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-3xl">{book.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 text-lg">
                        <User className="h-5 w-5" />
                        <span>by {book.author}</span>
                      </CardDescription>
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          ISBN: {book.isbn}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge
                        variant="secondary"
                        className={getGenreColor(book.genre)}
                      >
                        {book.genre}
                      </Badge>
                      <Badge
                        variant={book.available ? "default" : "destructive"}
                      >
                        {book.available ? "Available" : "Not Available"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Added on {formatDate(book.createdAt)}</span>
                    {book.updatedAt !== book.createdAt && (
                      <>
                        <span>•</span>
                        <span>Updated {formatDate(book.updatedAt)}</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats & Actions */}
            <div className="space-y-6">
              {/* Copy Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {book.copies + book.totalBorrowedQuantity}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Copies
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {book.remainingCopies}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {book.totalBorrowedQuantity}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Currently Borrowed
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Borrow History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Borrow History</span>
                <Badge variant="secondary">
                  {book.borrowHistory?.length || 0}
                </Badge>
              </CardTitle>
              <CardDescription>
                Complete history of all borrow transactions for this book
              </CardDescription>
            </CardHeader>
            <CardContent>
              {book.borrowHistory && book.borrowHistory.length > 0 ? (
                <div className="space-y-4">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Borrow Date</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {book.borrowHistory.map((borrow: any) => {
                          const borrowDate = new Date(borrow.createdAt);
                          const dueDate = new Date(borrow.dueDate);
                          const isOverdue = new Date() > dueDate;
                          const duration = Math.ceil(
                            (dueDate.getTime() - borrowDate.getTime()) /
                              (1000 * 60 * 60 * 24)
                          );

                          return (
                            <TableRow key={borrow._id}>
                              <TableCell>
                                {formatDate(borrow.createdAt)}
                              </TableCell>
                              <TableCell>
                                {formatDate(borrow.dueDate)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {borrow.quantity}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    isOverdue ? "destructive" : "default"
                                  }
                                >
                                  {isOverdue ? "Overdue" : "Active"}
                                </Badge>
                              </TableCell>
                              <TableCell>{duration} days</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {book.borrowHistory.map((borrow: any) => {
                      const borrowDate = new Date(borrow.createdAt);
                      const dueDate = new Date(borrow.dueDate);
                      const isOverdue = new Date() > dueDate;
                      const duration = Math.ceil(
                        (dueDate.getTime() - borrowDate.getTime()) /
                          (1000 * 60 * 60 * 24)
                      );

                      return (
                        <Card key={borrow._id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <Badge variant="outline">
                                Quantity: {borrow.quantity}
                              </Badge>
                              <Badge
                                variant={isOverdue ? "destructive" : "default"}
                              >
                                {isOverdue ? "Overdue" : "Active"}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Borrowed:
                                </span>
                                <span>{formatDate(borrow.createdAt)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Due:
                                </span>
                                <span>{formatDate(borrow.dueDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Duration:
                                </span>
                                <span>{duration} days</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    No borrow history available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
