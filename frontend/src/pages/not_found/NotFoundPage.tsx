import React from "react";
import { Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main className="h-full w-full">
      <div className="h-full bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center px-4 relative">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 relative">
            <h1 className="text-9xl font-bold text-primary-light select-none">404</h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Search className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-3">
              The Page You Are Looking For Does Not Exist
            </h2>
            <p className="text-primary-dark text-lg mb-2">
              Sorry, the page you are trying to reach cannot be found.
            </p>
            <p className="text-primary-dark text-sm">
              It may have been moved, deleted, or the URL you entered is incorrect.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoHome}
              className="cursor-pointer w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go Back Home
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-light rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-dark rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-light rounded-full opacity-50 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-primary-dark rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-16 h-16 bg-primary rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </main>
  );
};

export default NotFoundPage;
