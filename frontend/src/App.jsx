import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import SignupPage from "./pages/SignupPage";
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            <div className="flex justify-center items-center h-screen">
              <SignupPage />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
