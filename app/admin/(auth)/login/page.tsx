"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
  const response = await fetch(
    "/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const result =
    await response.json();

  if (result.success) {
    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    router.push(
      "/admin/dashboard"
    );
  } else {
    alert("Invalid Login");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 rounded-lg border bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-2"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-black p-2 text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}