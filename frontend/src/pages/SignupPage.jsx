import { NavLink, Form, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "../components/ui/Loader";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { signup, user, token, error, loading } = useAuthStore();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await signup(formData);
      console.log(user, token);
      if (success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Signup successful");
        navigate("/verify-email/sent");
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 md:w-[50%] lg:w-[35%] w-full border border-gray-400 rounded-md p-5">
      <h1 className="text-2xl font-bold text-center">Signup</h1>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-5"
        method="post"
      >
        <Input
          type="name"
          placeholder="Name"
          className="text-sm"
          required
          value={formData.name}
          onChange={handleChangeInput}
          name="name"
        />
        {error?.name && (
          <p className="text-red-500 text-xs font-sans">{error.name}</p>
        )}
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
          {loading ? <Loader /> : "Signup"}
        </Button>
        {error && (
          <p className="text-red-500 text-xs font-sans">{error.message}</p>
        )}
        <NavLink to="/login" className="text-sm">
          Already a user? Login
        </NavLink>
      </form>
    </div>
  );
};
export default SignupPage;
