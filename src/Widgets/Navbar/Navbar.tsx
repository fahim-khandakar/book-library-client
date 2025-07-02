import { useState } from "react";

import { Menu, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { useDispatch } from "react-redux";
import { setTrue } from "@/Redux/features/slice/BookCreateModalSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const routes = [
    { name: "All Books", href: "/books" },
    { name: "Add Book", handleModalOpen: () => dispatch(setTrue()) },
    { name: "Borrow Summary", href: "/borrow-summary" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BookLib</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {routes.map((route) =>
              route.handleModalOpen ? (
                <span
                  key={route.name}
                  onClick={route.handleModalOpen}
                  className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
                >
                  {route.name}
                </span>
              ) : (
                <NavLink
                  key={route.name}
                  to={route.href!}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {route.name}
                </NavLink>
              )
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="px-4 flex flex-col space-y-4 md:hidden"
            >
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Select a page to navigate</SheetDescription>
              </SheetHeader>

              {routes.map((route) =>
                route.handleModalOpen ? (
                  <span
                    key={route.name}
                    onClick={() => {
                      route.handleModalOpen();
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium transition-colors hover:text-primary py-2 cursor-pointer"
                  >
                    {route.name}
                  </span>
                ) : (
                  <NavLink
                    key={route.name}
                    to={route.href!}
                    className="text-lg font-medium transition-colors hover:text-primary py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.name}
                  </NavLink>
                )
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
