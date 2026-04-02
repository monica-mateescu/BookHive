import { BrowserRouter, Route, Routes } from "react-router";

import {
  AdminLayout,
  DashboardLayout,
  MainLayout,
  ProtectedLayout,
} from "./layouts";
import {
  Books,
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
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="books" element={<Books />} />
                  <Route
                    path="create-book"
                    element={<CreateBook />}
                    key="create-book"
                  />
                  <Route
                    path="books/:id/edit"
                    element={<CreateBook />}
                    key="edit-book"
                  />
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
