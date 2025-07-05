'use client'

import Link from "next/link";

export default function BlogsDashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-8 text-blue-600">Blogs Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    <Link
                        href="/blogs/dashboard"
                        className="text-gray-700 hover:bg-blue-100 px-3 py-2 rounded transition"
                    >
                        All Blogs
                    </Link>
                    <Link
                        href="/blogs/dashboard/approved"
                        className="text-gray-700 hover:bg-blue-100 px-3 py-2 rounded transition"
                    >
                        Approved Blogs
                    </Link>
                    <Link
                        href="/blogs/dashboard/pending"
                        className="text-gray-700 hover:bg-blue-100 px-3 py-2 rounded transition"
                    >
                        Pending Approval
                    </Link>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}