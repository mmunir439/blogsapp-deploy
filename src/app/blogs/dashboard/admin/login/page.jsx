"use client";

import { useState,useEffect} from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        const res = await fetch("http://localhost:5000/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("adminToken", data.token);
            router.push("/blogs/dashboard/admin/dashboard");
        } else {
            alert(data.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <input
                    className="w-full border border-gray-300 p-3 mb-4 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="w-full border border-gray-300 p-3 mb-6 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
