import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import SignupPage from "./pages/SignupPage";
import VerifyEmailSent from "./pages/VerifyEmailSent";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

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
        <Route path="/verify-email/sent" element={<VerifyEmailSent />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<div><Dashboard/></div>} />
        <Route path="/login" element={<div className="flex justify-center items-center h-screen">
              <LoginPage />
            </div>}/>
      </Route>
    </Routes>
  );
};

export default App;
