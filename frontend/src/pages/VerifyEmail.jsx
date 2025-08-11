import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useSearchParams } from "react-router";
import Loader from "../components/ui/Loader";
import { Button } from "../components/ui/button";

const VerifyEmail = () => {
  const { user, verifyEmail, loading, error, message } = useAuthStore();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("token");
  console.log(verificationToken);

  console.log(user);
  useEffect(() => {
    if (verificationToken) {
      verifyEmail({ verificationToken });
    }
  }, [verificationToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  // if(error){
  //     return <div className="flex justify-center items-center h-screen border-2 p-5  rounded-xl"><p>{error}</p></div>
  // }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" border-2 p-5 rounded-xl">
        {error && (
          <div className="flex flex-col justify-center items-center p-5">
            <p className="text-2xl flex justify-center items-center text-red-500 p-5">
              {error}
            </p>
          </div>
        )}
        {error && !user?.isVerified && (
          <Button className="flex justify-center items-center bg-zinc-300">
            Resend Email
          </Button>
        )}
        {!error && message && user?.isVerified && (
          <>
            <p className="text-2xl flex justify-center items-center text-green-500">
              {message}
            </p>
          </>
        )}
        {user?.isVerified && (
          <Button className="flex justify-center items-center bg-zinc-300">
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
