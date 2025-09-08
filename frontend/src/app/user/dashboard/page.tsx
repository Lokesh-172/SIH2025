"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";
import ApplierDashboard from "@/components/dashboard/applier-dashboard";

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

    // Redirect to company dashboard if user is a company
    if (user && user.role === "company") {
      router.push("/company/dashboard");
      return;
    }
  }, [user, isAuthenticated, router]);

  // Don't render anything while checking authentication or redirecting
  if (!isAuthenticated || !user || user.role === "company") {
    return null;
  }

  return <ApplierDashboard />;
};

export default Page;
