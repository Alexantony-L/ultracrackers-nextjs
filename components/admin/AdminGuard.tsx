"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("adminLoggedIn");

    if (loggedIn === "true") {
      setAuthorized(true);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}