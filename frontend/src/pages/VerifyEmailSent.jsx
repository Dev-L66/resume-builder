import Loader from "../components/ui/Loader";
import { useAuthStore } from "../store/useAuthStore";

const VerifyEmailSent = () => {
  const { user, message, loading, error } = useAuthStore();
  if (loading) {
    return (
      <section className="flex flex-col justify-center items-center h-screen">
        <Loader />
      </section>
    );
  }
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      {" "}
      <h1 className="md:text-5xl text-2xl p-2">Verify Email</h1>
      <p className="md:text-2xl text-sm p-2">
        {" "}
        {message} to{" "}
        <span className="font-bold text-zinc-400">{user?.email}.</span>{" "}
      </p>
      <p className="md:text-2xl text-md p-2">
        Check your email to verify your account.
        {error && <span className="text-red-500">{error}</span>}
      </p>
    </section>
  );
};

export default VerifyEmailSent;
