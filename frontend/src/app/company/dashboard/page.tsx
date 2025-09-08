"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import CompanyDashboard from "@/components/dashboard/company-dashboard";

const Page = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Redirect to user dashboard if user is a student
    if (user && (user.role === "student" || user.role === "admin")) {
      router.push("/user/dashboard");
      return;
    }
  }, [user, isAuthenticated, router]);

  // Don't render anything while checking authentication or redirecting
  if (!isAuthenticated || !user || user.role !== "company") {
    return null;
  }

  return <CompanyDashboard />;
};

export default Page;
