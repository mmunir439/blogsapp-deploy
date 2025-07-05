"use client";

import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("adminToken");

            if (!token) {
                alert("No admin token found. Please login again.");
                return;
            }

            const res = await fetch("http://localhost:5000/blogs/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setBlogs(data);
            } else {
                alert(data.message || "Failed to fetch blogs");
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="flex-1 p-10">
            <h1 className="text-2xl font-bold mb-6">All Blogs</h1>
            {blogs.length === 0 && <p>No blogs found.</p>}
            <ul className="space-y-4">
                {blogs.map((blog) => (
                    <li key={blog._id} className="p-4 border rounded bg-white shadow">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <p className="text-gray-600">{blog.content}</p>
                        <p className="text-sm text-gray-400">Author: {blog.user?.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
