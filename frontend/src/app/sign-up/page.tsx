import SignupPage from "@/components/auth-pages/signup";
import Navbar from "@/components/home-page/components/navbar";

const Page = () => {
  return (
    <div className="min-h-screen font-inter bg-white">
      <Navbar />
      <SignupPage />
    </div>
  );
};
export default Page;
