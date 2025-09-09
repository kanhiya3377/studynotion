import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8">
      {loading ? (
        <div className="text-white text-xl">Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-richblack-800 rounded-lg p-6 sm:p-8 shadow-lg border border-richblack-700">
          <h1 className="text-2xl sm:text-3xl font-semibold text-richblack-5">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-richblack-100">
            {!emailSent
              ? "We'll email you instructions to reset your password. If you don’t have access to your email, try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className="mt-6">
            {!emailSent && (
              <label className="block w-full">
                <p className="mb-1 text-sm text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-style w-full"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-yellow-50 py-3 text-center text-richblack-900 font-semibold hover:bg-yellow-100 transition"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-richblack-5 hover:underline flex items-center justify-center gap-2">
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
