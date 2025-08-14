import { NavLink, Form, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "../components/ui/Loader";
import { toast } from "react-hot-toast";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login, error, loading } = useAuthStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(formData);
      if (success) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong", error);
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 md:w-[50%] lg:w-[35%] w-full border border-gray-400 rounded-md p-5">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-5"
        method="post"
      >
        <Input
          type="email"
          placeholder="Email"
          className="text-sm"
          required
          value={formData.email}
          onChange={handleChangeInput}
          name="email"
        />
        {error?.email && (
          <p className="text-red-500 text-xs font-sans">{error.email}</p>
        )}
        <Input
          type="password"
          placeholder="Password"
          className="text-sm"
          required
          value={formData.password}
          onChange={handleChangeInput}
          name="password"
        />

        {error?.password && (
          <p className="text-red-500 text-xs font-sans">{error.password}</p>
        )}
        <Button disabled={loading} className="w-full">
          {loading ? <Loader /> : "Login"}
        </Button>
        {error && (
          <p className="text-red-500 text-xs font-sans">{error.message}</p>
        )}
        <NavLink to="/signup" className="text-sm text-zinc-400 hover:underline">
         Don't have an account? Signup
        </NavLink>
      </form>
    </div>
  );
};
export default LoginPage;
