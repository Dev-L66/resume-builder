import { NavLink, Form } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = ({
  heading = "Signup",
  buttonText = "Create Account",
  signupText = "Already a user? Login",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const{signup,user,token} = useAuthStore();


  const handleFormSubmit = async(e) => {
    e.preventDefault();
   await signup(formData);
    console.log(user, token);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }
  useEffect(() => {
  if (token && user) {
    console.log("Updated token and user:", token, user);
  }
}, [token, user]);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 md:w-[50%] lg:w-[35%] w-full border border-gray-400 rounded-md p-5">
      {heading && <h1 className="text-2xl font-bold text-center">{heading}</h1>}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5" method="post">
        <Input
          type="name"
          placeholder="Name"
          className="text-sm"
          required
          value={formData.name}
          onChange={handleChangeInput}
          name="name"
        />
        <Input
          type="email"
          placeholder="Email"
          className="text-sm"
          required
          value={formData.email}
          onChange={handleChangeInput}
          name="email"
        />
        <Input
          type="password"
          placeholder="Password"
          className="text-sm"
          required
          value={formData.password}
          onChange={handleChangeInput}
          name="password"
        />
        <Button  className="w-full">
          {buttonText}
        </Button>
        <NavLink to="/login">{signupText}</NavLink>
      </form>
    </div>
  );
};
export default SignupPage;
