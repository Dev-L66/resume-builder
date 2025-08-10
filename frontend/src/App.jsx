import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
