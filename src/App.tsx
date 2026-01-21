import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <h1>Página nao encontrada</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
