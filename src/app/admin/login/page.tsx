"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Shield } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError("Invalid username or password");
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Username
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter username"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-3.5 mt-2 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <><Loader2 size={18} className="animate-spin" /> Signing in...</>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gray-900 p-8 text-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-gray-900" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2 text-sm">Go Nainital Management</p>
        </div>

        <div className="p-8">
          <Suspense fallback={<div className="flex justify-center p-4"><Loader2 className="animate-spin text-gray-400" /></div>}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
