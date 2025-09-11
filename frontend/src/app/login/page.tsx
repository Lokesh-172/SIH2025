import LoginPage from "@/components/auth-pages/login";
import Navbar from "@/components/home-page/components/navbar";
const Page = () => {
  return (
    <div className="min-h-screen font-inter bg-white">
      <Navbar />
      <LoginPage />
    </div>
  );
};
export default Page;
