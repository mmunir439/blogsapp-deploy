"use client";

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function BlogsDashboard() {
    // showing blog variables
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // editing blog variables
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found. Please login.");
                setLoading(false);
                window.location.href = "/blogs/login";
                return;
            }

            const res = await fetch("http://localhost:5000/blogs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch blogs");
            }
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `http://localhost:5000/blogs/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.ok) {
                setBlogs((prev) => prev.filter((b) => b._id !== id));
            } else {
                const data = await res.json();
                alert(data.message || "Failed to delete blog");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while deleting");
        }
    };

    const startEdit = (blog) => {
        setEditingId(blog._id);
        setEditTitle(blog.title);
        setEditContent(blog.content);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:5000/blogs/update/${editingId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        content: editContent,
                    }),
                }
            );

            if (res.ok) {
                const data = await res.json();

                setBlogs((prev) =>
                    prev.map((b) =>
                        b._id === editingId ? data.blog : b
                    )
                );

                cancelEdit();
            } else {
                const data = await res.json();
                alert(data.message || "Failed to update blog");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while updating");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    My Blogs
                </h1>

                {loading && (
                    <div className="text-center text-gray-500">Loading...</div>
                )}

                {error && (
                    <div className="text-center text-red-500 mb-4">{error}</div>
                )}

                {!loading && !error && blogs.length === 0 && (
                    <div className="text-center text-gray-500">
                        No blogs found.
                    </div>
                )}

                <ul className="space-y-6">
                    {blogs.map((blog) => (
                        <li
                            key={blog._id}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition relative"
                        >
                            {editingId === blog._id ? (
                                <>
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full border p-2 mb-2 rounded"
                                    />
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows={4}
                                        className="w-full border p-2 mb-2 rounded"
                                    ></textarea>
                                    <div className="flex gap-3 mt-2">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2"
                                        >
                                            <FaSave /> Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-400 text-white px-3 py-1 rounded flex items-center gap-2"
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-700 mb-4">{blog.content}</p>
                                    <div className="text-sm text-gray-400 mb-4">
                                        Created at:{" "}
                                        {new Date(blog.createdAt).toLocaleString(undefined, {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </div>
                                    <div className="flex gap-4 absolute top-4 right-4">
                                        <button
                                            onClick={() => startEdit(blog)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
