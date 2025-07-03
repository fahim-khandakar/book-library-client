/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, BookCheck, CalendarIcon, BookOpen, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreateBorrowMutation } from "@/Redux/features/api/borrow";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Redux/store";
import { showToast } from "@/shared/helpers/showToaster";
import { setBorrowModalFalse } from "@/Redux/features/slice/BorrowModalSlice";
import { useGetSingleBookQuery } from "@/Redux/features/api/book";
import { useNavigate } from "react-router-dom";

const BorrowCreateModal = () => {
  const isOn = useSelector((state: RootState) => state.borrowCreateModal.value);
  const id = useSelector((state: RootState) => state.borrowCreateModal.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createBorrow, { isLoading }] = useCreateBorrowMutation();
  const { data: singleBook } = useGetSingleBookQuery({ id });

  const form = useForm({
    defaultValues: {
      quantity: 1,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  const handleSubmit = async (data: any) => {
    const result = await createBorrow({ fullData: { ...data, book: id } });
    const isSwalTrue = showToast(result);
    if (isSwalTrue) {
      dispatch(setBorrowModalFalse());
      navigate("/borrow-summary");
    }
  };

  const handleClose = () => {
    form.reset();
    dispatch(setBorrowModalFalse());
  };

  return (
    <Dialog open={isOn} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookCheck className="h-5 w-5" />
            <span>Borrow Book</span>
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to borrow this book.
          </DialogDescription>
        </DialogHeader>

        {/* Book Info Display */}
        {singleBook?.data && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">
                {singleBook?.data?.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>by {singleBook?.data?.author}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Available copies: </span>
              <span className="font-medium">{singleBook?.data?.copies}</span>
            </div>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max={singleBook?.data?.copies || 100}
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 1)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    How many copies do you want to borrow? (Max:{" "}
                    {singleBook?.data?.copies || 0})
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a due date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When do you plan to return the book?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !singleBook?.data?.available}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <BookCheck className="mr-2 h-4 w-4" />
                    Borrow Book
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowCreateModal;
