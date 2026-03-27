import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout.tsx";
import CreateBook from "./pages/Book.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="create-book"
              element={<CreateBook />}
              key="create-book"
            />
            <Route
              path="books/:id/edit"
              element={<CreateBook key="edit-book" />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
