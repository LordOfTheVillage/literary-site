import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "../pages/Root";
import { HomePage } from "../pages/HomePage";
import { Blogs } from "../pages/blogs/BlogsPage";
import { Contests } from "../pages/contests/ContestsPage";
import { BookPage } from "../pages/books/BookPage";
import { NotFound } from "../pages/NotFoundPage";
import { AccountLibrary } from "../pages/account/AccountLibrary";
import { AccountEdit } from "../pages/account/user/AccountEdit";
import { AccountEditPassword } from "../pages/account/user/AccountEditPassword";
import { ContestPage } from "../pages/contests/ContestPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { AuthorizationPage } from "../pages/AuthorizationPage";
import { PersonalPage } from "../pages/account/personal/PersonalPage";
import { PersonalAbout } from "../pages/account/personal/PersonalAbout";
import { PersonalBlogs } from "../pages/account/personal/PersonalBlogs/";
import { PersonalBooks } from "../pages/account/personal/PersonalBooks";
import { Account } from "../pages/account";
import { Game } from "../pages/Game";
import { AccountAddBlog } from "../pages/account/AccountAddBlog";
import { BlogPage } from "../pages/blogs/BlogPage";
import { ContestRules } from "../pages/contests/ContestRules";
import { ContestBooks } from "../pages/contests/ContestBooks";
import { AccountEditBook } from "../pages/account/book/AccountEditBook";
import { AccountAddChapter } from "../pages/account/chapter/AccountAddChapter";
import { AccountBook } from "../pages/account/book/AccountBook";
import { AccountAddBook } from "../pages/account/book/AccountAddBook";
import { AccountEditBookInfo } from "../pages/account/book/AccountEditBookInfo";
import { AccountAddContest } from "../pages/account/AccountAddContest";
import { UserContextProvider } from "../context/userContext";
import { ProtectedRoute } from "../context/userProtectRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCheckingAuth } from "../../hooks";
import { AccountEditChapter } from "../pages/account/chapter/AccountEditChapter";
import { BooksPage } from "../pages/books/BooksPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReaderPage } from "../pages/ReaderPage";
import { ContestParticipate } from "../pages/contests/ContestParticipate";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { AdminRoot } from "../pages/admin/AdminRoot";
import { AdminBooksPage } from "../pages/admin/AdminBooksPage";
import { AdminBlogsPage } from "../pages/admin/AdminBlogsPage";
import { AdminContestsPage } from "../pages/admin/AdminContestsPage";

const client = new QueryClient({
  logger: {
    error: () => {},
    warn: console.warn,
    log: console.log,
  },
});

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "books/",
        element: <AdminBooksPage />,
      },
      {
        path: "contests/",
        element: <AdminContestsPage />,
      },
      {
        path: "blogs/",
        element: <AdminBlogsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/books/genre/:genreName",
        element: <BooksPage />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/blogs/:id",
        element: <BlogPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/authorization",
        element: <AuthorizationPage />,
      },
      {
        path: "/contests",
        element: <Contests />,
      },
      {
        path: "/contests/:id",
        element: <ContestPage />,
        children: [
          {
            index: true,
            element: <ContestBooks />,
          },
          {
            path: "rules",
            element: <ContestRules />,
          },
          {
            path: "participate",
            element: <ContestParticipate />,
          },
        ],
      },
      {
        path: "/books/:id",
        element: <BookPage />,
      },
      {
        path: "/reader/:id",
        element: <ReaderPage />,
      },
      {
        path: "/users/:id",
        element: <PersonalPage />,
        children: [
          {
            index: true,
            element: <PersonalAbout />,
          },
          {
            path: "about",
            element: <PersonalAbout />,
          },
          {
            path: "blogs",
            element: <PersonalBlogs />,
          },
          {
            path: "books",
            element: <PersonalBooks />,
          },
        ],
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AccountLibrary />,
          },
          {
            path: "library",
            element: <AccountLibrary />,
          },
          {
            path: "edit",
            element: <AccountEdit />,
          },
          {
            path: "edit-password",
            element: <AccountEditPassword />,
          },
          {
            path: "add-blog",
            element: <AccountAddBlog />,
          },
          {
            path: "add-book",
            element: <AccountAddBook />,
          },
          {
            path: "add-contest",
            element: <AccountAddContest />,
          },
          {
            path: "book/:bookId",
            element: <AccountBook />,
            children: [
              {
                path: "edit-book",
                element: <AccountEditBook />,
              },
              {
                path: "book-info",
                element: <AccountEditBookInfo />,
              },
              {
                path: "chapter",
                element: <AccountAddChapter />,
              },
              {
                path: "chapter/:chapterId",
                element: <AccountEditChapter />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const user = useCheckingAuth();

  return user !== undefined ? (
    <QueryClientProvider client={client}>
      <UserContextProvider defaultUser={user}>
        <ToastContainer />
        <RouterProvider router={router} />
      </UserContextProvider>
    </QueryClientProvider>
  ) : (
    <h1>Loading...</h1>
  );
}

export default App;
