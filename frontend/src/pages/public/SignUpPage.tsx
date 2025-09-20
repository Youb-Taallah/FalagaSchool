import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { register } from "../../services/authService";
import images from "../../utils/images";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { user, isLoaded: userLoaded } = useUser();
  const { getToken } = useAuth();

  // Sync user with backend on signup
  useEffect(() => {
    const syncSignup = async () => {
      if (user) {
        try {
          const token = await getToken();
          const res = await register(token || "");
          if (res.success) {
            toast.success(`Welcome to Falaga School, ${res.user?.firstName}!`);
            navigate("/student", { replace: true });
          } else {
            toast.error(res.error || "Registration failed");
          }
        } catch (err) {
          console.error("Backend registration error:", err);
          toast.error("Registration error. Please try again.");
        }
      }
    };

    if (userLoaded && user) {
      syncSignup();
    }
  }, [user, userLoaded, getToken, navigate]);

  const handleSocialSignup = async (provider: "oauth_google" | "oauth_facebook") => {
    if (!signUpLoaded) return;
    setIsLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/login",
        redirectUrlComplete: "/student",
      });
    } catch (error: unknown) {
      console.error("OAuth signup error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userLoaded || (userLoaded && user)) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="relative">
        
        {/* Main card */}
        <div className="relative w-full md:w-[500px] max-w-md bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/2 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
            <Link to={"/"} >
              <img className="h-20 w-26" src={images.public.fgLogo} alt="Falaga School" />
            </Link>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Join Falaga School
            </h1>
            <p className="text-gray-500 text-sm">
              Create your account to start learning
            </p>
          </div>

          {/* Social signup buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleSocialSignup("oauth_google")}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-4 px-6 rounded-2xl transition-all duration-200 ease-out hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
              {isLoading && (
                <div className="absolute right-4">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            <button
              onClick={() => handleSocialSignup("oauth_facebook")}
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-4 px-6 rounded-2xl transition-all duration-200 ease-out hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
              {isLoading && (
                <div className="absolute right-4">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>

          {/* Terms and Privacy */}
          {/* <div className="text-center mb-6">
            <p className="text-xs text-gray-500 leading-relaxed">
              By creating an account, you agree to our{" "}
              <a
                href="/terms"
                className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </p>
          </div> */}

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secured with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}