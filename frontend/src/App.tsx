import { BrowserRouter, Route, Routes } from "react-router";

import { ClubForm } from "./components";
import {
  AdminLayout,
  DashboardLayout,
  MainLayout,
  ProtectedLayout,
} from "./layouts";
import {
  Books,
  ClubDetail,
  Clubs,
  CreateBook,
  Dashboard,
  Home,
  NotFound,
  SignIn,
  SignUp,
} from "./pages";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route element={<ProtectedLayout />}>
              <Route path="create-club" element={<ClubForm />} />
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="books" element={<Books />} />
                  <Route path="books/create" element={<CreateBook />} />
                  <Route path="books/:id/edit" element={<CreateBook />} />
                  <Route path="clubs" element={<Clubs />} />
                  <Route path="clubs/:id" element={<ClubDetail />} />
                  <Route path="clubs/create" element={<ClubForm />} />
                  <Route path="clubs/:id/edit" element={<ClubForm />} />
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
