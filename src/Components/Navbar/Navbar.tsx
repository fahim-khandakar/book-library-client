import { useState } from "react";

import { Menu, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
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
            {routes.map((route) => (
              <NavLink
                key={route.name}
                to={route.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {route.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8 px-5">
                <NavLink to="/" className="flex items-center space-x-2 mb-6">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">BookLib</span>
                </NavLink>
                {routes.map((route) => (
                  <NavLink
                    key={route.name}
                    to={route.href}
                    className="text-lg font-medium transition-colors hover:text-primary py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.name}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
