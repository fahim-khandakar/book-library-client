import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBorrowSummaryQuery } from "@/Redux/features/api/borrow";
import Loading from "@/Widgets/Loading/Loading";
import { BookOpen, Hash } from "lucide-react";

const BorrowSummary = () => {
  const { data: borrowBook, isLoading } = useGetBorrowSummaryQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row m-5 gap-5">
      {borrowBook?.data?.map(
        (
          book: {
            book: { title: string; isbn: string };
            totalQuantity: number;
          },
          index: number
        ) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">
                {book.book.title}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>ISBN: {book.book.isbn}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-medium">Borrowed Copies</span>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {book.totalQuantity}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default BorrowSummary;
