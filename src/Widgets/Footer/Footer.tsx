import { setTrue } from "@/Redux/features/slice/BookCreateModalSlice";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BookLib</span>
            </NavLink>
            <p className="text-sm text-muted-foreground">
              Our books library management system. Organize, track, and manage
              all books collection with ease.
            </p>
          </div>

          {/* Quick NavLinks */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick NavLinks</h3>
            <div className="space-y-2">
              <NavLink
                to="/books"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                All Books
              </NavLink>
              <span
                onClick={() => dispatch(setTrue())}
                className="block text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                Add Book
              </span>
              <NavLink
                to="/borrow-summary"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Borrow Summary
              </NavLink>
              <NavLink
                to="/about"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </NavLink>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@booklib.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social NavLinks */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <NavLink
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </NavLink>
              <NavLink
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </NavLink>
              <NavLink
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </NavLink>
            </div>
            <p className="text-xs text-muted-foreground">
              Stay connected for updates and new features!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 BookLib. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <NavLink
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
