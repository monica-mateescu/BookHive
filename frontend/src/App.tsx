import {
  AdminLayout,
  DashboardLayout,
  MainLayout,
  ProtectedLayout,
} from "@/layouts";
import {
  BookCreate,
  BookDetailPage,
  Books,
  BooksPage,
  ClubCreate,
  ClubDetail,
  ClubDetailPage,
  Clubs,
  Dashboard,
  EmailVerified,
  Home,
  NotFound,
  Profile,
  SignIn,
  SignUp,
  Users,
} from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="clubs/:id" element={<ClubDetailPage />} />
            <Route path="email-verified" element={<EmailVerified />} />
            <Route element={<ProtectedLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="clubs/create/:bookId/" element={<ClubCreate />} />
              <Route element={<AdminLayout />}>
                <Route path="admin" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="books" element={<Books />} />
                  <Route path="books/create" element={<BookCreate />} />
                  <Route path="books/:id/edit" element={<BookCreate />} />
                  <Route path="clubs" element={<Clubs />} />
                  <Route path="clubs/:id" element={<ClubDetail />} />
                  <Route path="clubs/create" element={<ClubCreate />} />
                  <Route path="clubs/:id/edit" element={<ClubCreate />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
