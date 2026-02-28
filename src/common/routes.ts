import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import CoursesPage from "../pages/CoursesPage";
import CourseDetail from "../pages/CourseDetail";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import ContactPage from "../pages/ContactPage";
import MyCoursesPage from "../pages/MyCoursesPage";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { path: "/", Component: HomePage },
      { path: "/courses", Component: CoursesPage },
      { path: "/courses/:id", Component: CourseDetail },
      { path: "/cart", Component: CartPage },
      { path: "/checkout", Component: CheckoutPage },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      { path: "/blog", Component: BlogPage },
      { path: "/blog/:id", Component: BlogDetailPage },
      { path: "/contact", Component: ContactPage },
      { path: "/my-courses", Component: MyCoursesPage },
    ],
  },
]);