"use client";
import { useState } from "react";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/blogs/createblog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Include token if your route is protected
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(" Blog created successfully!");
                setTitle("");
                setContent("");
                console.log("New blog:", data);
            } else {
                setMessage(" " + (data.message || "Failed to create blog."));
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong!");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">Create a New Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-yellow-400 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Create Blog
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center font-medium text-red-600">{message}</p>
            )}
        </div>
    );
}
