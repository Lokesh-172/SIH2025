import { Suspense } from "react";
import LoginPage from "@/components/auth-pages/login";
import Navbar from "@/components/home-page/components/navbar";

const Page = () => {
  return (
    <div className="min-h-screen font-inter bg-white">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <LoginPage />
      </Suspense>
    </div>
  );
};
export default Page;
